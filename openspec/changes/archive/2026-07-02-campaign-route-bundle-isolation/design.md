# Design: Campaign Route Bundle Isolation

## Technical Approach

Keep the current React 18 + Vite shared bootstrap, but make `src/App.jsx` a tiny pathname router that lazy-loads the three page modules. Move the inline homepage composition and its gallery image imports out of `App.jsx` into `src/pages/HomePage/HomePage.jsx`. `src/main.jsx` continues to eagerly import CSS and `captureUtmParams()` so GTM, Meta-through-GTM, UTM capture, `dataLayer`, and WhatsApp attribution stay stable before any route chunk resolves.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Route isolation | Use `React.lazy()` + `Suspense` in `src/App.jsx` for `/`, `/eventos`, and `/parasuramericanos-valledupar-2026`. | Separate Vite entrypoints per page; add React Router. | Minimal frontend-only refactor, preserves URLs and existing direct-entry behavior, and stays under the 400-line PR budget. |
| Homepage extraction | Create `src/pages/HomePage/HomePage.jsx` containing `Header`, `Hero`, `Features`, `Carousel`, `Contact`, `CardPricing`, `Map`, `Footer`, and the `imagenes` asset list. | Keep homepage in `App.jsx`; create many smaller homepage files. | Asset imports define Vite’s chunk graph; moving them out of the eager app shell stops homepage gallery assets from being reachable before campaign route selection. |
| Bootstrap stability | Leave `src/main.jsx`, HTML GTM snippets, and analytics utilities functionally unchanged. | Move analytics into route modules. | UTM capture and tracking must be route-independent and should not wait for lazy chunks. |
| Fallback UX | Use a small inline Suspense fallback with neutral layout text only, no page/component imports. | Reuse `Header` or branded page components in fallback. | Any imported UI in the fallback risks pulling homepage/shared modules back into the eager chunk; direct campaign mobile entry should paint without heavy dependencies. |

## Data Flow

```text
index.html / campaign index.html
  └─ /src/main.jsx: CSS + captureUtmParams()
      └─ App shell: normalize pathname
          ├─ /                              ──lazy──> HomePage chunk + homepage images
          ├─ /eventos                       ──lazy──> EventsIndex chunk
          └─ /parasuramericanos-valledupar-2026 ──lazy──> Campaign chunk + campaign images

WhatsApp CTA click ──> trackWhatsAppCtaClick() ──> window.dataLayer.push()
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/pages/HomePage/HomePage.jsx` | Create | New homepage page module with existing homepage JSX and gallery image list. |
| `src/App.jsx` | Modify | Replace eager page/component/image imports with lazy route shell, path normalization, and Suspense fallback. |
| `src/main.jsx` | Preserve/minimal modify | Keep eager CSS import, `captureUtmParams()`, `StrictMode`, and `<App />` render stable. Only touch if imports need formatting. |
| `src/pages/EventsIndex/EventsIndex.jsx` | Preserve/verify | Confirm lazy import works and links still target `/parasuramericanos-valledupar-2026`. No behavioral change planned. |
| `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` | Preserve/verify | Confirm lazy import keeps campaign CTA tracking and mobile sticky CTA intact. No behavioral change planned. |

## Interfaces / Contracts

No public API or URL contract changes. `App` keeps supporting `/`, `/eventos`, `/parasuramericanos-valledupar-2026`, and `/parasuramericanos-valledupar-2026/` through the existing trailing-slash normalization. Analytics contract remains the `whatsapp_cta_click` event with current payload fields.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Static quality | Refactor syntax and hooks/import correctness. | Run `npm run lint`. |
| Build/chunks | Route chunks emit separately and main eager JS no longer references homepage gallery assets. | Run `npm run build`; inspect generated assets for multiple JS chunks and search `dist/assets/main-*.js` for homepage asset names such as `cuarto2`, `entrada`, `comedor`. |
| Manual smoke | Direct entry for `/`, `/eventos`, `/parasuramericanos-valledupar-2026/`; campaign WhatsApp CTA still pushes `whatsapp_cta_click`. | Use `npm run preview`; check rendered pages and browser `window.dataLayer`. |

## Migration / Rollout

No migration required. Rollback is reverting the route-shell refactor and deleting `src/pages/HomePage/HomePage.jsx`.

## Open Questions

None.

# Apply Progress: Campaign Route Bundle Isolation

## Mode

Standard mode. `openspec/config.yaml` has `strict_tdd: false` and no test runner configured.

## Workload / PR Boundary

- Mode: chained PR slice
- Chain strategy: feature-branch-chain
- Current work unit: PR 2 — route-level bundle isolation
- Boundary: frontend-only refactor from eager `src/App.jsx` imports to lazy route chunks for `/`, `/eventos`, and `/parasuramericanos-valledupar-2026/`
- Review budget impact: focused route shell + homepage extraction; build artifacts left untracked by gitignore status, not committed as source changes

## Completed Tasks

- [x] 1.1 Created `src/pages/HomePage/HomePage.jsx` and moved homepage JSX plus `imagenes` asset imports from `src/App.jsx`.
- [x] 1.2 Preserved homepage composition with `Header`, `Hero`, `Features`, `Carousel`, `Contact`, `CardPricing`, `Map`, and `Footer`.
- [x] 2.1 Refactored `src/App.jsx` into a tiny pathname router using top-level `React.lazy()` route modules.
- [x] 2.2 Preserved trailing-slash normalization for `/`, `/eventos`, `/parasuramericanos-valledupar-2026`, and `/parasuramericanos-valledupar-2026/`.
- [x] 2.3 Added an inline text-only `Suspense` fallback with stable mobile-safe layout and no page/component imports.
- [x] 3.1 Verified `src/main.jsx` keeps eager `./input.css` and `captureUtmParams()` before `<App />`.
- [x] 3.2 Verified `EventsIndex` keeps the campaign link to `/parasuramericanos-valledupar-2026`.
- [x] 3.3 Verified `ParasuramericanosLanding` keeps WhatsApp tracking and mobile sticky CTA unchanged.
- [x] 4.1 Ran lint successfully.
- [x] 4.2 Ran build and inspected JS chunks / eager main bundle.
- [x] 4.3 Ran preview and smoke-checked `/`, `/eventos`, and `/parasuramericanos-valledupar-2026/` on mobile viewport.
- [x] 4.4 Triggered campaign WhatsApp CTA in preview and confirmed `window.dataLayer` receives `whatsapp_cta_click`.

## Files Changed

| File | Action | What Was Done |
|------|--------|---------------|
| `src/App.jsx` | Modified | Replaced eager route/page imports with top-level `lazy()` declarations, `Suspense`, path normalization, and a text-only fallback. |
| `src/pages/HomePage/HomePage.jsx` | Created | Moved existing homepage composition and homepage gallery asset imports into a lazy-loaded page module. |
| `openspec/changes/campaign-route-bundle-isolation/tasks.md` | Updated | Marked completed apply tasks. |
| `openspec/changes/campaign-route-bundle-isolation/apply-progress.md` | Created | Persisted this apply-phase progress and verification evidence. |

## Verification Evidence

| Check | Result | Evidence |
|-------|--------|----------|
| `npm run lint` | Passed | ESLint completed with no reported errors. |
| `npm run build` | Passed | Vite emitted route chunks including `main-DA6DNKfq.js`, `EventsIndex-CFUXAyR7.js`, `ParasuramericanosLanding-CP8X2tC1.js`, and `HomePage-BGXihioy.js`. |
| Main bundle asset-name search | Passed | Search for `cuarto2|entrada|comedor` across JS chunks found homepage names only in `HomePage-BGXihioy.js` and campaign content in `content-D-uktDqP.js`; no match in `main-DA6DNKfq.js`. |
| Preview `/` | Passed | Rendered existing Hostal Donde Maru homepage with header, hero, carousel, pricing, map, and footer. |
| Preview `/eventos` | Passed | Rendered agenda page and campaign link to `/parasuramericanos-valledupar-2026`. |
| Preview `/parasuramericanos-valledupar-2026/` | Passed | Rendered campaign landing with sticky mobile CTA preserved on 390px mobile viewport. |
| Campaign CTA tracking | Passed | Dispatching the hero WhatsApp CTA produced `{"event":"whatsapp_cta_click","cta_location":"campaign_hero","page_path":"/parasuramericanos-valledupar-2026/","campaign":"parasuramericanos-2026"}` in `window.dataLayer`. |

## Chunk / Bundle Evidence

Build emitted separate JS chunks:

- `assets/main-DA6DNKfq.js` — app shell / shared runtime
- `assets/HomePage-BGXihioy.js` — homepage route and homepage gallery assets
- `assets/EventsIndex-CFUXAyR7.js` — eventos route
- `assets/ParasuramericanosLanding-CP8X2tC1.js` — campaign route
- `assets/content-D-uktDqP.js`, `assets/Footer-wVjIKsP3.js`, `assets/Map-1B5WmAU-.js` — shared lazy dependencies

Campaign-route network inspection on preview loaded `main-DA6DNKfq.js`, `ParasuramericanosLanding-CP8X2tC1.js`, `Footer-wVjIKsP3.js`, `Map-1B5WmAU-.js`, and `content-D-uktDqP.js`; it did not request `HomePage-BGXihioy.js` before campaign route rendering.

## Deviations from Design

None — implementation matches the design.

## Issues Found

- `npm run build` reports the existing Browserslist/caniuse-lite data is 18 months old. Build still passed.

## Remaining Tasks

None for this PR 2 work-unit slice.

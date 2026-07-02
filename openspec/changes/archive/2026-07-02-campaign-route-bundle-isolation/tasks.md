# Tasks: Campaign Route Bundle Isolation

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 220-320 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR slice: PR 2 only |
| Delivery strategy | auto-chain |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: feature-branch-chain
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Isolate route bundles by extracting homepage and lazy-loading route surfaces | PR 2 | Base = PR 1 branch; frontend-only slice with lint/build/manual smoke |

## Phase 1: Foundation

- [x] 1.1 Create `src/pages/HomePage/HomePage.jsx` and move the current homepage JSX plus `imagenes` asset imports from `src/App.jsx` into it.
- [x] 1.2 Keep `Header`, `Hero`, `Features`, `Carousel`, `Contact`, `CardPricing`, `Map`, and `Footer` composition unchanged so `/` still matches the existing homepage scenario.

## Phase 2: Core Route Isolation

- [x] 2.1 Refactor `src/App.jsx` into a tiny pathname router that uses `React.lazy()` for `src/pages/HomePage/HomePage.jsx`, `src/pages/EventsIndex/EventsIndex.jsx`, and `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx`.
- [x] 2.2 Preserve trailing-slash normalization and route matching for `/`, `/eventos`, `/parasuramericanos-valledupar-2026`, and `/parasuramericanos-valledupar-2026/`.
- [x] 2.3 Add an inline `Suspense` fallback inside `src/App.jsx` with text-only, stable mobile-safe layout; do not import branded/homepage UI into the fallback.

## Phase 3: Integration Safeguards

- [x] 3.1 Verify `src/main.jsx` keeps eager `./input.css` and `captureUtmParams()` execution before `<App />`; only reformat if required by the lazy refactor.
- [x] 3.2 Verify `src/pages/EventsIndex/EventsIndex.jsx` still links to `/parasuramericanos-valledupar-2026` and needs no behavioral change after lazy loading.
- [x] 3.3 Verify `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` keeps `whatsapp_cta_click` tracking and the mobile sticky CTA unchanged after route lazy loading.

## Phase 4: Verification

- [x] 4.1 Run `npm run lint` to catch refactor/import issues in the new page split.
- [x] 4.2 Run `npm run build` and inspect `dist/assets` to confirm multiple JS chunks exist and the eager main bundle no longer contains homepage asset names like `cuarto2`, `entrada`, or `comedor`.
- [x] 4.3 Run `npm run preview` and smoke-check direct entry for `/`, `/eventos`, and `/parasuramericanos-valledupar-2026/`, including stable fallback behavior on narrow/mobile viewport.
- [x] 4.4 In preview, trigger a campaign WhatsApp CTA and confirm `window.dataLayer` still receives `whatsapp_cta_click`.

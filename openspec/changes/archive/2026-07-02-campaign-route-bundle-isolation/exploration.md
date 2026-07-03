## Exploration: campaign-route-bundle-isolation

### Current State
The project is already configured as a Vite multi-page app via `vite.config.js`, with `index.html` and `parasuramericanos-valledupar-2026/index.html` as build inputs. However, both HTML files still load the same `/src/main.jsx` entry, so the production build emits one shared JS entry for both pages: `dist/assets/main-DWfncdxN.js` at 323.40 kB raw / 101.39 kB gzip. `src/App.jsx` imports homepage components, homepage gallery assets, `EventsIndex`, and `ParasuramericanosLanding` at module scope, so campaign traffic still downloads homepage-only code before the pathname check decides what to render.

### Affected Areas
- `src/App.jsx` — current pathname switch and top-level homepage asset imports are the main cause of shared bundle cost.
- `src/main.jsx` — shared bootstrap entry used by both HTML shells today.
- `vite.config.js` — already supports multi-page build inputs; may need only small entry updates if separate entries are chosen.
- `index.html` — homepage shell currently points at the shared entry.
- `parasuramericanos-valledupar-2026/index.html` — campaign shell currently points at the shared entry.
- `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` — campaign route to keep stable while isolating its JS.
- `src/pages/ParasuramericanosLanding/content.js` — campaign-specific content already cleanly separated.
- `src/pages/EventsIndex/EventsIndex.jsx` — secondary route that should stay reachable after isolation.
- `src/components/Header/Header.jsx` — hardcodes `/eventos`; smoke-check needed after any entry refactor.
- `src/utils/analytics.js` — shared tracking bootstrap that must remain loaded on campaign and homepage.
- `src/utils/whatsapp.js` — shared CTA helper used by both flows.

### Approaches
1. **Route-level code splitting inside the current app shell** — keep `src/main.jsx`, but refactor `src/App.jsx` so homepage, events, and campaign pages are loaded with `React.lazy()` and a `Suspense` fallback; move homepage-only image imports into a dedicated homepage module.
   - Pros: Smallest conceptual change; preserves one bootstrap path for GTM/Meta/UTM capture; low risk to current URLs and static hosting.
   - Cons: Only works if homepage code/assets leave `App.jsx`; still keeps a shared entry shell and shared vendor chunks; requires a loading fallback for lazy routes.
   - Effort: Low

2. **Separate entry modules per HTML page** — keep the existing Vite multi-page setup, but point `index.html` and `parasuramericanos-valledupar-2026/index.html` at different React entry files so the campaign page mounts its own page component directly.
   - Pros: Strongest isolation boundary; campaign entry cannot accidentally import homepage gallery code; matches Vite’s documented multi-page model.
   - Cons: Slightly more wiring; shared bootstrap logic can drift if duplicated; `/eventos` still needs a clear owner entry.
   - Effort: Medium

3. **Standalone campaign shell outside the current React entry** — build the campaign page as a separate static/standalone implementation.
   - Pros: Maximum isolation.
   - Cons: Highest drift risk, duplicated UI/tracking logic, and unnecessary scope for PR 2.
   - Effort: High

### Recommendation
Use **Approach 1: route-level code splitting with `React.lazy()` plus a dedicated homepage module** as PR 2.

Why this is the safest move: the codebase already has a pathname-based route switch, and the biggest avoidable mistake is that homepage assets live at `App.jsx` module scope. Extracting `HomePage` into its own file and lazy-loading `HomePage`, `EventsIndex`, and `ParasuramericanosLanding` should let Vite emit route chunks without touching backend behavior, tracking contracts, or the existing HTML shell strategy. This keeps the PR focused and fits the chained-review plan better than introducing fully separate bootstraps.

If build output after that refactor still shows the campaign HTML eagerly loading a large shared entry, the fallback plan should be a follow-up child slice that moves to separate entry modules. But that should be Plan B, not the first move.

### Risks
- If homepage images remain imported anywhere in the eagerly loaded path, the bundle win will be much smaller than expected.
- `React.lazy()` adds an async render boundary; a poor fallback can cause a visible flash on direct-entry campaign visits.
- Shared dependencies like `framer-motion`, `lucide-react`, shared CSS, analytics, and footer/map helpers will still exist in common chunks where both routes need them.
- `EventsIndex` currently imports `campaign.location` from campaign content, so some cross-route coupling remains unless left intentionally shared.

### Ready for Proposal
Yes — propose PR 2 as a focused child slice that first extracts homepage code out of `App.jsx`, then lazy-loads pathname routes, and verifies that `/parasuramericanos-valledupar-2026/` stops paying homepage gallery code in the initial JS payload.

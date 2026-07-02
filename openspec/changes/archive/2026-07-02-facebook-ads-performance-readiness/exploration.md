## Exploration: Facebook Ads performance readiness

### Current State
The project is a React 18 + Vite 6 SPA with a dedicated Parasuramericanos landing at `/parasuramericanos-valledupar-2026` and a WhatsApp-first conversion flow. Production currently serves the campaign route with the correct campaign-specific metadata, GTM is installed, Meta Pixel is loading through GTM, and a CTA click pushes `whatsapp_cta_click` to `dataLayer` while also firing a Facebook `Contact` request. There is intentionally no backend, which is acceptable for this MVP because the conversion goal is a WhatsApp conversation, not an in-site checkout.

Measured production/mobile findings on `https://hostaldondemaru.netlify.app/parasuramericanos-valledupar-2026/`:
- LCP: ~2.17s (good, but close to the 2.5s threshold)
- CLS: 0.00
- Main JS bundle: ~323 kB raw / ~101 kB gzip
- Main CSS: ~39 kB raw / ~7 kB gzip
- Campaign hero image: ~223 kB WebP
- Campaign gallery images loaded early include ~332 kB, ~176 kB, ~198 kB, ~204 kB JPGs
- Full built image payload in `dist/assets`: ~7.54 MB
- Third-party main-thread cost during load: Facebook ~72 ms, GTM ~64 ms

### Affected Areas
- `src/App.jsx` — imports homepage and campaign code into one app entry, preventing route-level code splitting.
- `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` — campaign layout, CTA placement, image loading behavior, sticky mobile CTA.
- `src/pages/ParasuramericanosLanding/content.js` — campaign copy and image asset selection.
- `src/components/Hero/Hero.jsx` — homepage also uses the same large facade image.
- `src/components/Carousel/Carousel.jsx` — homepage imports many large gallery assets and injects DOM-side effects into the global document.
- `src/utils/analytics.js` — `whatsapp_cta_click` tracking works, but downstream pixel payload currently includes `utm_* = undefined` when absent.
- `index.html` and `parasuramericanos-valledupar-2026/index.html` — font loading, GTM bootstrap, campaign metadata.
- `public/_redirects` — production deep-link delivery for the campaign route.

### Approaches
1. **Ship ads with current production page as-is** — Start the campaign immediately and optimize later.
   - Pros: Fastest path to learning whether the offer converts; WhatsApp-first flow already works; no backend gap.
   - Cons: Mobile performance has little headroom, image payload is heavy, bundle is monolithic, and ad traffic would pay unnecessary load cost.
   - Effort: Low

2. **Ship ads only after focused pre-campaign fixes** — Keep the MVP architecture, but reduce the biggest performance/conversion risks first.
   - Pros: Preserves the no-backend MVP, improves mobile resilience, reduces bounce risk, keeps measurement trustworthy.
   - Cons: Requires a short optimization pass before launch.
   - Effort: Medium

3. **Re-architect before launching** — Add routing/code splitting and deeper asset workflow changes first.
   - Pros: Best long-term frontend foundation.
   - Cons: Too much scope for an MVP validation cycle; delays learning.
   - Effort: High

### Recommendation
Use **Approach 2**. The campaign landing is close, but not quite ready to buy traffic confidently without a short optimization pass. The no-backend constraint is NOT the blocker here — for this MVP, WhatsApp is the conversion surface and that is fine. The blockers are frontend efficiency and campaign hygiene: heavy image weight, a single shared JS bundle, and limited mobile performance margin.

### Risks
- Large image weight may increase mobile bounce, especially for ad traffic on weaker networks.
- Single-bundle SPA means campaign visitors download code for non-campaign surfaces too.
- Google Fonts and third-party scripts sit in the critical path and consume LCP/render budget.
- Pixel conversion mapping exists for page view/contact behavior, but `utm_*` fields can leak as `undefined` in the Facebook request when absent.
- If ads are pointed to the homepage instead of the campaign route, conversion intent drops because the homepage is broader and less campaign-specific.

### Ready for Proposal
Yes — ready for a proposal centered on a short pre-launch optimization slice: reduce campaign image weight, isolate or split campaign code from homepage-only code, trim early-loaded assets, and clean analytics payload hygiene before spending on Facebook Ads.

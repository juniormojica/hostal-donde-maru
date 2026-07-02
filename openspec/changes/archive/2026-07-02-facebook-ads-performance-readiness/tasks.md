# Tasks: Facebook Ads Performance Readiness

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 360-560 total; PR 1 about 220-340 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 media/loading/analytics/shell hygiene → PR 2 route isolation only if still needed |
| Delivery strategy | auto-chain |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Ship ad-safe landing hygiene without routing changes | PR 1 | Target the feature/tracker branch; include lint/build + manual attribution/mobile checks |
| 2 | Isolate campaign bundle from homepage imports if PR 1 still leaves bundle risk | PR 2 | Target PR 1 branch after PR 1; only start if diff stays focused |

## Phase 1: Asset Foundation

- [x] 1.1 Add optimized campaign-only image files in `src/assets/` and keep the current trust-photo coverage needed by the landing spec.
- [x] 1.2 Update `src/pages/ParasuramericanosLanding/content.js` to point hero/gallery entries to the optimized assets without changing captions, alt intent, or declared dimensions.

## Phase 2: Campaign Rendering Hygiene

- [x] 2.1 Update `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` so only the hero remains eager/high-priority and all below-fold gallery media stays lazy/async.
- [x] 2.2 Recheck CTA touch usability in `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` against the mobile requirement; keep sticky and in-flow WhatsApp CTAs easy to tap.
- [x] 2.3 Trim unused Google Fonts weights/preconnect cost in `parasuramericanos-valledupar-2026/index.html` without changing GTM identifiers.
- [x] 2.4 Apply the matching font request cleanup in `index.html` so homepage and campaign shells stay aligned.
- [x] 2.5 Add no-slash campaign URL hygiene so `/parasuramericanos-valledupar-2026` redirects to `/parasuramericanos-valledupar-2026/` before users or ad traffic depend on the static shell.

## Phase 3: Attribution Hygiene

- [x] 3.1 Update `src/utils/analytics.js` so `trackWhatsAppCtaClick()` preserves `whatsapp_cta_click`, keeps deterministic campaign fallback, and omits absent `utm_*` keys.
- [x] 3.2 Verify `src/main.jsx` + `src/utils/analytics.js` still preserve captured UTM context across direct campaign visits and later CTA clicks.

## Phase 4: Verification for PR 1

- [x] 4.1 Run `npm run lint` and `npm run build` to prove the frontend-only slice ships cleanly.
- [x] 4.2 Manually test `/parasuramericanos-valledupar-2026` on mobile width: above-fold offer visible, no horizontal scroll, sticky CTA usable, and room/policy proof still present.
- [x] 4.3 In DevTools, click campaign CTAs with and without UTM params and confirm `window.dataLayer` keeps `whatsapp_cta_click` with no empty UTM fields.
- [x] 4.4 Compare Network/Lighthouse mobile before vs after and record whether campaign visitors still pay homepage-only JS cost.

## Phase 5: Conditional PR 2

- [ ] 5.1 Only if Phase 4.4 still shows meaningful homepage-only bundle cost, refactor `src/App.jsx` to lazy-load or isolate `HomePage`, `EventsIndex`, and `ParasuramericanosLanding` by pathname.
- [ ] 5.2 Re-run `npm run lint`, `npm run build`, and direct-path smoke checks for `/`, `/eventos`, and `/parasuramericanos-valledupar-2026` after the isolation change.

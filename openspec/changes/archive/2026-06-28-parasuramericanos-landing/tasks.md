# Tasks: Parasuramericanos Landing

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 430-560 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 shared CTA cleanup -> PR 2 campaign page + pathname branch -> PR 3 deep link + verification |
| Delivery strategy | auto-chain |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Shared WhatsApp/contact cleanup | PR 1 | Base slice; keep tests/build checks with touched CTA/footer files |
| 2 | Event landing composition and route branch | PR 2 | Depends on Unit 1; isolate campaign content under `src/pages/ParasuramericanosLanding/` |
| 3 | SPA deep-link delivery and final verification | PR 3 | Depends on Unit 2; `_redirects`, build/lint/manual route checks |

## Phase 1: Foundation / Shared CTA cleanup

- [x] 1.1 Create `src/utils/whatsapp.js` with `WHATSAPP_PHONE` and `buildWhatsAppUrl({ source, message, details })`, skipping empty detail values per `whatsapp-reservation-cta` spec.
- [x] 1.2 Update `src/components/Contact/Contact.jsx` to use the shared builder and optional `messageContext` / `href` props while preserving the default homepage CTA.
- [x] 1.3 Update `src/components/Hero/Hero.jsx`, `src/components/CardPricing/CardPricing.jsx`, and `src/components/Footer/Footer.jsx` to reuse the shared WhatsApp destination and remove fake `/privacy` + `/terms` footer links.

## Phase 2: Campaign content and page structure

- [x] 2.1 Create `src/pages/ParasuramericanosLanding/content.js` with editable event facts, room/service proof, reservation policy, FAQ, CTA copy, and venue/location data.
- [x] 2.2 Create `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` with an editorial long-form layout: event framing, dates before first CTA, trust/location, rooms/services, policy, FAQ, map/venue, and repeated WhatsApp CTAs.

## Phase 3: Route wiring and homepage safety

- [x] 3.1 Refactor `src/App.jsx` to keep the current homepage composition for `/` and render `ParasuramericanosLanding` only when `window.location.pathname === '/parasuramericanos-valledupar-2026'`.
- [x] 3.2 Keep existing homepage-only messaging/components untouched in behavior so the `Homepage remains separate` scenario still holds after the route branch.

## Phase 4: Deep-link delivery and verification

- [x] 4.1 Create `public/_redirects` with SPA fallback so direct open/reload of `/parasuramericanos-valledupar-2026` resolves to the campaign experience.
- [x] 4.2 Run `npm run lint` and `npm run build`; if lint fails from unrelated debt, record only touched-file regressions and keep the build clean.
- [x] 4.3 Manually verify `/` and `/parasuramericanos-valledupar-2026`: event/date context before first CTA, CTA message mentions Hostal Donde Maru + Juegos Parasuramericanos, footer uses the verified contact, and campaign reload works.

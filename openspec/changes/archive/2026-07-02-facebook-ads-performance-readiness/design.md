# Design: Facebook Ads Performance Readiness

## Technical Approach

Keep the MVP as a React 18 + Vite frontend and ship the smallest ad-readiness slice first: optimize campaign media, keep only the campaign hero on the high-priority path, reduce font/third-party critical-path pressure in the campaign HTML shell, and preserve the existing `whatsapp_cta_click` event name while preventing empty UTM fields from reaching GTM/Meta mappings. Route/bundle isolation stays a chained PR 2 because `src/App.jsx` currently imports homepage, event index, campaign page, and homepage gallery assets into one entry.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| PR boundary | PR 1 = media/loading/analytics/HTML hygiene only | Include route-level splitting immediately | Keeps the first reviewable slice under 400 changed lines and independently reversible. |
| Conversion model | Preserve WhatsApp-first CTAs and `whatsapp_cta_click` | Add forms, backend, or booking flow | Proposal explicitly excludes backend; WhatsApp is the conversion surface. |
| Media strategy | Add optimized campaign-specific assets and point `content.js` to them | Remove trust photos or rebuild all site assets | Keeps real-photo trust while reducing paid-traffic load cost. |
| Font/script hygiene | Tune campaign/home HTML shells without changing GTM ID or event names | Remove GTM/Meta Pixel | Attribution compatibility matters more than tiny script savings before ads. |
| Bundle isolation | Defer `React.lazy`/route split to PR 2 | Rework app entry in PR 1 | Current `App.jsx` imports many homepage assets; splitting is useful but risks diff growth and polluted review scope. |

## Data Flow

    Ad URL with UTMs
        ↓
    main.jsx captureUtmParams()
        ↓ sessionStorage + current query
    ParasuramericanosLanding CTA
        ↓
    trackWhatsAppCtaClick({ campaign, ctaLocation, optional roomType })
        ↓ clean payload, same event name
    dataLayer whatsapp_cta_click ──→ GTM / Meta Pixel Contact mapping
        ↓
    wa.me URL with campaign reservation message

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/pages/ParasuramericanosLanding/content.js` | Modify | Point hero/gallery to optimized campaign assets; keep image dimensions and trust-oriented alt/captions. |
| `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` | Modify | Keep hero `loading="eager"` + high priority; ensure gallery remains lazy/async and no non-critical images become eager. |
| `src/assets/...` | Create/Modify | Add compressed campaign WebP/JPEG assets or replace only campaign-used files after visual QA. |
| `src/utils/analytics.js` | Modify | Keep `whatsapp_cta_click`; ensure UTM/event payload fields are emitted only when present and campaign fallback remains deterministic. |
| `index.html` | Modify | Trim font request to used weights and keep GTM compatibility. |
| `parasuramericanos-valledupar-2026/index.html` | Modify | Apply campaign shell font/preconnect tuning without changing canonical/OG/GTM IDs. |
| `src/App.jsx` | Defer | PR 2 only: route-aware lazy loading if first slice still leaves JS/bundle risk. |

## Interfaces / Contracts

- Analytics event name MUST remain `whatsapp_cta_click`.
- Event payload MAY include `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`; it MUST NOT include those keys when values are empty.
- Campaign CTA payload MUST include `campaign: "parasuramericanos-2026"` when fired from the campaign page.
- WhatsApp URL generation remains `buildWhatsAppUrl({ source, message, details })` with no backend dependency.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Static quality | No React/HTML regressions | Run `npm run lint`; run `npm run build`. |
| Manual mobile | Above-fold offer, sticky CTA, 44px+ touch targets, no horizontal scroll | Browser responsive check on `/parasuramericanos-valledupar-2026`. |
| Attribution | UTM capture and CTA event cleanliness | In DevTools, click campaign CTA with and without UTMs; inspect `window.dataLayer` for same event name and no empty UTM keys. |
| Performance | Early image cost and LCP headroom | Compare production/build Network + Lighthouse mobile before/after; verify only hero is high priority. |

## Migration / Rollout

No migration required. Roll out PR 1 alone before ad spend. Only start PR 2 if bundle analysis still shows campaign visitors paying homepage-only code cost and the route split can remain a clean child PR.

## Open Questions

- [ ] None blocking. Asset compression targets should be selected during implementation after visual QA on real hostal photos.

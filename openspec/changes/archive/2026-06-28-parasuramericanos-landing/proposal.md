# Proposal: Parasuramericanos Landing

## Intent

Create a dedicated, conversion-first landing at `/parasuramericanos-valledupar-2026` for paid/event traffic while preserving the current homepage. The page must answer trust, stay details, booking policy, and WhatsApp reservation intent without forcing users through the pensionado-focused flow.

## Scope

### In Scope
- Add a dedicated long-form campaign page for Juegos Parasuramericanos Valledupar 2026.
- Centralize WhatsApp CTA/message generation for consistent reservation copy.
- Add event-specific sections: dates, location trust, rooms/services, reservation policy, FAQ, and repeated CTA blocks.
- Add SPA deep-link handling for the campaign path in deployment config.
- Fix trust-breaking footer/contact issues that would appear on campaign traffic.

### Out of Scope
- Migrating the app to React Router.
- Reworking the general homepage beyond shared-component reuse.
- Building full legal pages or a full booking engine.

## Capabilities

### New Capabilities
- `parasuramericanos-campaign-landing`: Dedicated campaign experience with event framing, room proof, policies, FAQ, and CTA repetition.
- `whatsapp-reservation-cta`: Shared WhatsApp link/message builder with campaign-aware reservation context.
- `spa-deep-link-delivery`: Production handling for direct access to the campaign URL.

### Modified Capabilities
- None.

## Approach

Use pathname-based rendering inside the existing React/Vite SPA instead of adding a router now. Reuse proven visual components where they fit, but compose a new event-focused page with stronger trust and conversion sequencing. Keep shared CTA/contact data in one utility/config source to avoid message drift.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/main.jsx`, `src/App.jsx` | Modified | Path-based entry/composition for home vs campaign page |
| `src/components/{Header,Hero,Features,Carousel,Contact,CardPricing,Footer}` | Modified | Reused/adapted sections and campaign-safe CTA/footer content |
| `src/utils/` | New/Modified | Shared WhatsApp CTA builder/config |
| `public/_redirects` or `netlify.toml` | New | SPA deep-link support for campaign path |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Incomplete event offer details | Med | Keep content/config easy to update; flag copy assumptions in spec/design |
| Manual pathname routing grows messy | Low | Limit to one campaign route and isolate page composition |
| Existing lint debt distracts review | Med | Keep fixes scoped to touched files only |

## Rollback Plan

Remove the campaign pathname branch and deployment redirect, returning traffic to the existing single-page home flow.

## Dependencies

- Final business copy for event offer, reservation policy, and FAQ answers.

## Success Criteria

- [ ] Direct visits to `/parasuramericanos-valledupar-2026` load correctly in production.
- [ ] Landing presents event dates, trust/location, rooms/services, policy, FAQ, and WhatsApp-first CTAs.
- [ ] WhatsApp CTAs use one shared message-generation path across touched surfaces.

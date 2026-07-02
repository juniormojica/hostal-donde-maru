# Proposal: Campaign Route Bundle Isolation

## Intent

Reduce avoidable initial JS for `/parasuramericanos-valledupar-2026` by stopping homepage-only modules and gallery assets from loading before route selection, without changing URLs, backend behavior, or tracking contracts.

## Scope

### In Scope
- Extract homepage rendering and asset imports from `src/App.jsx` into a dedicated homepage module.
- Lazy-load homepage, `/eventos`, and campaign routes with `React.lazy()` + `Suspense` from the shared app shell.
- Preserve current GTM/Meta Pixel/WhatsApp attribution bootstrap and direct-entry behavior for `/`, `/eventos`, and `/parasuramericanos-valledupar-2026`.

### Out of Scope
- Separate Vite entrypoints per HTML file.
- Backend, CRM, booking flow, or tracking vendor changes.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `parasuramericanos-campaign-landing`: add route-level bundle isolation expectations for the campaign landing's initial payload.
- `campaign-traffic-attribution`: preserve existing CTA/event tracking when route components become lazy-loaded.

## Approach

Keep `src/main.jsx` as the shared bootstrap so UTM capture stays eager. Refactor `src/App.jsx` into a lightweight pathname switch that lazy-loads `HomePage`, `EventsIndex`, and `ParasuramericanosLanding`. Move homepage-only image imports into the homepage module so Vite can emit route chunks and keep campaign traffic from paying homepage gallery cost.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/App.jsx` | Modified | Replace eager route/page imports with lazy route shell |
| `src/pages/HomePage/*` or equivalent | New | Hold homepage composition and gallery asset imports |
| `src/main.jsx` | Modified | Keep eager analytics bootstrap with lazy app render |
| `src/pages/EventsIndex/EventsIndex.jsx` | Modified | Verify lazy-route safety and campaign link continuity |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Homepage assets still leak into eager path | Med | Move all gallery imports out of `App.jsx` and smoke-check build output |
| Direct campaign entry shows loading flash | Med | Use minimal fallback that keeps first paint stable |
| Tracking stops firing on lazy routes | Low | Keep analytics bootstrap in `src/main.jsx` and verify CTA flows |

## Rollback Plan

Revert the route-shell refactor to the current eager `App.jsx` imports and single synchronous render path.

## Dependencies

- Existing React 18 lazy-loading support.

## Success Criteria

- [ ] Direct visits to `/`, `/eventos`, and `/parasuramericanos-valledupar-2026` still render the correct page.
- [ ] Campaign CTA tracking and WhatsApp flow still work without renamed events.
- [ ] Homepage-only gallery code is no longer imported from `src/App.jsx`.
- [ ] Planned implementation stays reviewable as a focused PR-2 slice near the 400-line budget.

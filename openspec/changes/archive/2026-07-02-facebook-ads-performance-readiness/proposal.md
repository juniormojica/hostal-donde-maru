# Proposal: Facebook Ads Performance Readiness

## Intent

Make the Parasuramericanos campaign page safer to buy traffic to before Facebook Ads launch. The MVP stays frontend-only and WhatsApp-first; this slice targets avoidable mobile load, render cost, and attribution hygiene.

## Scope

### In Scope
- Reduce above-the-fold and early gallery image weight on `/parasuramericanos-valledupar-2026`.
- Improve campaign render efficiency by trimming font/third-party critical-path cost.
- Clean CTA attribution so campaign traffic lands on the campaign page and analytics payloads never send empty `utm_*` values.
- Plan route/campaign isolation as a chained follow-up if it stays reviewable.

### Out of Scope
- Any backend, CRM, server-side conversion API, or booking engine work.
- Large site re-architecture beyond a focused campaign/home split.
- New ad creative, copywriting strategy, or campaign operations outside landing targeting hygiene.

## Capabilities

### New Capabilities
- `campaign-traffic-attribution`: campaign visits and WhatsApp CTA analytics carry clean campaign/UTM context without undefined placeholders.

### Modified Capabilities
- `parasuramericanos-campaign-landing`: tighten launch-readiness expectations for mobile asset weight, early media loading, and ad-targeted entry to the dedicated campaign page.

## Approach

Use chained PRs from the start.
- **PR 1 (autonomous slice):** image-weight cuts, early-load trimming, font/third-party hygiene, UTM cleanup, and explicit campaign-page targeting checks.
- **PR 2 (only if still focused):** isolate campaign code from homepage-only imports via route-aware splitting or campaign-specific entry boundaries.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/ParasuramericanosLanding/*` | Modified | Campaign media/loading priorities and CTA targeting behavior |
| `src/utils/analytics.js` | Modified | Remove undefined UTM leakage; preserve clean campaign context |
| `index.html` | Modified | Homepage font/third-party loading tuning |
| `parasuramericanos-valledupar-2026/index.html` | Modified | Campaign-specific font/third-party loading tuning |
| `src/App.jsx` | Modified | Follow-up route/campaign isolation if feasible |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Asset cuts hurt perceived trust | Med | Keep real-photo proof; optimize files before removing content |
| Bundle isolation exceeds first-slice budget | Med | Keep it in chained PR 2 only |
| Tracking cleanup changes GTM assumptions | Low | Preserve event names; only sanitize payload fields |

## Rollback Plan

Revert PR 1 independently to restore current assets/loading/tracking. If PR 2 ships, revert only the isolation changes and keep the campaign hygiene fixes.

## Dependencies

- Existing GTM/Meta Pixel setup remains the measurement path.

## Success Criteria

- [ ] Campaign ads can safely target `/parasuramericanos-valledupar-2026` as the primary landing URL.
- [ ] Campaign page ships with lighter early media cost and no `utm_* = undefined` analytics payloads.
- [ ] First PR remains autonomously reviewable within the 400-line budget; isolation work only proceeds as a clean child slice.

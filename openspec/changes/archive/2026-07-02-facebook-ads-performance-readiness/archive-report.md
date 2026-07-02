# Archive Report: facebook-ads-performance-readiness

**Archived**: 2026-07-02
**Status**: PR 1 complete and verified (PASS WITH WARNINGS). PR 2 (route/bundle isolation) preserved as follow-up, not completed scope.

## Artifact Lineage

| Artifact | OpenSpec Path | Engram ID |
|----------|---------------|-----------|
| Proposal | `openspec/changes/archive/2026-07-02-facebook-ads-performance-readiness/proposal.md` | #2932 |
| Spec (delta) | `openspec/changes/archive/2026-07-02-facebook-ads-performance-readiness/specs/` | #2934 |
| Design | `openspec/changes/archive/2026-07-02-facebook-ads-performance-readiness/design.md` | #2935 |
| Tasks | `openspec/changes/archive/2026-07-02-facebook-ads-performance-readiness/tasks.md` | #2939 |
| Apply Progress | `openspec/changes/archive/2026-07-02-facebook-ads-performance-readiness/apply-progress.md` | #2941 |
| Verify Report | `openspec/changes/archive/2026-07-02-facebook-ads-performance-readiness/verify-report.md` | #2944 |

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `parasuramericanos-campaign-landing` | Updated | 3 modified requirements (wider ad-readiness scope, optimization safety, mobile ad usability) + 1 added requirement (campaign media performance readiness) |
| `campaign-traffic-attribution` | Created | New domain spec added as source of truth for frontend-only campaign attribution |

### Merge Details — parasuramericanos-campaign-landing

**Modified — Event-qualified reservation page**:
- Updated description to include "suitable as the primary Facebook Ads destination URL"
- Added scenario: "Paid traffic lands on the campaign URL"

**Modified — Trust and stay proof**:
- Updated description to include "even when media assets are optimized"
- Added scenario: "Images are optimized without removing proof"

**Modified — WhatsApp-first conversion flow**:
- Updated description to include "keep mobile tap targets usable"
- Added scenario: "Mobile visitor taps the CTA"

**Added — Campaign media performance readiness**:
- New requirement with scenarios: "Above-the-fold media loads efficiently" and "Performance work remains frontend-only"

### Campaign Traffic Attribution

Full new domain spec (not a delta) covering clean campaign context, measurement event compatibility, and campaign URL readiness.

## Archive Contents

- proposal.md ✅
- specs/ ✅ (2 domains: campaign-traffic-attribution, parasuramericanos-campaign-landing)
- design.md ✅
- tasks.md ✅ (13/13 PR 1 tasks complete; 0/2 conditional PR 2 tasks deferred)
- apply-progress.md ✅
- verify-report.md ✅
- exploration.md ✅

## Source of Truth Updated

The following main specs now reflect the new behavior:
- `openspec/specs/parasuramericanos-campaign-landing/spec.md`
- `openspec/specs/campaign-traffic-attribution/spec.md`

## Risks / Warnings

- **PR 2 preserved as follow-up**: Route/bundle isolation in `src/App.jsx` (tasks 5.1, 5.2) was intentionally deferred. Active change folder has been moved to archive; PR 2 should be proposed as a new SDD change when scheduled.
- **Verify warnings**: Production redirect behavior not yet validated against deployed Netlify; shared main JS (323 kB) means campaign visitors still pay homepage code cost.
- **No commit or deploy was performed** per archive phase instructions.

## Scope Boundaries Preserved

- No backend, CRM, or server-side conversion API work was introduced.
- Route/bundle isolation remains explicitly out of scope for this archived change.
- PR 1 is independently revertible. PR 2 can be proposed as a clean follow-up slice.

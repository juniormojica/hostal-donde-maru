# Apply Progress: Facebook Ads Performance Readiness

## Change

`facebook-ads-performance-readiness`

## Mode

Standard mode. `openspec/config.yaml` has `strict_tdd: false` and no test runner; verification used lint, build, diff checks, browser smoke, network trace, and Lighthouse performance checks.

## Workload / PR Boundary

- Delivery strategy: force-chained / auto-chain.
- Chain strategy: feature-branch-chain, per user selection.
- Current work unit: PR 1 — media/loading/analytics/shell hygiene only.
- Boundary: optimized campaign assets, campaign image loading, WhatsApp attribution hygiene, font/static-shell hygiene, and no-slash campaign URL redirect hygiene.
- Out of scope: PR 2 route/bundle isolation in `src/App.jsx`.
- Review budget impact: code diff is small; binary campaign assets are new. Tracked text diff currently stays well under 400 changed lines for PR 1.

## Completed Tasks

- [x] 1.1 Added optimized campaign-only image files in `src/assets/`.
- [x] 1.2 Updated `src/pages/ParasuramericanosLanding/content.js` to use optimized campaign assets while preserving captions, alt intent, and declared dimensions.
- [x] 2.1 Confirmed only the hero image is eager/high-priority; gallery images remain lazy/async.
- [x] 2.2 Rechecked mobile CTA usability: primary CTA heights are ~56px+ on mobile and sticky CTA remains full-width.
- [x] 2.3 Trimmed campaign shell font request without changing GTM ID.
- [x] 2.4 Applied matching homepage shell font request cleanup.
- [x] 2.5 Added no-slash campaign URL hygiene: `/parasuramericanos-valledupar-2026` redirects/replaces to `/parasuramericanos-valledupar-2026/`, and campaign canonical/OG URL now use the trailing-slash shell URL.
- [x] 3.1 Updated WhatsApp CTA analytics to preserve `whatsapp_cta_click`, keep deterministic campaign fallback, and omit absent `utm_*` keys.
- [x] 3.2 Verified UTM capture still persists through `src/main.jsx` and `src/utils/analytics.js`.
- [x] 4.1 Ran `npm run lint`, `npm run build`, and `git diff --check` successfully.
- [x] 4.2 Browser-smoked mobile campaign rendering: offer visible above fold, no horizontal overflow, sticky CTA usable, room/policy proof present.
- [x] 4.3 Browser-smoked CTA analytics with and without UTMs: `whatsapp_cta_click` preserved and empty UTM fields omitted.
- [x] 4.4 Completed final network/Lighthouse/performance comparison.

## Files Changed

| File | Action | What Changed |
|------|--------|--------------|
| `src/assets/fachada_modified-campaign.webp` | Added | Optimized campaign hero image. |
| `src/assets/p2-campaign.webp` | Added | Optimized campaign gallery/common-area image. |
| `src/assets/h1-campaign.webp` | Added | Optimized campaign room image. |
| `src/assets/h3-campaign.webp` | Added | Optimized campaign room image. |
| `src/assets/h4-campaign.webp` | Added | Optimized campaign room image. |
| `src/pages/ParasuramericanosLanding/content.js` | Modified | Campaign content imports the optimized assets. |
| `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` | Modified | Hero stays eager/high priority; gallery stays lazy/async; CTA tap target remains mobile-safe. |
| `src/utils/analytics.js` | Modified | Cleans analytics payload and omits absent UTM values. |
| `index.html` | Modified | Font request cleanup and no-slash campaign redirect hygiene. |
| `parasuramericanos-valledupar-2026/index.html` | Modified | Font request cleanup plus trailing-slash canonical/OG URL. |
| `public/_redirects` | Modified | Redirects no-slash campaign URL to trailing-slash campaign shell. |
| `openspec/changes/facebook-ads-performance-readiness/tasks.md` | Modified | Checked off PR 1 tasks and aligned chain strategy to feature-branch-chain. |
| `openspec/changes/facebook-ads-performance-readiness/apply-progress.md` | Added | This progress artifact. |

## Verification Evidence

| Check | Result | Evidence |
|-------|--------|----------|
| Lint | Pass | `npm run lint` completed with no ESLint errors. |
| Build | Pass | `npm run build` completed; main JS is `323.40 kB` / `101.39 kB gzip`; campaign shell emitted at `dist/parasuramericanos-valledupar-2026/index.html`. |
| Diff hygiene | Pass | `git diff --check` completed with no whitespace errors. |
| No-slash shell behavior | Pass for browser users | Navigating to `http://127.0.0.1:4173/parasuramericanos-valledupar-2026?utm_source=facebook...` ended at `/parasuramericanos-valledupar-2026/` with title `Hospedaje para Parasuramericanos Valledupar 2026 | Hostal Donde Maru`, trailing-slash canonical, and campaign content. Raw Vite preview HTML for no-slash still starts from the root shell, so ads should target the trailing-slash URL and production redirect hygiene must remain. |
| UTM CTA payload | Pass | CTA click with UTMs emitted `whatsapp_cta_click` with `utm_source`, `utm_medium`, and `utm_campaign`; no-UTM click emitted no `utm_*` keys. |
| Mobile trace | Pass with follow-up | Chrome trace on preview: observed LCP `892 ms`, CLS `0.00` under unthrottled local conditions. |
| Lighthouse mobile | Partial / follow-up recommended | Mobile Lighthouse on preview: Performance `73`, FCP `2.4 s`, LCP `7.2 s`, TBT `90 ms`, CLS `0.005`, total transfer `961 KiB`, unused JS estimate `152 KiB`. |
| Lighthouse desktop | Pass | Desktop Lighthouse on preview: Performance `89`, FCP `0.9 s`, LCP `2.0 s`, TBT `40 ms`, CLS `0`, total transfer `1,382 KiB`, unused JS estimate `143 KiB`. |

## Performance Evidence

- Campaign image set reduced from about `1,104 KB` to `566 KB` (`48.7%` smaller):
  - `fachada_modified.webp` `218 KB` → `fachada_modified-campaign.webp` `174 KB` (`20.3%` smaller)
  - `p2.jpg` `324 KB` → `p2-campaign.webp` `186 KB` (`42.7%` smaller)
  - `h1.jpg` `193 KB` → `h1-campaign.webp` `72 KB` (`62.8%` smaller)
  - `h3.jpg` `172 KB` → `h3-campaign.webp` `57 KB` (`67.1%` smaller)
  - `h41.jpg` `196 KB` → `h4-campaign.webp` `78 KB` (`60.3%` smaller)
- Network/Lighthouse mobile still reports meaningful JS cost: main JS is shared and Lighthouse estimates about `152 KiB` unused JS on the campaign route.
- PR 2 route/bundle isolation is still recommended as a follow-up if the team wants to improve mobile Lighthouse LCP and remove homepage-only JS from campaign visitors.

## Deviations from Design

- Minimal no-slash URL hygiene was added because browser testing showed the no-slash URL could load the root shell metadata in Vite preview before redirecting. This is consistent with ad-readiness even though it was not originally a named implementation task.
- The user-selected chain strategy is feature-branch-chain; the original tasks artifact said stacked-to-main, so the tasks artifact was corrected to the selected strategy.

## Remaining Tasks

- [ ] 5.1 PR 2 only: route/bundle isolation if the campaign still pays meaningful homepage-only JS cost.
- [ ] 5.2 PR 2 only: re-run lint/build/direct-path smoke checks after isolation.

## Status

PR 1 apply is complete and ready for SDD verify. PR 2 is not implemented in this apply phase and remains a recommended follow-up, not a blocker for the PR 1 ad-readiness slice.

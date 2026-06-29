## Exploration: parasuramericanos-landing

### Current State
The app is a single-route React 18 + Vite SPA mounted from `src/main.jsx` into one `App` tree with no routing library. `src/App.jsx` composes a fixed sequence of sections (`Header`, `Hero`, `Features`, `Carousel`, `Contact`, `CardPricing`, `Map`, `Footer`) and hardcodes the current room gallery data there. Navigation is section-scroll based through `scrollToSection`, not path based.

WhatsApp is already the main conversion mechanism, but it is duplicated and inconsistent across components: `Hero`, `Contact`, and `CardPricing` each build their own `wa.me` URL and message, while `Footer` links to a placeholder number. Current copy is aimed at pensionados/professionals, not event travelers. Styling uses Tailwind utility classes with a small custom palette in `tailwind.config.js` (`secondaryYellow`, `accentGreen`, `heroText`), Poppins typography, and frequent Framer Motion entrance/hover animations.

### Affected Areas
- `src/App.jsx` — current single-page composition; likely split between default homepage and event landing entry.
- `src/main.jsx` — current app bootstrapping point if pathname-based rendering is introduced.
- `src/components/Header/Header.jsx` — current nav assumes section IDs only; landing nav/CTA set will differ.
- `src/components/Hero/Hero.jsx` — current headline/CTA are for general lodging and pensionados, not Parasuramericanos traffic.
- `src/components/Features/Features.jsx` — amenity section can be reused with event-specific benefit framing.
- `src/components/Carousel/Carousel.jsx` — existing image gallery is reusable for room proof, but content labels/disponibilidad language may need cleanup.
- `src/components/CardPricing/CardPricing.jsx` and `src/components/CardP/CardP.jsx` — current pricing models are monthly/day-based and can be adapted into event stay packages or reservation info blocks.
- `src/components/Contact/Contact.jsx` — simplest reusable WhatsApp CTA, but message text is currently wrong for this campaign.
- `src/components/Footer/Footer.jsx` — contains incorrect WhatsApp number and links to `/privacy` and `/terms` routes that do not exist.
- `src/utils/scrollToSection.js` — reusable if landing remains one long page with anchored sections.
- `tailwind.config.js` and `src/input.css` — define the current design system constraints.
- Deployment config (missing `_redirects` / `netlify.toml`) — deep-link support for `/parasuramericanos-valledupar-2026` is a delivery risk.

### Approaches
1. **Pathname-switched dedicated landing inside the existing SPA** — Keep the current stack and render a new dedicated landing when `window.location.pathname === '/parasuramericanos-valledupar-2026'`.
   - Pros: No new dependency, lowest implementation cost, preserves current homepage, fits current simple architecture.
   - Cons: Manual route handling, shared layout logic can get messy if more pages appear later, still needs Netlify deep-link handling.
   - Effort: Medium

2. **Introduce React Router with home + campaign route** — Add a router and separate page components for the existing home and the Parasuramericanos landing.
   - Pros: Clean URL handling, scalable for future legal pages/other campaigns, clearer component boundaries.
   - Cons: New dependency and refactor in a project that currently has no routing, larger review surface for an otherwise focused marketing change.
   - Effort: Medium/High

3. **Replace the current homepage with campaign content** — Rework existing sections in place without adding a dedicated route.
   - Pros: Lowest short-term complexity.
   - Cons: Bad fit for ad targeting, loses the general-purpose site, no clean campaign URL, harder to measure or iterate later.
   - Effort: Low

### Recommendation
Use **Approach 1** for the proposal: create a dedicated long-form landing at `/parasuramericanos-valledupar-2026` using the existing SPA architecture, shared room/gallery assets, and a centralized WhatsApp CTA builder. This gives the campaign its own ad-ready URL without paying the extra complexity cost of a router right now. Structure the landing around: event hero, trust/location near UPC, room options, included services, booking flow/policies, FAQ, map/venues, and repeated WhatsApp-first CTAs with prefilled reservation context (dates, guest count, event intent).

If the team expects more than one future campaign page or wants real legal pages soon, React Router becomes the better follow-up tradeoff. For THIS change, it is likely unnecessary overhead.

### Risks
- Deep links may fail in production because the repo has no Netlify redirect config for SPA paths.
- Current WhatsApp CTA logic is duplicated and inconsistent; if not centralized, campaign copy will drift again.
- Existing pricing/content is oriented to pensionados and monthly stays, so event-ready offer definitions still need business clarification.
- Footer currently exposes broken/placeholder links (`/privacy`, `/terms`, fake WhatsApp number), which can reduce trust on paid traffic.
- `npm run lint` already fails on existing prop-types issues, so implementation should avoid expanding unrelated lint debt or should plan a contained cleanup.

### Ready for Proposal
Yes — ready for proposal with a recommendation to keep the homepage intact, add a dedicated `/parasuramericanos-valledupar-2026` landing, centralize WhatsApp CTA generation, and explicitly include deployment handling for deep links in scope.

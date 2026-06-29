# Design: Parasuramericanos Landing

## Technical Approach

Add a dedicated campaign page inside the existing React/Vite SPA without introducing React Router. `App.jsx` will keep the current homepage as the default composition and branch on `window.location.pathname === '/parasuramericanos-valledupar-2026'` to render a new long-form campaign composition. Shared WhatsApp behavior moves into one utility/config module so campaign and touched homepage/footer CTAs use the same verified destination and never expose placeholder contact data.

The campaign visual direction should be event-travel editorial: high-trust, location-forward, warm hostel hospitality, using the existing Tailwind palette and Framer Motion patterns rather than adding dependencies.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Route handling | Pathname switch in `App.jsx` | React Router; replacing homepage | Meets one-route need with smallest review surface and preserves homepage. Router can be revisited if more routes appear. |
| Campaign structure | New page/section components under `src/pages/ParasuramericanosLanding/` | Mutating existing `Hero`, `Features`, `CardPricing` heavily | Keeps event copy isolated and prevents pensionado/monthly-stay regressions on `/`. |
| WhatsApp CTAs | `src/utils/whatsapp.js` plus shared contact constants | Keep per-component URL strings | Prevents message drift and fixes footer placeholder number once. |
| Deep-link delivery | Add `public/_redirects` with SPA fallback | Vite-only config | Netlify-style fallback is simple and addresses direct campaign URL reloads. |

## Data Flow

```text
Browser path ──→ App.jsx
  /parasuramericanos-valledupar-2026 ──→ ParasuramericanosLanding
  otherwise                            ──→ current homepage sections

CTA component ──→ buildWhatsAppUrl(context) ──→ wa.me verified number
```

Campaign sections consume local static content arrays for event facts, room proof, services, policy, FAQ, and CTA copy. Optional WhatsApp context is filtered before encoding so undefined placeholders never reach the message.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/App.jsx` | Modify | Branch between homepage and campaign page; keep existing homepage order intact. |
| `src/pages/ParasuramericanosLanding/ParasuramericanosLanding.jsx` | Create | Compose event hero, trust/location, rooms/services, policy, FAQ, map/venue, repeated WhatsApp CTAs. |
| `src/pages/ParasuramericanosLanding/content.js` | Create | Central campaign copy/data arrays for fast business-copy updates. |
| `src/utils/whatsapp.js` | Create | Verified contact constants and `buildWhatsAppUrl({ source, message, details })`. |
| `src/components/Contact/Contact.jsx` | Modify | Use shared WhatsApp builder; accept optional `messageContext`/`href` without breaking default children. |
| `src/components/Footer/Footer.jsx` | Modify | Use verified WhatsApp URL and remove unavailable `/privacy` and `/terms` trust links. |
| `src/components/Hero/Hero.jsx`, `src/components/CardPricing/CardPricing.jsx` | Modify | Replace duplicated WhatsApp URL creation with shared utility for touched CTAs. |
| `public/_redirects` | Create | `/* /index.html 200` for SPA deep links. |

## Interfaces / Contracts

```js
export const WHATSAPP_PHONE = '573218710632'

export function buildWhatsAppUrl({ source = 'general', message, details = {} } = {}) {
  // returns https://wa.me/{phone}?text={encodedReadableMessage}
}
```

`details` values are optional. Empty, null, or undefined values MUST be skipped. Campaign CTAs pass a message mentioning Hostal Donde Maru and Juegos Parasuramericanos Valledupar 2026.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Static quality | Syntax/lint regressions in touched JS/JSX | Run `npm run lint`; note pre-existing lint debt if unrelated failures remain. |
| Build | Vite bundle and route branch compile | Run `npm run build`. |
| Manual | `/` stays general; `/parasuramericanos-valledupar-2026` shows event date/context before first CTA; CTAs open encoded WhatsApp campaign message; footer has no fake/legal placeholder links; reload campaign path under preview/fallback. | Browser/manual verification after build. |

## Migration / Rollout

No data migration required. Roll out as a chained PR set because strategy is force-chained and budget is 400 lines: first shared WhatsApp/contact cleanup, then campaign page, then deep-link/manual verification. Rollback removes the pathname branch, campaign files, and `_redirects`.

## Open Questions

- [ ] Confirm final event dates, venue/location claims, reservation policy, and FAQ copy before implementation locks text.

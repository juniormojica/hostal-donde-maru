# Delta for Campaign Traffic Attribution

## MODIFIED Requirements

### Requirement: Measurement event compatibility

The system MUST preserve existing GTM and Meta Pixel event names while cleaning attribution payload fields and while campaign, homepage, and eventos route components are loaded lazily.
(Previously: The requirement preserved GTM and Meta Pixel event names while cleaning attribution payload fields, without explicitly covering lazy route loading.)

#### Scenario: WhatsApp CTA is measured

- GIVEN GTM and Meta Pixel are configured externally
- WHEN a campaign WhatsApp CTA click is tracked
- THEN the dataLayer event name MUST remain `whatsapp_cta_click`
- AND the Meta Pixel contact mapping MUST NOT require a renamed frontend event

#### Scenario: Lazy campaign route preserves tracking

- GIVEN a visitor opens `/parasuramericanos-valledupar-2026` directly
- WHEN the lazy-loaded campaign page renders and the visitor activates a WhatsApp CTA
- THEN GTM, Meta Pixel, and WhatsApp contact tracking MUST remain compatible with existing event names and payload contracts
- AND the WhatsApp contact flow MUST still open

### Requirement: Campaign URL readiness

The system MUST treat `/parasuramericanos-valledupar-2026` as the paid-campaign landing URL and keep attribution hygiene independent of backend services, including when route components are lazy-loaded.
(Previously: The requirement covered campaign URL rendering and browser attribution context, without explicitly covering lazy route loading.)

#### Scenario: Ad URL targets campaign page

- GIVEN a Facebook ad uses the campaign URL with UTM parameters
- WHEN the visitor opens the URL
- THEN the campaign page MUST render successfully
- AND CTA analytics MUST retain the campaign context available in the browser

#### Scenario: Direct campaign visit has no UTM parameters

- GIVEN a visitor opens the campaign URL without UTM parameters
- WHEN the lazy-loaded campaign page renders and a WhatsApp CTA is activated
- THEN attribution hygiene MUST still omit absent UTM fields
- AND measurement compatibility MUST NOT depend on backend services

# Campaign Traffic Attribution Specification

## Purpose

Define frontend-only campaign attribution behavior for WhatsApp contact conversions from paid traffic.

## Requirements

### Requirement: Clean campaign context

The system MUST keep campaign and UTM context clean for WhatsApp CTA analytics without sending empty, `undefined`, or placeholder `utm_*` values.

#### Scenario: Campaign visitor has UTM parameters

- GIVEN a visitor lands with valid `utm_*` query parameters
- WHEN they activate a WhatsApp CTA
- THEN the analytics payload MUST include only the present UTM values
- AND the WhatsApp contact flow MUST still open

#### Scenario: Visitor has no UTM parameters

- GIVEN a visitor lands without UTM parameters
- WHEN they activate a WhatsApp CTA
- THEN the analytics payload MUST omit absent UTM fields
- AND MUST NOT serialize absent fields as `undefined`, `null`, or empty strings

### Requirement: Measurement event compatibility

The system MUST preserve existing GTM and Meta Pixel event names while cleaning attribution payload fields.

#### Scenario: WhatsApp CTA is measured

- GIVEN GTM and Meta Pixel are configured externally
- WHEN a campaign WhatsApp CTA click is tracked
- THEN the dataLayer event name MUST remain `whatsapp_cta_click`
- AND the Meta Pixel contact mapping MUST NOT require a renamed frontend event

### Requirement: Campaign URL readiness

The system MUST treat `/parasuramericanos-valledupar-2026` as the paid-campaign landing URL and keep attribution hygiene independent of backend services.

#### Scenario: Ad URL targets campaign page

- GIVEN a Facebook ad uses the campaign URL with UTM parameters
- WHEN the visitor opens the URL
- THEN the campaign page MUST render successfully
- AND CTA analytics MUST retain the campaign context available in the browser

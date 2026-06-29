# WhatsApp Reservation CTA Specification

## Purpose

Define shared WhatsApp reservation behavior so campaign and touched contact surfaces send consistent, reservation-ready messages.

## Requirements

### Requirement: Shared reservation message behavior

All touched WhatsApp CTAs MUST use one consistent reservation message behavior and MUST include campaign context when launched from the Parasuramericanos landing.

#### Scenario: Campaign CTA opens with event context

- GIVEN a visitor activates a WhatsApp CTA from the campaign page
- WHEN WhatsApp opens
- THEN the prefilled message MUST identify Hostal Donde Maru
- AND MUST mention reservation interest for Juegos Parasuramericanos Valledupar 2026

#### Scenario: Required context is unavailable

- GIVEN optional reservation details are unavailable
- WHEN a WhatsApp CTA is generated
- THEN the message MUST remain readable and actionable
- AND MUST NOT include broken placeholders or undefined values

### Requirement: Trust-safe contact details

Touched contact and footer surfaces MUST use the same verified WhatsApp destination and MUST NOT expose placeholder contact data.

#### Scenario: Visitor uses non-campaign contact CTA

- GIVEN a visitor activates a touched WhatsApp CTA outside the campaign page
- WHEN WhatsApp opens
- THEN the destination MUST be the same verified reservation contact
- AND the message SHOULD match the surface context without campaign-only claims

#### Scenario: Visitor reviews footer/contact information

- GIVEN a visitor scans contact or footer content
- WHEN contact links are displayed
- THEN WhatsApp links MUST resolve to the verified reservation destination
- AND MUST NOT display fake numbers or unavailable legal-page links as trust signals

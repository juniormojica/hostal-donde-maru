# Parasuramericanos Campaign Landing Specification

## Purpose

Define the event-specific landing behavior for reservation traffic seeking lodging for Juegos Parasuramericanos Valledupar 2026.

## Requirements

### Requirement: Event-qualified reservation page

The system MUST provide a dedicated campaign page for `/parasuramericanos-valledupar-2026` that preserves the existing homepage behavior and clearly identifies the event, host city, and lodging offer.

#### Scenario: Campaign visitor understands the offer

- GIVEN a visitor opens the campaign page
- WHEN the page renders
- THEN the visitor MUST see Juegos Parasuramericanos Valledupar 2026 framing
- AND MUST see clear event dates and Valledupar lodging context before the first primary CTA

#### Scenario: Homepage remains separate

- GIVEN a visitor opens the default homepage
- WHEN the page renders
- THEN the content MUST remain general Hostal Donde Maru content
- AND MUST NOT be replaced by campaign-only messaging

### Requirement: Trust and stay proof

The campaign page MUST present enough trust, location, rooms, services, and policy information for an ad visitor to decide whether to start a reservation conversation.

#### Scenario: Visitor evaluates location and rooms

- GIVEN a visitor is reviewing the landing page
- WHEN they scan the main content
- THEN they MUST find location trust information relevant to Valledupar event travel
- AND MUST find room or accommodation proof with included services

#### Scenario: Visitor checks terms before contacting

- GIVEN a visitor needs booking confidence
- WHEN they review reservation information
- THEN they MUST find reservation policy content
- AND MUST find an FAQ covering common event-stay questions

### Requirement: WhatsApp-first conversion flow

The campaign page MUST prioritize WhatsApp reservation CTAs and repeat them at meaningful decision points without forcing a booking-engine flow.

#### Scenario: Visitor is ready to reserve

- GIVEN a visitor has reviewed event, room, or policy content
- WHEN they activate a primary reservation CTA
- THEN the system MUST open a WhatsApp reservation conversation for the campaign

#### Scenario: Visitor scrolls through long-form content

- GIVEN a visitor reaches later landing sections
- WHEN they encounter decision-support content
- THEN a WhatsApp reservation CTA SHOULD remain available near that content

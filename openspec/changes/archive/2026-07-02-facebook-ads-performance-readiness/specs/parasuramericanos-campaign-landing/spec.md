# Delta for Parasuramericanos Campaign Landing

## MODIFIED Requirements

### Requirement: Event-qualified reservation page

The system MUST provide a dedicated campaign page for `/parasuramericanos-valledupar-2026` that preserves the existing homepage behavior, clearly identifies the event, host city, and lodging offer, and is suitable as the primary Facebook Ads destination URL.
(Previously: dedicated event page existed, but ad-targeted URL readiness was not explicit.)

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

#### Scenario: Paid traffic lands on the campaign URL

- GIVEN a campaign URL points to `/parasuramericanos-valledupar-2026`
- WHEN a visitor opens it directly with or without UTM parameters
- THEN the campaign landing content MUST render instead of generic homepage content

### Requirement: Trust and stay proof

The campaign page MUST preserve enough trust, location, rooms, services, photo proof, and policy information for an ad visitor to decide whether to start a WhatsApp reservation conversation, even when media assets are optimized.
(Previously: trust content was required, but optimization safety was not explicit.)

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

#### Scenario: Images are optimized without removing proof

- GIVEN campaign images are compressed, resized, replaced, or loading behavior changes
- WHEN the visitor reviews decision-support sections
- THEN real stay/location/room proof SHOULD remain visible
- AND optimization MUST NOT remove the trust signals needed before contacting

### Requirement: WhatsApp-first conversion flow

The campaign page MUST prioritize WhatsApp reservation CTAs, keep mobile tap targets usable, and repeat CTAs at meaningful decision points without forcing a booking-engine flow.
(Previously: WhatsApp CTAs were required, but mobile ad-traffic usability was not explicit.)

#### Scenario: Visitor is ready to reserve

- GIVEN a visitor has reviewed event, room, or policy content
- WHEN they activate a primary reservation CTA
- THEN the system MUST open a WhatsApp reservation conversation for the campaign

#### Scenario: Visitor scrolls through long-form content

- GIVEN a visitor reaches later landing sections
- WHEN they encounter decision-support content
- THEN a WhatsApp reservation CTA SHOULD remain available near that content

#### Scenario: Mobile visitor taps the CTA

- GIVEN a mobile ad visitor views the campaign page
- WHEN they attempt to contact the hostal
- THEN primary WhatsApp CTAs MUST remain easy to identify and activate by touch

## ADDED Requirements

### Requirement: Campaign media performance readiness

The campaign page MUST reduce avoidable early media weight and loading work while preserving above-the-fold comprehension and conversion trust.

#### Scenario: Above-the-fold media loads efficiently

- GIVEN a mobile visitor opens the campaign page
- WHEN initial content loads
- THEN above-the-fold media MUST be optimized for mobile delivery
- AND below-fold media SHOULD avoid loading before it is needed

#### Scenario: Performance work remains frontend-only

- GIVEN media and render optimizations are implemented
- WHEN the campaign page is built
- THEN the solution MUST NOT require backend, CRM, booking engine, or server-side conversion API changes

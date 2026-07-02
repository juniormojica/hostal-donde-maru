# Parasuramericanos Campaign Landing Specification

## Purpose

Define the event-specific landing behavior for reservation traffic seeking lodging for Juegos Parasuramericanos Valledupar 2026.

## Requirements

### Requirement: Event-qualified reservation page

The system MUST provide a dedicated campaign page for `/parasuramericanos-valledupar-2026` that preserves the existing homepage behavior, clearly identifies the event, host city, and lodging offer, and is suitable as the primary Facebook Ads destination URL.

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

### Requirement: Route-level initial payload isolation

The system MUST allow direct campaign visits to render the campaign landing without eagerly loading homepage-only modules or assets, while preserving existing public route behavior for `/`, `/eventos`, and `/parasuramericanos-valledupar-2026`.

#### Scenario: Campaign route avoids homepage-only eager payload

- GIVEN a visitor opens `/parasuramericanos-valledupar-2026` directly
- WHEN the initial route payload is requested
- THEN homepage-only modules and assets MUST NOT be eagerly loaded before route selection
- AND the campaign landing content MUST still render successfully

#### Scenario: Homepage route remains intact

- GIVEN a visitor opens `/`
- WHEN the route renders
- THEN the visitor MUST see the existing general Hostal Donde Maru homepage experience
- AND the page MUST NOT render campaign-only or eventos-only content

#### Scenario: Eventos route remains intact

- GIVEN a visitor opens `/eventos`
- WHEN the route renders
- THEN the visitor MUST see the existing eventos experience
- AND campaign route isolation MUST NOT break navigation from eventos to the campaign URL

#### Scenario: Lazy fallback is mobile-safe

- GIVEN a mobile visitor opens a lazy-loaded route on a slow connection
- WHEN fallback UI is shown before route content is ready
- THEN the fallback SHOULD be lightweight and visually stable
- AND it MUST NOT expose misleading disabled CTAs or cause unsafe layout shifts around primary content

#### Scenario: Bundle isolation remains frontend-only

- GIVEN route-level loading behavior changes
- WHEN the application is built and deployed
- THEN the solution MUST NOT require backend, CRM, booking engine, or server-side conversion API changes

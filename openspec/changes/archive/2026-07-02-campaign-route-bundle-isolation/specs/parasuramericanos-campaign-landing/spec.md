# Delta for Parasuramericanos Campaign Landing

## ADDED Requirements

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

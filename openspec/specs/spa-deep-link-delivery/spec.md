# SPA Deep Link Delivery Specification

## Purpose

Define production delivery behavior for direct visits to the campaign URL in the existing single-page application.

## Requirements

### Requirement: Campaign deep link availability

Production delivery MUST support direct navigation to `/parasuramericanos-valledupar-2026` and return the campaign experience instead of a missing-page or server error.

#### Scenario: Visitor lands from an ad

- GIVEN a visitor opens `/parasuramericanos-valledupar-2026` directly
- WHEN the deployed site responds
- THEN the page MUST load successfully
- AND MUST render the Parasuramericanos campaign landing content

#### Scenario: Visitor reloads the campaign page

- GIVEN a visitor is on `/parasuramericanos-valledupar-2026`
- WHEN they refresh the browser
- THEN the page MUST remain available
- AND MUST render the same campaign experience

### Requirement: Non-campaign route safety

The campaign delivery behavior MUST NOT break access to the default homepage.

#### Scenario: Visitor opens the root URL

- GIVEN a visitor opens `/`
- WHEN the deployed site responds
- THEN the default homepage MUST load successfully
- AND MUST NOT require the campaign path to view general content

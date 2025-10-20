# Feature Specification: External Image CDN Integration

**Feature Branch**: `001-cloudflare-r2-cdn`
**Created**: 2025-10-20
**Status**: Draft
**Input**: User description: "connect cloudflare R2 bucket as images CDN for this app. the crendital information are in .env.local"

## User Scenarios & Testing (mandatory)

### User Story 1 - Serve site images via CDN (Priority: P1)

Public visitors view pages where all site images (logos, hero images, portfolio items) are delivered via a fast, globally distributed image delivery endpoint.

**Why this priority**: Directly impacts page performance and perceived quality; improves conversion and SEO.

**Independent Test**: Load any page and verify that image URLs resolve to the external CDN domain and render correctly with no broken assets.

**Acceptance Scenarios**:

1. Given a published page, When the page is requested, Then all image URLs load from the external CDN and display correctly.
2. Given a slow network, When a page is loaded, Then above-the-fold images appear promptly with placeholders or graceful loading states.

---

### User Story 2 - Admin updates an image and sees changes live (Priority: P2)

An authorized maintainer replaces an existing image used on a page and expects the new image to appear for visitors within a short, predictable time window.

**Why this priority**: Keeps content fresh and ensures editorial control.

**Independent Test**: Replace a known image, hard-refresh the page, and verify the new asset is served, with stale versions not lingering beyond the defined cache window.

**Acceptance Scenarios**:

1. Given an existing image is replaced, When a visitor reloads the page, Then the updated image is served within the defined cache window.
2. Given caching is present, When the maintainer performs a content update, Then there is a clear mechanism to force refresh within the bounds of the policy.

---

### User Story 3 - Safe configuration management (Priority: P3)

Operators can configure credentials and endpoints without exposing secrets to end users.

**Why this priority**: Reduces security risk and operational mistakes.

**Independent Test**: Review deployed artifacts and client-side code to confirm no secrets are embedded; verify configuration is read from environment at runtime.

**Acceptance Scenarios**:

1. Given environment variables are present, When the app initializes, Then the feature works without hard-coded secrets.
2. Given environment variables are missing or invalid, When the app starts, Then it fails safely with clear diagnostics and does not leak sensitive data.

---

### Edge Cases

- Missing or malformed configuration (e.g., absent environment variables)
- Incorrect image keys/paths resulting in 404s
- Very large source images impacting load time
- Content updated but cache not refreshed as expected
- Hotlinking or unauthorized access to private assets (if any)

## Requirements (mandatory)

### Functional Requirements

- FR-001: The system MUST serve all site images via an external CDN domain.
- FR-002: The system MUST allow maintainers to update images and have changes propagate to end users within a defined cache window.
- FR-003: The system MUST provide a fallback placeholder for missing or invalid image references.
- FR-004: The system MUST prevent exposure of secrets in client-delivered assets and source maps.
- FR-005: The system MUST read configuration (credentials, endpoints, bucket names or equivalent) from environment variables.
- FR-006: The system MUST log and surface actionable errors for failed image loads or configuration issues without leaking sensitive values.
- FR-007: The system SHOULD support responsive image delivery (appropriate sizes for different viewports) to minimize bandwidth.
- FR-008: The system SHOULD provide a documented process to refresh or invalidate cached images when content changes.
- FR-009: The system MUST apply a default cache TTL of 24 hours for image responses and support on-demand purge for updated keys.
- FR-010: The system MUST use existing, already-uploaded assets; no new upload workflow is included in scope.
- FR-011: The system MUST assume all images are public-access assets; no access-controlled image delivery is required.

### Acceptance Criteria (per requirement)

- AC-001 (FR-001): On a sample of pages, 100% of image URLs resolve to the external CDN domain.
- AC-002 (FR-002): After replacing an image, at least 90% of visitors see the new image within 24 hours or earlier if purge is invoked.
- AC-003 (FR-003): For an intentionally missing key, a visible, non-broken placeholder is rendered without layout shift beyond one reflow.
- AC-004 (FR-004): Static asset inspections and source-map reviews reveal no secrets; automated checks flag builds if secrets are present.
- AC-005 (FR-005): Removing required environment variables results in a clear startup/runtime error with guidance to set them, without exposing secret values.
- AC-006 (FR-006): Failed image loads are logged with timestamp, logical key, and status; logs contain no credentials and can be correlated to user reports.
- AC-007 (FR-007): On a set of three viewport widths, delivered image dimensions do not exceed container width by more than 10%.
- AC-008 (FR-008): Documented steps exist to refresh or invalidate cached images; following the steps results in updated content being served within minutes.
- AC-009 (FR-009): Default response headers indicate 24-hour caching; invoking the purge process makes a replaced image visible within 15 minutes to test clients.
- AC-010 (FR-010): No UI or process steps for uploading new media are required to complete the feature demo; existing assets suffice.
- AC-011 (FR-011): No signed URL or access control checks are required for images; public access tests pass from an unauthenticated browser session.

### Key Entities (include if feature involves data)

- ImageAsset: Logical representation of an image used by the site; attributes include logical key, human-friendly name, alt text, canonical URL, and optional variant metadata (size, width/height, format).
- ContentReference: Links pages or components to an ImageAsset, enabling replacement without changing templates.

## Success Criteria (mandatory)

### Measurable Outcomes

- SC-001: For typical pages, above-the-fold images become visibly rendered within 1.0 second on a standard mobile network profile.
- SC-002: 95% of image requests on production pages complete successfully on first attempt during a 7-day window.
- SC-003: After an image replacement, 90% of visitors see the updated image within the defined cache window.
- SC-004: Zero incidents of exposed secrets in client-delivered assets verified via automated checks prior to release.

## Assumptions

- Credentials and configuration are available via environment variables managed outside of client-side code.
- All current site images are intended to be publicly accessible; if private images are needed, scope will be adjusted.
- No user-generated content moderation is required for images in the current scope.

## Dependencies

- Operational access to configure environment variables in deployment targets.
- Editorial process for replacing images and communicating cache expectations to stakeholders.

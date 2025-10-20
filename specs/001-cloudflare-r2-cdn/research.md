# Research: Cloudflare R2 CDN Integration

## Decisions

- Decision: Use public Cloudflare R2 bucket behind CDN with base URL from env (`R2_PUBLIC_BASE_URL`).

  - Rationale: Simpler, aligns with public-assets scope; no signed URLs required.
  - Alternatives considered: Signed URLs (not needed for public assets); Proxy through Next.js (adds latency, cost, and complexity).

- Decision: Cache policy set to 24h TTL; on-demand purge for updated keys.

  - Rationale: Balances performance with freshness; editorial updates can trigger purge.
  - Alternatives considered: Shorter TTL (increased origin load, less caching benefit); Versioned URLs (feasible later if needed).

- Decision: No upload workflow in scope; reuse existing assets.

  - Rationale: Keeps feature small; meets current needs.
  - Alternatives considered: Admin upload UI; external DAM integration.

- Decision: All images are public.
  - Rationale: Avoids access-control complexity; meets current use cases.
  - Alternatives considered: Mixed/public+private with signed URLs.

## Patterns & Best Practices

- Configure Next.js images to allow the CDN domain via `images.remotePatterns` or `images.domains`.
- Use `next/image` for responsive loading, sizes, and lazy loading.
- Provide placeholders or fallbacks for missing keys.
- Do not embed secrets in client code; only public base URL is exposed.
- Keep object keys ASCII/URL-safe; document naming conventions.
- For purge: document Cloudflare Dashboard/API procedure; avoid automatic purge unless necessary.

## Unknowns Resolved

- Upload scope: out-of-scope (existing assets only).
- Access model: public only.
- Cache TTL/invalidation: 24h TTL with on-demand purge.

# Implementation Plan: Cloudflare R2 CDN Integration

**Branch**: `001-cloudflare-r2-cdn` | **Date**: 2025-10-20 | **Spec**: specs/001-cloudflare-r2-cdn/spec.md
**Input**: Feature specification from `/specs/001-cloudflare-r2-cdn/spec.md`

## Summary

Enable serving all site images via a Cloudflare R2-backed public CDN, using a configured public base URL. Configure Next.js image optimization to allow the CDN domain, ensure 24h cache TTL with on-demand purge for updates, and render a sample R2 image on the landing page. No upload workflows or private images are in scope.

## Technical Context

**Language/Version**: TypeScript, Next.js (App Router)
**Primary Dependencies**: Next.js Image component, Tailwind CSS, shadcn/ui; Cloudflare R2 (public bucket via CDN)
**Storage**: Cloudflare R2 (public objects)
**Testing**: Manual verification and lightweight integration checks via Next.js pages; later add E2E as needed
**Target Platform**: Vercel (Next.js)
**Project Type**: Web application
**Performance Goals**: Page images load quickly and reliably; above-the-fold visible within ~1s on standard mobile network
**Constraints**: Secrets must not leak to client; use environment variables; public assets only
**Scale/Scope**: Site-wide image delivery via CDN; no authoring UI or uploads

## Constitution Check

- Gates based on constitution are informational only in this repository template; no violations detected.
- No new libraries or complex workflows introduced; plan focuses on configuration and minimal code.

## Project Structure

### Documentation (this feature)

```
specs/001-cloudflare-r2-cdn/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── openapi.yaml
```

### Source Code (repository root)

```
app/
├── page.tsx              # Update: render sample R2 image on landing page
└── ...                   # Existing routes/components

lib/
└── images.ts             # Optional helpers: buildR2Url(key)
```

**Structure Decision**: Single Next.js web app; minimal additions to `app/page.tsx` and optional helper in `lib/images.ts`.

## Complexity Tracking

No exceptions required.

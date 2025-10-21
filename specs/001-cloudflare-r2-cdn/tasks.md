# Tasks: Cloudflare R2 CDN Integration

## Setup

- [ ] Verify `.env.local` contains `NEXT_PUBLIC_R2_BASE_URL`
- [ ] Configure Next.js `images.remotePatterns` to allow CDN hostname

## Tests

- [ ] Manual check: landing page renders an image from R2 CDN without errors

## Core

- [ ] Add optional helper `lib/images.ts` with `buildR2Url(key)`
- [ ] Update `app/page.tsx` to render a sample R2 image using env base URL

## Integration

- [ ] (Optional) Add `/api/r2/health` route to expose base URL and status
- [ ] Document purge procedure in README or quickstart

## Polish

- [ ] Ensure no secrets leak into client bundles (only public base URL used)
- [ ] Add alt text and dimensions to images for accessibility and CLS control

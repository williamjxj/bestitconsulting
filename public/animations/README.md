# Animation Assets

This directory contains all animation-related assets for the BestIT Consulting website.

## Directory Structure

- `particles/` - Particle system assets and configurations
- `backgrounds/` - Background videos, images, and patterns
- `icons/` - Animated icons and graphics

## Asset Guidelines

### Performance

- All assets should be optimized for web delivery
- Images should be in modern formats (WebP, AVIF) with fallbacks
- Videos should be compressed and optimized for streaming
- Particle systems should be lightweight and performant

### Accessibility

- All assets should respect `prefers-reduced-motion`
- Provide static fallbacks for animated content
- Ensure sufficient color contrast for text overlays

### Mobile Optimization

- Assets should be optimized for mobile devices
- Consider battery usage for animated content
- Provide simplified versions for low-end devices

## Usage

Assets in this directory are automatically served by Next.js and can be referenced in components using the `/animations/` path.

Example:

```tsx
import Image from 'next/image'

;<Image
  src='/animations/backgrounds/hero-bg.webp'
  alt='Hero background'
  width={1920}
  height={1080}
/>
```

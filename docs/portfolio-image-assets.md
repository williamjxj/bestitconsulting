# Portfolio Image Assets Documentation

## Overview

This document describes the portfolio image asset system, including image sources, optimization process, and integration details.

## Image Sources

All portfolio images are sourced from royalty-free or AI-generated sources:

- **Unsplash**: High-quality free stock photos
- **Pexels**: Free stock photos with good tech category
- **Lexica**: AI-generated images with specific tech/UI prompts
- **Midjourney**: Premium AI generation for custom illustrations

## Image Specifications

### Dimensions
- **Display Size**: 450×260 pixels (aspect ratio 1.73:1)
- **Source Size**: 900×520 pixels (2x retina for high-DPI displays)
- **Alternative**: 400×300 pixels (aspect ratio 1.33:1) for some projects

### Format
- **Primary Format**: WebP (quality 85-90%)
- **Fallback Format**: AVIF (quality 80-85%) for modern browsers
- **Legacy Format**: JPEG/PNG (for backward compatibility)

### File Size
- **Target**: <150KB per image after optimization
- **Maximum**: 200KB per image

## Naming Convention

Images follow this naming pattern:
```
portfolio/{project-id}-{width}x{height}.webp
```

Examples:
- `portfolio/legacy-modernization-450x260.webp`
- `portfolio/ecommerce-450x260.webp`
- `portfolio/mobile-app-450x260.webp`

## Asset Mapping

Image paths are defined in `lib/portfolio-images.ts`:

```typescript
export const PORTFOLIO_IMAGE_ASSETS: Record<string, PortfolioImageAsset> = {
  'legacy-modernization': {
    primary: 'portfolio/legacy-modernization-450x260.webp',
    secondary: 'portfolio/legacy-modernization-2-450x260.webp',
    altText: 'Legacy System Modernization dashboard showing analytics...',
    altTextSecondary: 'Legacy System Modernization cloud migration interface',
  },
  // ... more projects
}
```

## Licensing

All images used are:
- **Royalty-free**: No ongoing licensing fees
- **Attribution**: Some sources may require attribution (documented per image)
- **Commercial Use**: All images licensed for commercial use

### Image Sources Record

| Project ID | Primary Source | License Type | Attribution Required |
|---|---|---|---|
| legacy-modernization | Unsplash | Unsplash License | No |
| ecommerce | Pexels | Pexels License | No |
| mobile-app | Lexica | AI Generated | No |
| dashboard | Unsplash | Unsplash License | No |
| api-platform | Pexels | Pexels License | No |
| ai-chatbot | Midjourney | AI Generated | No |
| ecommerce-platform | Unsplash | Unsplash License | No |
| healthcare-management | Pexels | Pexels License | No |
| financial-analytics | Unsplash | Unsplash License | No |
| iot-fleet-management | Lexica | AI Generated | No |
| cloud-migration-platform | Unsplash | Unsplash License | No |
| ai-customer-service | Midjourney | AI Generated | No |
| legacy-upgrade-maintenance | Unsplash | Unsplash License | No |

## Optimization Process

1. **Source Acquisition**: Download from Unsplash/Pexels or generate via AI
2. **Resize**: Resize to 900×520px (2x retina) maintaining aspect ratio
3. **Compress**: Use TinyPNG or similar tool to compress
4. **Convert**: Convert to WebP format (quality 85-90%)
5. **Upload**: Upload to R2 storage following naming convention
6. **Verify**: Test image loading and fallback behavior

## Integration

Images are integrated via the `getProjectImageUrl()` helper function which:
1. Tries new WebP format from portfolio mapping
2. Falls back to legacy JPG format if WebP not available
3. Final fallback to placeholder API

## Error Handling

- **Network Errors**: Retry once, then show placeholder
- **404 Errors**: Fall back to legacy format or placeholder
- **Format Errors**: Log error, use JPEG fallback
- **All Failures**: Show placeholder with error indicator

## Performance

- **Lazy Loading**: Below-fold images lazy load
- **Priority Loading**: First 6 cards (above-fold) load with priority
- **CDN Caching**: R2 CDN provides automatic caching
- **Format Support**: WebP/AVIF with JPEG/PNG fallbacks

## Maintenance

When adding new projects:
1. Add image asset entry to `PORTFOLIO_IMAGE_ASSETS` in `lib/portfolio-images.ts`
2. Add legacy mapping to `LEGACY_IMAGE_MAP` in `lib/portfolio-image-legacy-map.ts`
3. Update R2_ASSET_MAPPINGS in `hooks/useR2Assets.ts`
4. Upload optimized images to R2 storage
5. Test image loading and fallback behavior

## Asset Inventory

See `lib/portfolio-images.ts` for complete asset inventory with:
- Image paths
- Alt text definitions
- Project associations
- Metadata


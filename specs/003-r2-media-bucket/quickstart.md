# Quickstart: R2 Media Bucket Integration

**Feature**: R2 Media Bucket Access
**Date**: 2024-12-19
**Purpose**: Quick implementation guide for integrating R2 media into the about page

## Prerequisites

- Next.js 15.2.4 application with App Router
- Cloudflare R2 bucket configured
- Environment variable `NEXT_PUBLIC_R2_MORE_URL` set
- Existing about page at `/app/about/page.tsx`

## Environment Setup

### 1. Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_R2_MORE_URL=https://pub-280494fad9014906948b6a6a70b3466f.r2.dev
```

### 2. Verify R2 Bucket Access

Test the R2 bucket health endpoint:

```bash
curl http://localhost:3001/api/r2/health
```

Expected response:

```json
{
  "status": "healthy",
  "bucketUrl": "https://pub-280494fad9014906948b6a6a70b3466f.r2.dev",
  "lastChecked": "2024-12-19T10:30:00Z",
  "responseTime": 150
}
```

## Implementation Steps

### Step 1: Create R2 Media Utilities

Create `lib/r2-media.ts`:

```typescript
export interface MediaAsset {
  id: string
  filename: string
  url: string
  type: 'image' | 'video'
  alt: string
  category: 'team' | 'company' | 'general'
  width?: number
  height?: number
}

export function getR2BaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_MORE_URL
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_R2_MORE_URL is not configured')
  }
  return baseUrl
}

export function buildR2Url(path: string): string {
  const baseUrl = getR2BaseUrl()
  return `${baseUrl}/${path}`
}

export function getMediaAssets(category: string): MediaAsset[] {
  // Implementation for fetching media assets
  // This would typically call your R2 bucket API
  return []
}
```

### Step 2: Create Enhanced R2 Image Component

Create `components/R2Image.tsx`:

```typescript
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { buildR2Url } from '@/lib/r2-media'

interface R2ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  fallback?: string
  className?: string
}

export default function R2Image({
  src,
  alt,
  width,
  height,
  priority = false,
  fallback = '/placeholders/image-placeholder.jpg',
  className = ''
}: R2ImageProps) {
  const [imgSrc, setImgSrc] = useState(buildR2Url(src))
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
    setImgSrc(fallback)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}
```

### Step 3: Create Media Gallery Component

Create `components/MediaGallery.tsx`:

```typescript
'use client'

import R2Image from './R2Image'
import { MediaAsset } from '@/lib/r2-media'

interface MediaGalleryProps {
  category: 'team' | 'company'
  title: string
  assets: MediaAsset[]
  layout?: 'grid' | 'carousel'
  maxItems?: number
}

export default function MediaGallery({
  category,
  title,
  assets,
  layout = 'grid',
  maxItems = 6
}: MediaGalleryProps) {
  const displayAssets = assets.slice(0, maxItems)

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className={`grid gap-4 ${
        layout === 'grid'
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-1'
      }`}>
        {displayAssets.map((asset) => (
          <R2Image
            key={asset.id}
            src={asset.filename}
            alt={asset.alt}
            width={300}
            height={200}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
          />
        ))}
      </div>
    </section>
  )
}
```

### Step 4: Update About Page

Update `app/about/page.tsx`:

```typescript
import MediaGallery from '@/components/MediaGallery'
import { getMediaAssets } from '@/lib/r2-media'

export default function AboutPage() {
  // Fetch media assets (in real implementation, this would be async)
  const teamAssets = getMediaAssets('team')
  const companyAssets = getMediaAssets('company')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>

      {/* Existing about content */}
      <div className="prose max-w-none">
        <p>Your existing about page content...</p>
      </div>

      {/* Team Photos Section */}
      {teamAssets.length > 0 && (
        <MediaGallery
          category="team"
          title="Our Team"
          assets={teamAssets}
          layout="grid"
          maxItems={8}
        />
      )}

      {/* Company Images Section */}
      {companyAssets.length > 0 && (
        <MediaGallery
          category="company"
          title="Our Company"
          assets={companyAssets}
          layout="grid"
          maxItems={6}
        />
      )}
    </div>
  )
}
```

### Step 5: Add Placeholder Images

Create placeholder images in `public/placeholders/`:

- `image-placeholder.jpg` - Generic placeholder
- `team-placeholder.jpg` - Team photo placeholder
- `company-placeholder.jpg` - Company image placeholder

## Testing

### 1. Health Check Test

```bash
# Test R2 bucket health
curl http://localhost:3001/api/r2/health
```

### 2. Media Loading Test

1. Start development server: `npm run dev`
2. Navigate to `/about` page
3. Verify images load from R2 bucket
4. Test fallback behavior by temporarily breaking R2 URL

### 3. Performance Test

```bash
# Test image loading performance
curl -w "@curl-format.txt" -o /dev/null -s "https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/team/example.jpg"
```

## Troubleshooting

### Common Issues

1. **Environment Variable Not Set**

   - Error: `NEXT_PUBLIC_R2_MORE_URL is not configured`
   - Solution: Add to `.env.local` and restart dev server

2. **R2 Bucket Not Accessible**

   - Error: 503 status from health check
   - Solution: Verify bucket URL and permissions

3. **Images Not Loading**

   - Check browser network tab for 404 errors
   - Verify image paths in R2 bucket
   - Test direct URL access

4. **Slow Loading**
   - Implement lazy loading for below-fold images
   - Optimize image sizes in R2 bucket
   - Check CDN configuration

## Next Steps

1. Upload actual team photos and company images to R2 bucket
2. Configure proper image optimization settings
3. Add video support for company content
4. Implement advanced gallery features (lightbox, filters)
5. Add analytics for media engagement

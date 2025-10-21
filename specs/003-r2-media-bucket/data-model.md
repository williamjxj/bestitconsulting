# Data Model: R2 Media Bucket Integration

**Feature**: R2 Media Bucket Access
**Date**: 2024-12-19
**Purpose**: Define data structures for R2 media integration and about page components

## Core Entities

### MediaAsset

Represents individual media files stored in the R2 bucket.

**Attributes**:

- `id: string` - Unique identifier for the media asset
- `filename: string` - Original filename of the media file
- `url: string` - Full R2 CDN URL for the media asset
- `type: 'image' | 'video'` - Media type classification
- `format: string` - File format (jpg, png, webp, mp4, etc.)
- `size: number` - File size in bytes
- `width?: number` - Image/video width in pixels (optional)
- `height?: number` - Image/video height in pixels (optional)
- `alt: string` - Alternative text for accessibility
- `category: 'team' | 'company' | 'general'` - Content category
- `uploadedAt: Date` - Upload timestamp
- `isActive: boolean` - Whether the asset is currently displayed

**Validation Rules**:

- `id` must be unique across all media assets
- `url` must be a valid R2 CDN URL
- `type` must be either 'image' or 'video'
- `alt` is required for accessibility compliance
- `category` determines which component displays the asset

**State Transitions**:

- `draft` → `active` (when asset is uploaded and ready)
- `active` → `inactive` (when asset is temporarily hidden)
- `inactive` → `active` (when asset is re-enabled)

### R2BucketConfig

Represents the configuration for accessing the R2 media bucket.

**Attributes**:

- `baseUrl: string` - Base URL from NEXT_PUBLIC_R2_MORE_URL
- `bucketName: string` - R2 bucket name
- `region: string` - R2 region (e.g., 'auto')
- `isConfigured: boolean` - Whether configuration is valid
- `lastChecked: Date` - Last health check timestamp
- `isHealthy: boolean` - Whether bucket is accessible

**Validation Rules**:

- `baseUrl` must be a valid HTTPS URL
- `bucketName` must be non-empty string
- `isConfigured` must be true for media operations
- `isHealthy` determines fallback behavior

### MediaGallery

Represents a collection of media assets for display.

**Attributes**:

- `id: string` - Unique gallery identifier
- `title: string` - Gallery display title
- `description?: string` - Optional gallery description
- `category: 'team' | 'company'` - Gallery category
- `assets: MediaAsset[]` - Array of media assets in gallery
- `layout: 'grid' | 'carousel' | 'masonry'` - Display layout
- `maxItems?: number` - Maximum items to display
- `isVisible: boolean` - Whether gallery is currently displayed

**Validation Rules**:

- `id` must be unique across all galleries
- `assets` array cannot be empty for visible galleries
- `layout` must be one of the supported layout types
- `maxItems` must be positive integer if specified

## Component Data Flow

### About Page Integration

1. **Page Load**: About page requests media configuration
2. **Config Check**: System validates R2 bucket configuration
3. **Asset Loading**: Components request media assets by category
4. **Rendering**: Media components render with loading states
5. **Error Handling**: Fallback to placeholder images if needed

### Media Component Props

**MediaGallery Component**:

```typescript
interface MediaGalleryProps {
  category: 'team' | 'company'
  layout?: 'grid' | 'carousel' | 'masonry'
  maxItems?: number
  showTitles?: boolean
  enableLazyLoading?: boolean
}
```

**R2Image Component**:

```typescript
interface R2ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  fallback?: string
}
```

## Data Relationships

- **R2BucketConfig** → **MediaAsset**: One-to-many (bucket contains many assets)
- **MediaGallery** → **MediaAsset**: One-to-many (gallery contains many assets)
- **MediaAsset** → **R2BucketConfig**: Many-to-one (assets belong to bucket)

## State Management

### Loading States

- `loading: boolean` - Whether media is currently loading
- `error: string | null` - Error message if loading fails
- `retryCount: number` - Number of retry attempts

### Media States

- `loaded: boolean` - Whether media has successfully loaded
- `fallback: boolean` - Whether fallback image is being used
- `optimized: boolean` - Whether image has been optimized

## Validation and Constraints

### Media Asset Constraints

- Maximum file size: 10MB for images, 100MB for videos
- Supported formats: jpg, png, webp, gif, mp4, webm
- Minimum dimensions: 100x100 pixels
- Maximum dimensions: 4000x4000 pixels

### Performance Constraints

- Image loading timeout: 5 seconds
- Retry attempts: 3 maximum
- Lazy loading threshold: 100px from viewport
- Cache duration: 24 hours for successful loads

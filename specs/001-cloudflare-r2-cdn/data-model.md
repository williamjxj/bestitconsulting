# Data Model

## Entities

### ImageAsset

- key: string (path within R2 bucket)
- altText: string
- width: number (optional)
- height: number (optional)
- format: enum [jpg, png, webp, avif] (optional)

### ContentReference

- page: string (e.g., "/")
- slot: string (e.g., "hero-image")
- imageKey: string (references ImageAsset.key)

## Validation

- imageKey must be URL-safe and non-empty
- altText should be non-empty for accessibility

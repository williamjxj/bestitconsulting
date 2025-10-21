# Quickstart: Cloudflare R2 CDN Integration

## 1) Configure environment

Add to `.env.local` (values supplied separately):

R2_PUBLIC_BASE_URL is deprecated. Use:
NEXT_PUBLIC_R2_BASE_URL=https://cdn.example.com # public base URL to bucket/object gateway

## 2) Allow CDN domain for Next.js images

In `next.config.ts`:

```ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }]
}
```

## 3) Optional helper

Create `lib/images.ts`:

```ts
export function buildR2Url(key: string): string {
  const base = process.env.NEXT_PUBLIC_R2_BASE_URL
  if (!base) return ''
  return `${base.replace(/\/$/, '')}/${key.replace(/^\//, '')}`
}
```

## 4) Render an image on the landing page

In `app/page.tsx`, use `next/image` with your R2 URL (example key `hero.jpg`):

```tsx
import Image from 'next/image'

export default function Page() {
  const src = process.env.NEXT_PUBLIC_R2_BASE_URL
    ? `${process.env.NEXT_PUBLIC_R2_BASE_URL}/hero.jpg`
    : undefined

  return (
    <main>
      {src && <Image src={src} alt='Hero' width={1600} height={900} priority />}
    </main>
  )
}
```

## 5) Purge on updates

Use Cloudflare Dashboard or API to purge an updated object key to propagate changes sooner than the 24h TTL.

## 6) Verify

- Visit `/api/r2/health` → should return `{ ok: true, baseUrl: "..." }`
- Load the landing page and confirm the image is served from the CDN host

## Troubleshooting

### 404 Error: Image Not Found

If you see `upstream image response failed for https://... 404`:

1. **Check the image exists**: Upload `hero.jpg` to your R2 bucket at the root level
2. **Verify the URL**: The expected URL is shown in the fallback message on the page
3. **Check permissions**: Ensure the R2 bucket allows public read access
4. **Test direct access**: Try opening the full URL in a new browser tab

### Common Issues

- **Wrong image key**: Update the key in `app/page.tsx` (currently `hero.jpg`)
- **Missing environment variable**: Ensure `NEXT_PUBLIC_R2_BASE_URL` is set in `.env.local`
- **CDN not configured**: The base URL should point to your R2 public gateway, not the bucket directly

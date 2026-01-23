# SEO Optimization Quick Start Guide

**Project:** Best IT Consulting - SEO Enhancement  
**Target Audience:** Developers implementing SEO features  
**Estimated Setup Time:** 30 minutes

---

## Prerequisites

- Node.js 18+ installed
- Next.js 15+ project set up
- TypeScript enabled
- Vercel deployment (recommended)

---

## Quick Setup (5 Minutes)

### 1. Install Dependencies

```bash
npm install next-sitemap schema-dts
npm install --save-dev @types/node
```

### 2. Create next-sitemap Config

Create `next-sitemap.config.js` in project root:

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://bestitconsulting.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/admin/*', '/api/*', '/_next/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/static/*', '/admin/*'],
      },
    ],
  },
};
```

### 3. Update package.json Scripts

```json
{
  "scripts": {
    "build": "next build && next-sitemap",
    "postbuild": "next-sitemap"
  }
}
```

### 4. Create SEO Utils File

Create `lib/seo-utils.ts`:

```typescript
import type { Metadata } from 'next';

export function buildPageMetadata(
  title: string,
  description: string,
  pathname: string
): Metadata {
  const baseUrl = 'https://bestitconsulting.com';
  const fullUrl = `${baseUrl}${pathname}`;
  
  return {
    title: `${title} | Best IT Consulting`,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Best IT Consulting',
      images: [
        {
          url: `${baseUrl}/og-images/default.png`,
          width: 1200,
          height: 630,
          alt: `${title} - Best IT Consulting`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'x-default': fullUrl,
        'en': fullUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

---

## Adding Metadata to Pages (2 Minutes per Page)

### Example: Home Page

```typescript
// app/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';

export const metadata: Metadata = buildPageMetadata(
  'Modern Web Solutions & IT Services',
  'Professional IT consulting, web development, and digital transformation. Transform your business with cutting-edge technology.',
  '/'
);

export default function HomePage() {
  return (
    // ... your page content
  );
}
```

### Example: Services Page

```typescript
// app/services/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';

export const metadata: Metadata = buildPageMetadata(
  'Our Services - Web Development, Cloud, DevOps',
  'Comprehensive IT services including web development, cloud migration, DevOps consulting, and digital transformation.',
  '/services'
);

export default function ServicesPage() {
  return (
    // ... your page content
  );
}
```

---

## Adding Structured Data (5 Minutes)

### Organization Schema (Root Layout)

```typescript
// app/layout.tsx
import type { Organization } from 'schema-dts';

const organizationSchema: Organization = {
  '@type': 'Organization',
  name: 'Best IT Consulting',
  url: 'https://bestitconsulting.com',
  logo: 'https://bestitconsulting.com/logo.png',
  description: 'Professional IT consulting and modern web solutions',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@bestitconsulting.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...organizationSchema,
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Service Schema (Services Page)

```typescript
// app/services/page.tsx
import type { Service } from 'schema-dts';

const serviceSchema: Service = {
  '@type': 'Service',
  name: 'Web Development',
  description: 'Custom web application development using Next.js and modern technologies',
  provider: {
    '@type': 'Organization',
    name: 'Best IT Consulting',
  },
  serviceType: 'Web Development',
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...serviceSchema,
          }),
        }}
      />
      {/* ... page content */}
    </>
  );
}
```

---

## Custom Open Graph Images (10 Minutes)

### 1. Create OG Images

Create images in `public/og-images/`:
- Dimensions: 1200×630px
- Format: PNG or JPEG
- File size: <200KB each

**Required Images:**
- `default.png` - Fallback for all pages
- `home.png` - Home page
- `services.png` - Services page
- `about.png` - About page
- `contact.png` - Contact page
- `portfolio.png` - Portfolio page
- `case-studies.png` - Case studies page
- `testimonials.png` - Testimonials page

### 2. Update SEO Utils with OG Image Mapping

```typescript
// lib/seo-utils.ts
const OG_IMAGES: Record<string, string> = {
  '/': '/og-images/home.png',
  '/about': '/og-images/about.png',
  '/services': '/og-images/services.png',
  '/portfolio': '/og-images/portfolio.png',
  '/contact': '/og-images/contact.png',
  '/case-studies': '/og-images/case-studies.png',
  '/testimonials': '/og-images/testimonials.png',
};

export function getOGImage(pathname: string): string {
  return OG_IMAGES[pathname] || '/og-images/default.png';
}

// Update buildPageMetadata to use getOGImage
export function buildPageMetadata(
  title: string,
  description: string,
  pathname: string
): Metadata {
  const baseUrl = 'https://bestitconsulting.com';
  const ogImage = getOGImage(pathname);
  
  return {
    // ... other metadata
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${title} - Best IT Consulting`,
        },
      ],
      // ... other OG properties
    },
  };
}
```

---

## Environment-Aware Robots.txt (3 Minutes)

### Create app/robots.ts

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bestitconsulting.com';
  const isProduction = process.env.VERCEL_ENV === 'production';

  if (!isProduction) {
    // Block all crawling on staging/preview
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Production: Allow with exclusions
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/_next/static/*', '/admin/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## Testing Your Implementation (5 Minutes)

### 1. Build and Test Locally

```bash
npm run build
npm run start

# Open browser to:
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
```

### 2. Validate Metadata

- View page source and check `<head>` tags
- Look for title, description, og:* tags, canonical
- Verify JSON-LD scripts

### 3. Test with External Tools

**Lighthouse:**
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --only-categories=seo
```

**Expected SEO Score:** >95

**Rich Results Test:**
- https://search.google.com/test/rich-results
- Paste URL or HTML
- Verify Organization, Service, Review schemas

**Open Graph Debugger:**
- https://developers.facebook.com/tools/debug/
- Test OG image display

---

## Common Commands

### Build with Sitemap
```bash
npm run build
```

### Test Production Build
```bash
npm run build && npm run start
```

### Validate TypeScript
```bash
npx tsc --noEmit
```

### Audit SEO
```bash
lighthouse https://bestitconsulting.com --only-categories=seo
```

---

## Verification Checklist

After implementation, verify:

- [ ] `sitemap.xml` generated and accessible
- [ ] `robots.txt` generated with correct rules
- [ ] All major pages have unique title tags
- [ ] All major pages have unique meta descriptions
- [ ] Open Graph images display correctly on social platforms
- [ ] Structured data validates without errors (Rich Results Test)
- [ ] Canonical URLs present on all pages
- [ ] hreflang tags configured (x-default for English)
- [ ] Lighthouse SEO score >95
- [ ] Mobile-friendly test passes

---

## Troubleshooting

### Sitemap not generating
**Solution:** Check that `postbuild` script runs after `next build`

```bash
# Verify postbuild runs
npm run build
# Look for "next-sitemap" in output
```

### OG images not displaying
**Solution:** Verify images exist and URLs are absolute

```bash
# Check images exist
ls -la public/og-images/

# Verify URLs in metadata
curl http://localhost:3000 | grep "og:image"
```

### Structured data errors
**Solution:** Validate JSON-LD syntax

- Use Rich Results Test tool
- Check for required fields
- Ensure proper TypeScript types from schema-dts

### Robots.txt not blocking staging
**Solution:** Verify environment variable

```bash
# Check environment
echo $VERCEL_ENV

# Should be "preview" or "development" on staging
```

---

## Next Steps

After quick setup:

1. **Add metadata to remaining pages** (10-15 pages)
2. **Create custom OG images** for major pages
3. **Implement Review schema** on testimonials page
4. **Implement FAQPage schema** on FAQ page
5. **Submit sitemap to Google Search Console**
6. **Monitor indexing status** in Search Console
7. **Track SEO improvements** with analytics

---

## Resources

### Documentation
- Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- next-sitemap: https://github.com/iamvishnusankar/next-sitemap
- Schema.org: https://schema.org/
- Open Graph Protocol: https://ogp.me/

### Tools
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Rich Results Test: https://search.google.com/test/rich-results
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Google Search Console: https://search.google.com/search-console

---

## Support

For issues or questions:
- Review `research.md` for detailed decisions and rationale
- Check `data-model.md` for data structure specifications
- Consult `plan.md` for full implementation timeline

---

**Document Status:** ✅ Ready for Implementation  
**Last Updated:** 2026-01-23  
**Estimated Total Setup Time:** 30 minutes + ongoing metadata additions

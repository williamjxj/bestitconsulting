# SEO Data Model

**Project:** Best IT Consulting - SEO Enhancement  
**Date:** 2026-01-23  
**Version:** 1.0.0

---

## Overview

This document defines the data structures, entities, and relationships for the SEO optimization implementation. All structures are TypeScript-based to ensure type safety and maintainability.

---

## 1. Core Metadata Structures

### 1.1 SEOMetadata Interface

Primary interface for page-level SEO metadata configuration.

```typescript
/**
 * Complete SEO metadata configuration for a page
 */
export interface SEOMetadata {
  /** Page title (max 60 characters recommended) */
  title: string;
  
  /** Meta description (max 160 characters recommended) */
  description: string;
  
  /** Target keywords for the page (optional, low priority) */
  keywords?: string[];
  
  /** Open Graph metadata for social sharing */
  openGraph?: OpenGraphMetadata;
  
  /** Twitter Card metadata */
  twitter?: TwitterMetadata;
  
  /** Canonical URL (absolute URL) */
  canonical?: string;
  
  /** Multi-language alternates */
  alternates?: AlternatesMetadata;
  
  /** Robots directives */
  robots?: RobotsMetadata;
}
```

**Validation Rules:**
- `title`: Required, 10-60 characters, unique per page
- `description`: Required, 50-160 characters, unique per page, compelling CTA
- `keywords`: Optional (low SEO value), max 10 keywords if used
- All URLs must be absolute (include protocol and domain)

**Example:**
```typescript
const homeMetadata: SEOMetadata = {
  title: 'Best IT Consulting - Modern Web Solutions & IT Services',
  description: 'Professional IT consulting, web development, and digital solutions. Transform your business with modern technology. Contact us for a free consultation.',
  openGraph: {
    title: 'Best IT Consulting | Transform Your Business',
    description: 'Expert IT consulting and modern web development services',
    images: [
      {
        url: 'https://bestitconsulting.ca/og-images/home.png',
        width: 1200,
        height: 630,
        alt: 'Best IT Consulting - Modern Web Solutions',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bestitconsulting',
    creator: '@bestitconsulting',
  },
  canonical: 'https://bestitconsulting.ca/',
  alternates: {
    languages: {
      'x-default': 'https://bestitconsulting.ca/',
      'en': 'https://bestitconsulting.ca/',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

### 1.2 OpenGraphMetadata Interface

Open Graph protocol metadata for social media sharing.

```typescript
/**
 * Open Graph metadata for social platforms (Facebook, LinkedIn, etc.)
 */
export interface OpenGraphMetadata {
  /** OG title (can differ from page title) */
  title?: string;
  
  /** OG description (can differ from meta description) */
  description?: string;
  
  /** OG images (1200x630 recommended) */
  images?: OpenGraphImage[];
  
  /** Content type (website, article, profile) */
  type?: 'website' | 'article' | 'profile';
  
  /** Locale (e.g., 'en_US') */
  locale?: string;
  
  /** Site name */
  siteName?: string;
}

/**
 * Open Graph image specification
 */
export interface OpenGraphImage {
  /** Absolute URL to image */
  url: string;
  
  /** Image width in pixels (1200 recommended) */
  width: number;
  
  /** Image height in pixels (630 recommended) */
  height: number;
  
  /** Image alt text (accessibility + context) */
  alt: string;
  
  /** Image MIME type (optional) */
  type?: string;
}
```

**Image Specifications:**
- Dimensions: 1200×630px (1.91:1 aspect ratio)
- Format: PNG or JPEG
- File size: <200KB
- Safe zone: Center 1200×600px (some platforms crop)

**Example:**
```typescript
const ogImage: OpenGraphImage = {
  url: 'https://bestitconsulting.ca/og-images/services.png',
  width: 1200,
  height: 630,
  alt: 'Best IT Consulting Services - Web Development, Cloud, DevOps',
  type: 'image/png',
};
```

---

### 1.3 TwitterMetadata Interface

Twitter-specific metadata for Twitter Cards.

```typescript
/**
 * Twitter Card metadata
 */
export interface TwitterMetadata {
  /** Card type */
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  
  /** Twitter handle for the site (@username) */
  site?: string;
  
  /** Twitter handle for the content creator (@username) */
  creator?: string;
  
  /** Title (if different from OG title) */
  title?: string;
  
  /** Description (if different from OG description) */
  description?: string;
  
  /** Image URL (if different from OG image) */
  images?: string[];
}
```

**Card Types:**
- `summary`: Square image, title, description
- `summary_large_image`: Large rectangular image (recommended)
- `app`: Mobile app promotion
- `player`: Video/audio player

**Recommended:** Use `summary_large_image` for best visual impact

---

### 1.4 AlternatesMetadata Interface

Multi-language alternate URLs (hreflang).

```typescript
/**
 * Alternate language versions
 */
export interface AlternatesMetadata {
  /** Language-specific URLs */
  languages?: Record<string, string>;
  
  /** Media-specific alternates (optional) */
  media?: Record<string, string>;
  
  /** Type-specific alternates (optional) */
  types?: Record<string, string>;
}
```

**Language Codes:**
- `x-default`: Default language (fallback)
- `en`: English
- `fr`: French
- `es`: Spanish
- `zh`: Chinese

**Example:**
```typescript
const alternates: AlternatesMetadata = {
  languages: {
    'x-default': 'https://bestitconsulting.ca/',
    'en': 'https://bestitconsulting.ca/',
    'fr': 'https://bestitconsulting.ca/fr/', // Future
    'es': 'https://bestitconsulting.ca/es/', // Future
    'zh': 'https://bestitconsulting.ca/zh/', // Future
  },
};
```

---

### 1.5 RobotsMetadata Interface

Robots meta tag directives.

```typescript
/**
 * Robots meta tag directives
 */
export interface RobotsMetadata {
  /** Allow indexing */
  index?: boolean;
  
  /** Allow following links */
  follow?: boolean;
  
  /** Prevent caching */
  noarchive?: boolean;
  
  /** Prevent snippet in search results */
  nosnippet?: boolean;
  
  /** Prevent image indexing */
  noimageindex?: boolean;
  
  /** Max snippet length in characters */
  maxSnippet?: number;
  
  /** Max image preview size */
  maxImagePreview?: 'none' | 'standard' | 'large';
  
  /** Max video preview length in seconds */
  maxVideoPreview?: number;
}
```

**Default Values:**
```typescript
const defaultRobots: RobotsMetadata = {
  index: true,
  follow: true,
  maxImagePreview: 'large',
  maxSnippet: -1, // No limit
  maxVideoPreview: -1, // No limit
};
```

---

## 2. Structured Data Schemas (JSON-LD)

### 2.1 Base StructuredDataSchema

Base interface for all schema.org types.

```typescript
import type { Thing, WithContext } from 'schema-dts';

/**
 * Base structured data schema
 */
export type StructuredDataSchema = WithContext<Thing>;
```

---

### 2.2 Organization Schema

Business/organization identity (site-wide).

```typescript
import type { Organization } from 'schema-dts';

/**
 * Organization schema (site-wide)
 */
export const organizationSchema: Organization = {
  '@type': 'Organization',
  name: 'Best IT Consulting',
  alternateName: 'Best IT',
  url: 'https://bestitconsulting.ca',
  logo: 'https://bestitconsulting.ca/logo.png',
  description: 'Professional IT consulting and modern web solutions provider specializing in web development, cloud services, and digital transformation.',
  
  foundingDate: '2008', // Update with actual date
  
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
    addressRegion: 'BC',
    addressLocality: 'Vancouver', // Update with actual location
    postalCode: 'V5K 0A1', // Update with actual postal code
    streetAddress: '123 Main Street', // Update with actual address
  },
  
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@bestitconsulting.ca',
    availableLanguage: ['English', 'French', 'Spanish', 'Chinese'],
  },
  
  sameAs: [
    'https://linkedin.com/company/bestitconsulting',
    'https://twitter.com/bestitconsulting',
    'https://github.com/bestitconsulting',
    // Add other social profiles
  ],
};
```

**Required Fields:**
- `@type`: 'Organization'
- `name`: Legal business name
- `url`: Homepage URL

**Recommended Fields:**
- `logo`: High-resolution logo
- `description`: Brief business description
- `address`: Physical address (if applicable)
- `contactPoint`: Contact information
- `sameAs`: Social media profiles

---

### 2.3 WebSite Schema

Website identity with search action (home page only).

```typescript
import type { WebSite, SearchAction } from 'schema-dts';

/**
 * WebSite schema (home page)
 */
export const websiteSchema: WebSite = {
  '@type': 'WebSite',
  name: 'Best IT Consulting',
  alternateName: 'Best IT',
  url: 'https://bestitconsulting.ca',
  description: 'Professional IT consulting and modern web solutions',
  
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://bestitconsulting.ca/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  } as SearchAction,
  
  publisher: {
    '@type': 'Organization',
    name: 'Best IT Consulting',
  },
};
```

**Benefits:**
- Enables sitelinks search box in Google
- Clarifies site identity
- Links to parent organization

---

### 2.4 Service Schema

Service offerings (services page).

```typescript
import type { Service } from 'schema-dts';

/**
 * Service schema for individual services
 */
export interface ServiceSchemaData {
  name: string;
  description: string;
  serviceType: string;
  provider: string;
  areaServed?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
}

export function createServiceSchema(data: ServiceSchemaData): Service {
  return {
    '@type': 'Service',
    name: data.name,
    description: data.description,
    serviceType: data.serviceType,
    
    provider: {
      '@type': 'Organization',
      name: data.provider,
      url: 'https://bestitconsulting.ca',
    },
    
    areaServed: data.areaServed ? {
      '@type': 'Place',
      name: data.areaServed,
    } : undefined,
    
    offers: data.offers ? {
      '@type': 'Offer',
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency || 'CAD',
    } : undefined,
  };
}
```

**Example Usage:**
```typescript
const webDevService = createServiceSchema({
  name: 'Web Development',
  description: 'Custom web application development using modern frameworks like Next.js, React, and TypeScript',
  serviceType: 'Web Development',
  provider: 'Best IT Consulting',
  areaServed: 'Canada',
});
```

---

### 2.5 Review Schema

Client testimonials (testimonials page).

```typescript
import type { Review, Rating } from 'schema-dts';

/**
 * Review schema for testimonials
 */
export interface ReviewSchemaData {
  author: string;
  reviewBody: string;
  rating?: number; // 1-5
  datePublished?: string; // ISO 8601 date
}

export function createReviewSchema(data: ReviewSchemaData): Review {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: data.author,
    },
    
    reviewBody: data.reviewBody,
    
    reviewRating: data.rating ? {
      '@type': 'Rating',
      ratingValue: data.rating,
      bestRating: 5,
      worstRating: 1,
    } as Rating : undefined,
    
    datePublished: data.datePublished,
    
    itemReviewed: {
      '@type': 'Organization',
      name: 'Best IT Consulting',
      sameAs: 'https://bestitconsulting.ca',
    },
  };
}
```

**Example Usage:**
```typescript
const testimonial = createReviewSchema({
  author: 'John Smith',
  reviewBody: 'Best IT Consulting transformed our business with a modern web application. Their expertise in Next.js and cloud deployment was invaluable.',
  rating: 5,
  datePublished: '2025-12-15',
});
```

**Benefits:**
- Star ratings display in search results
- Builds trust and credibility
- Rich snippets in Google

---

### 2.6 FAQPage Schema

Frequently asked questions (FAQ page).

```typescript
import type { FAQPage, Question } from 'schema-dts';

/**
 * FAQ item interface
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Create FAQPage schema from FAQ items
 */
export function createFAQPageSchema(faqs: FAQItem[]): FAQPage {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    } as Question)),
  };
}
```

**Example Usage:**
```typescript
const faqPage = createFAQPageSchema([
  {
    question: 'What services does Best IT Consulting offer?',
    answer: 'We offer web development, cloud services, DevOps consulting, and digital transformation services.',
  },
  {
    question: 'Do you work with small businesses?',
    answer: 'Yes! We work with businesses of all sizes, from startups to enterprises.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'We specialize in Next.js, React, TypeScript, Node.js, AWS, and modern web technologies.',
  },
]);
```

**Benefits:**
- FAQ snippets in search results (high CTR)
- Accordion/expandable display in Google
- Answers common questions directly in search

---

## 3. Configuration Entities

### 3.1 SitemapConfig

Configuration for sitemap generation.

```typescript
/**
 * Sitemap configuration
 */
export interface SitemapConfig {
  /** Base URL for the site */
  siteUrl: string;
  
  /** Generate robots.txt */
  generateRobotsTxt: boolean;
  
  /** Generate sitemap index for large sites */
  generateIndexSitemap: boolean;
  
  /** Paths to exclude from sitemap */
  exclude: string[];
  
  /** Additional static paths */
  additionalPaths?: string[];
  
  /** Change frequency default */
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  
  /** Priority default (0.0 - 1.0) */
  priority?: number;
  
  /** Robots.txt options */
  robotsTxtOptions?: RobotsTxtOptions;
}

export interface RobotsTxtOptions {
  /** Robot policies */
  policies: RobotPolicy[];
  
  /** Additional sitemaps */
  additionalSitemaps?: string[];
}

export interface RobotPolicy {
  /** User agent */
  userAgent: string;
  
  /** Allowed paths */
  allow?: string | string[];
  
  /** Disallowed paths */
  disallow?: string | string[];
  
  /** Crawl delay in seconds */
  crawlDelay?: number;
}
```

**Example Configuration:**
```typescript
const sitemapConfig: SitemapConfig = {
  siteUrl: 'https://bestitconsulting.ca',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/admin/*', '/api/*', '/_next/*'],
  changefreq: 'weekly',
  priority: 0.7,
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

---

### 3.2 OGImageConfig

Open Graph image mapping configuration.

```typescript
/**
 * Open Graph image configuration
 */
export interface OGImageConfig {
  /** Default fallback image */
  default: string;
  
  /** Page-specific images */
  pages: Record<string, string>;
}

/**
 * OG image configuration
 */
export const ogImageConfig: OGImageConfig = {
  default: '/og-images/default.png',
  pages: {
    '/': '/og-images/home.png',
    '/about': '/og-images/about.png',
    '/services': '/og-images/services.png',
    '/portfolio': '/og-images/portfolio.png',
    '/contact': '/og-images/contact.png',
    '/case-studies': '/og-images/case-studies.png',
    '/testimonials': '/og-images/testimonials.png',
  },
};

/**
 * Get OG image for a pathname
 */
export function getOGImage(pathname: string): string {
  return ogImageConfig.pages[pathname] || ogImageConfig.default;
}
```

---

## 4. Utility Functions

### 4.1 Metadata Generation

```typescript
/**
 * Build complete page metadata
 */
export function buildPageMetadata(
  title: string,
  description: string,
  pathname: string,
  options?: Partial<SEOMetadata>
): SEOMetadata {
  const baseUrl = 'https://bestitconsulting.ca';
  const fullUrl = `${baseUrl}${pathname}`;
  const ogImage = getOGImage(pathname);
  
  return {
    title: `${title} | Best IT Consulting`,
    description,
    openGraph: {
      title: options?.openGraph?.title || title,
      description: options?.openGraph?.description || description,
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${title} - Best IT Consulting`,
        },
      ],
      type: 'website',
      siteName: 'Best IT Consulting',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@bestitconsulting',
      creator: '@bestitconsulting',
    },
    canonical: fullUrl,
    alternates: {
      languages: {
        'x-default': fullUrl,
        'en': fullUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    ...options,
  };
}
```

---

### 4.2 Structured Data Injection

```typescript
import type { Thing, WithContext } from 'schema-dts';

/**
 * Generate script tag for structured data
 */
export function structuredDataScript(data: WithContext<Thing>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  });
}

/**
 * Structured data component
 */
export function StructuredData({ data }: { data: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredDataScript(data) }}
    />
  );
}
```

---

## 5. Data Relationships

### Entity Relationship Diagram

```
┌─────────────────┐
│   SEOMetadata   │◄─── buildPageMetadata()
├─────────────────┤
│ - title         │
│ - description   │
│ - openGraph     ├──┐
│ - twitter       │  │
│ - canonical     │  │
│ - alternates    │  │
│ - robots        │  │
└─────────────────┘  │
                     │
                     ▼
        ┌────────────────────────┐
        │  OpenGraphMetadata     │
        ├────────────────────────┤
        │ - title                │
        │ - description          │
        │ - images ───────►      │
        │ - type                 │
        └────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   OpenGraphImage       │
        ├────────────────────────┤
        │ - url                  │
        │ - width (1200)         │
        │ - height (630)         │
        │ - alt                  │
        └────────────────────────┘

┌──────────────────────┐
│ Structured Data      │
├──────────────────────┤
│ - Organization       │◄─── Site-wide (root layout)
│ - WebSite            │◄─── Home page only
│ - Service            │◄─── Services page
│ - Review             │◄─── Testimonials page
│ - FAQPage            │◄─── FAQ page
└──────────────────────┘
```

---

## 6. Validation Rules

### Metadata Validation

```typescript
/**
 * Validate SEO metadata
 */
export function validateMetadata(metadata: SEOMetadata): string[] {
  const errors: string[] = [];
  
  // Title validation
  if (!metadata.title || metadata.title.length < 10) {
    errors.push('Title must be at least 10 characters');
  }
  if (metadata.title && metadata.title.length > 60) {
    errors.push('Title should be under 60 characters');
  }
  
  // Description validation
  if (!metadata.description || metadata.description.length < 50) {
    errors.push('Description must be at least 50 characters');
  }
  if (metadata.description && metadata.description.length > 160) {
    errors.push('Description should be under 160 characters');
  }
  
  // OG Image validation
  if (metadata.openGraph?.images) {
    metadata.openGraph.images.forEach((img, idx) => {
      if (img.width !== 1200 || img.height !== 630) {
        errors.push(`OG image ${idx} should be 1200x630px`);
      }
      if (!img.url.startsWith('http')) {
        errors.push(`OG image ${idx} URL must be absolute`);
      }
    });
  }
  
  // Canonical URL validation
  if (metadata.canonical && !metadata.canonical.startsWith('http')) {
    errors.push('Canonical URL must be absolute');
  }
  
  return errors;
}
```

---

## 7. State Transitions

### Metadata Lifecycle

```
[Draft] ──► [Validated] ──► [Rendered] ──► [Indexed]
   │            │              │             │
   │            │              │             ▼
   │            │              │        [Search Results]
   │            │              │             │
   │            │              │             ▼
   │            │              │      [User Click-Through]
   │            │              │
   │            ▼              ▼
   │     [Build-Time]    [Runtime]
   │         │              │
   └─────────┴──────────────┘
              │
              ▼
         [Deployed]
```

**States:**
1. **Draft:** Metadata written in code/config
2. **Validated:** Passes validation rules
3. **Build-Time:** Generated during build (static pages)
4. **Runtime:** Generated on request (dynamic pages)
5. **Rendered:** Included in HTML <head>
6. **Indexed:** Crawled by search engines
7. **Search Results:** Displayed in SERP
8. **User Click-Through:** User visits page

---

## 8. Data Sources

### Static Data
- **Source:** Configuration files and code
- **Examples:** Organization schema, default OG images
- **Update Frequency:** Manual (code deployments)

### Dynamic Data
- **Source:** CMS, database, or API
- **Examples:** Case study metadata, blog post metadata
- **Update Frequency:** Real-time or on-demand

### Build-Time Data
- **Source:** File system, external APIs (fetched at build)
- **Examples:** Sitemap, static page metadata
- **Update Frequency:** Per build (CI/CD)

---

## Conclusion

This data model provides a comprehensive, type-safe structure for all SEO-related data in the Best IT Consulting website. The TypeScript interfaces ensure consistency, the utility functions simplify implementation, and the validation rules maintain quality.

**Key Benefits:**
- ✅ Type-safe data structures
- ✅ Comprehensive schema coverage
- ✅ Reusable utility functions
- ✅ Clear validation rules
- ✅ Maintainable and scalable

---

**Document Status:** ✅ Complete  
**Next Steps:** Implement data structures in `lib/seo-utils.ts`  
**Review Date:** Post-implementation validation

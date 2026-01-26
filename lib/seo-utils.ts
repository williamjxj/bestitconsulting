import type { Metadata } from 'next';

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

/**
 * Default Open Graph image configuration
 */
export const DEFAULT_OG_IMAGE = {
  url: '/og-images/default.png',
  width: 1200,
  height: 630,
  alt: 'Best IT Consulting - Modern Web Solutions',
};

/**
 * Open Graph image mapping for major pages
 */
const OG_IMAGES: Record<string, string> = {
  '/': '/og-images/home.png',
  '/about': '/og-images/about.png',
  '/services': '/og-images/services.png',
  '/portfolio': '/og-images/portfolio.png',
  '/contact': '/og-images/contact.png',
  '/case-studies': '/og-images/case-studies.png',
  '/testimonials': '/og-images/testimonials.png',
};

/**
 * Get appropriate Open Graph image for a pathname
 *
 * @param pathname - URL pathname
 * @returns Path to Open Graph image (relative)
 */
export function getOGImage(pathname: string): string {
  return OG_IMAGES[pathname] || DEFAULT_OG_IMAGE.url;
}

/**
 * Build complete page metadata for Next.js
 *
 * @param title - Page title (will be appended with " | Best IT Consulting")
 * @param description - Meta description for the page
 * @param pathname - URL pathname for the page
 * @param options - Optional overrides for specific metadata fields
 * @returns Next.js Metadata object
 */
export function buildPageMetadata(
  title: string,
  description: string,
  pathname: string,
  options?: Partial<SEOMetadata>
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bestitconsulting.ca';
  const fullUrl = `${baseUrl}${pathname}`;
  const ogImage = getOGImage(pathname);

  return {
    title: `${title} | Best IT Consulting`,
    description,
    openGraph: {
      title: options?.openGraph?.title || title,
      description: options?.openGraph?.description || description,
      url: fullUrl,
      siteName: 'Best IT Consulting',
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${title} - Best IT Consulting`,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@bestitconsulting',
      creator: '@bestitconsulting',
      ...options?.twitter,
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'x-default': fullUrl,
        'en': fullUrl,
        // Future languages will be added here
        // 'fr': `${baseUrl}/fr${pathname}`,
        // 'es': `${baseUrl}/es${pathname}`,
        // 'zh': `${baseUrl}/zh${pathname}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
      ...options?.robots,
    },
    ...options,
  };
}

/**
 * Validate SEO metadata
 *
 * @param metadata - SEO metadata to validate
 * @returns Array of validation error messages (empty if valid)
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
      if (!img.url.startsWith('http') && !img.url.startsWith('/')) {
        errors.push(`OG image ${idx} URL must be absolute or root-relative`);
      }
    });
  }

  // Canonical URL validation
  if (metadata.canonical && !metadata.canonical.startsWith('http')) {
    errors.push('Canonical URL must be absolute');
  }

  return errors;
}

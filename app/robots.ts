import type { MetadataRoute } from 'next';

/**
 * Generate robots.txt with environment-aware rules
 *
 * Production: Allow all crawlers with specific exclusions
 * Staging/Preview: Block all crawlers
 *
 * @returns Robots configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bestitconsulting.ca';

  // Detect environment (Vercel or generic NODE_ENV)
  const isProduction =
    process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Block all crawling on staging/preview/development
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Production: Allow with specific exclusions
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/*', // API routes
        '/_next/static/*', // Next.js static files
        '/admin/*', // Admin pages (if any)
        '/private/*', // Private pages (if any)
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

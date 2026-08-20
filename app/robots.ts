import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo-utils';

/**
 * Generate robots.txt with environment-aware rules
 *
 * Production: Allow all crawlers (including AI engines) with specific exclusions
 * Staging/Preview: Block all crawlers
 *
 * @returns Robots configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

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
  const sharedDisallow = ['/api/*', '/admin/*', '/private/*'];
  const aiCrawlers = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'Bytespider',
    'cohere-ai',
    'Meta-ExternalAgent',
    'YouBot',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: sharedDisallow,
      },
      // AI crawlers are explicitly allowed so generative engines can
      // read and cite the site (GEO best practice).
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: sharedDisallow,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

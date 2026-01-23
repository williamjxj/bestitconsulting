/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://bestitconsulting.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/admin/*', '/api/*', '/_next/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/static/*', '/admin/*'],
      },
    ],
    additionalSitemaps: [
      'https://bestitconsulting.com/server-sitemap.xml', // For dynamic routes
    ],
  },
  // Transform function for dynamic route discovery
  transform: async (config, path) => {
    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // Additional paths for dynamic content (case studies, testimonials, etc.)
  additionalPaths: async (config) => {
    const result = [];

    // Add dynamic routes here as they are created
    // Example: Case studies, blog posts, testimonials
    // const caseStudies = await fetchCaseStudies();
    // caseStudies.forEach(study => {
    //   result.push({
    //     loc: `/case-studies/${study.slug}`,
    //     changefreq: 'weekly',
    //     priority: 0.7,
    //     lastmod: study.updatedAt,
    //   });
    // });

    return result;
  },
};

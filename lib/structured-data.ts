import type {
  Organization,
  WebSite,
  Service,
  Review,
  FAQPage,
  Question,
  SearchAction,
  WithContext,
  Thing,
} from 'schema-dts';

/**
 * Organization schema (site-wide)
 * Place in root layout for all pages
 */
export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Best IT Consulting',
  alternateName: 'Best IT',
  url: 'https://bestitconsulting.ca',
  logo: 'https://bestitconsulting.ca/logo.png',
  description:
    'Professional IT consulting and modern web solutions provider specializing in web development, cloud services, and digital transformation.',

  // Update with actual business information
  foundingDate: '2008',

  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
    addressRegion: 'BC',
    addressLocality: 'Vancouver',
    postalCode: 'V5K 0A1',
    streetAddress: '123 Main Street',
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

/**
 * WebSite schema (home page only)
 * Enables sitelinks search box in Google
 */
export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
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

/**
 * Service schema data interface
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

/**
 * Create Service schema for services page
 *
 * @param data - Service information
 * @returns Service schema object
 */
export function createServiceSchema(data: ServiceSchemaData): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    serviceType: data.serviceType,

    provider: {
      '@type': 'Organization',
      name: data.provider,
      url: 'https://bestitconsulting.ca',
    },

    areaServed: data.areaServed
      ? {
          '@type': 'Place',
          name: data.areaServed,
        }
      : undefined,

    offers: data.offers
      ? {
          '@type': 'Offer',
          price: data.offers.price,
          priceCurrency: data.offers.priceCurrency || 'CAD',
        }
      : undefined,
  };
}

/**
 * Review schema data interface
 */
export interface ReviewSchemaData {
  author: string;
  reviewBody: string;
  rating?: number; // 1-5
  datePublished?: string; // ISO 8601 date
}

/**
 * Create Review schema for testimonials
 *
 * @param data - Review information
 * @returns Review schema object
 */
export function createReviewSchema(data: ReviewSchemaData): WithContext<Review> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: data.author,
    },

    reviewBody: data.reviewBody,

    reviewRating: data.rating
      ? {
          '@type': 'Rating',
          ratingValue: data.rating,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,

    datePublished: data.datePublished,

    itemReviewed: {
      '@type': 'Organization',
      name: 'Best IT Consulting',
      sameAs: 'https://bestitconsulting.ca',
    },
  };
}

/**
 * FAQ item interface
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Create FAQPage schema from FAQ items
 *
 * @param faqs - Array of FAQ items
 * @returns FAQPage schema object
 */
export function createFAQPageSchema(faqs: FAQItem[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(
      (faq) =>
        ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        }) as Question
    ),
  };
}

/**
 * Generate JSON-LD script content for structured data
 *
 * @param data - Structured data object
 * @returns JSON string for script tag
 */
export function structuredDataScript(data: WithContext<Thing>): string {
  return JSON.stringify(data, null, 0); // No formatting for production
}

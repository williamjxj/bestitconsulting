import type {
  Organization,
  WebSite,
  Service,
  Review,
  FAQPage,
  Question,
  BreadcrumbList,
  ListItem,
  WithContext,
  Thing,
} from 'schema-dts';
import { getBaseUrl } from './seo-utils';

const baseUrl = getBaseUrl();

type OrganizationWithGeo = WithContext<Organization> & {
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
};

/**
 * Organization schema (site-wide)
 * Place in root layout for all pages
 */
export const organizationSchema: OrganizationWithGeo = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Best IT Consulting',
  alternateName: 'Best IT',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description:
    'Professional IT consulting and modern web solutions provider specializing in web development, cloud services, and digital transformation.',

  address: {
    '@type': 'PostalAddress',
    streetAddress: '10355 152 Street',
    addressCountry: 'CA',
    addressRegion: 'BC',
    addressLocality: 'Surrey',
    postalCode: 'V3R 7C3',
  },

  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.189201,
    longitude: -122.804169,
  },

  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+1-236-992-3846',
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
  url: baseUrl,
  description: 'Professional IT consulting and modern web solutions',

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
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Create BreadcrumbList schema from breadcrumb items
 *
 * @param items - Breadcrumb items (first should be the homepage)
 * @returns BreadcrumbList schema object
 */
export function createBreadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(
      (item, index) =>
        ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          item: item.href.startsWith('http')
            ? item.href
            : `${baseUrl}${item.href.startsWith('/') ? item.href : `/${item.href}`}`,
        }) as ListItem
    ),
  };
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

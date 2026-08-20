import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';
import {
  createBreadcrumbSchema,
  createServiceSchema,
  structuredDataScript,
} from '@/lib/structured-data';

export const metadata: Metadata = buildPageMetadata(
  'Web Development, Cloud & DevOps Services',
  'Comprehensive IT services including custom web development, cloud migration, DevOps consulting, and digital transformation. Modern solutions for growing businesses.',
  '/services'
);

// Service schemas for rich results in Google and AI engines
const services = [
  {
    name: 'Full-Stack Development Services',
    description:
      'End-to-end web and mobile application development using modern technologies and best practices.',
    serviceType: 'Web Development',
  },
  {
    name: 'Cloud Solutions',
    description:
      'Scalable cloud architecture, migration, and deployment solutions for modern applications.',
    serviceType: 'Cloud Services',
  },
  {
    name: 'IT Consulting',
    description:
      'Strategic technology guidance to help your business grow and optimize operations.',
    serviceType: 'IT Consulting',
  },
  {
    name: 'Team Augmentation',
    description:
      'Extend your team with skilled developers and consultants to accelerate your projects.',
    serviceType: 'Staff Augmentation',
  },
  {
    name: 'Enterprise Solutions',
    description:
      'Custom enterprise solutions designed to address complex business challenges.',
    serviceType: 'Enterprise Software',
  },
].map((service) =>
  createServiceSchema({
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: 'Best IT Consulting',
    areaServed: 'Canada',
  })
);

const breadcrumbSchema = createBreadcrumbSchema([
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
]);

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {services.map((service, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredDataScript(service),
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}

import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';
import { createServiceSchema, structuredDataScript } from '@/lib/structured-data';

export const metadata: Metadata = buildPageMetadata(
  'Our Services - Web Development, Cloud & DevOps',
  'Comprehensive IT services including custom web development, cloud migration, DevOps consulting, and digital transformation. Modern solutions for growing businesses.',
  '/services'
);

// Service schema for rich results in Google
const webDevService = createServiceSchema({
  name: 'Web Development Services',
  description: 'Custom web application development using modern frameworks like Next.js, React, and TypeScript. We build fast, scalable, and user-friendly web applications.',
  serviceType: 'Web Development',
  provider: 'Best IT Consulting',
  areaServed: 'Canada',
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(webDevService),
        }}
      />
      {children}
    </>
  );
}

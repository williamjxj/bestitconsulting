import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';
import {
  createBreadcrumbSchema,
  structuredDataScript,
} from '@/lib/structured-data';

export const metadata: Metadata = buildPageMetadata(
  'Our Portfolio & Successful Projects',
  'Explore our portfolio of successful web development projects, cloud migrations, and digital transformation initiatives. See how we help businesses grow with technology.',
  '/portfolio'
);

const breadcrumbSchema = createBreadcrumbSchema([
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
]);

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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

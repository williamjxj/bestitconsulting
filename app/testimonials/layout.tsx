import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';
import {
  createBreadcrumbSchema,
  structuredDataScript,
} from '@/lib/structured-data';

export const metadata: Metadata = buildPageMetadata(
  'Client Testimonials & Reviews',
  'Read testimonials from satisfied clients who transformed their businesses with Best IT Consulting. Real stories of success, growth, and digital transformation.',
  '/testimonials'
);

// Note: Review schema is intentionally not emitted until verifiable
// (attributable) client testimonials are available. Fabricated reviews
// violate Google's structured data guidelines.
const breadcrumbSchema = createBreadcrumbSchema([
  { label: 'Home', href: '/' },
  { label: 'Testimonials', href: '/testimonials' },
]);

export default function TestimonialsLayout({
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

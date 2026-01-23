import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';
import { createReviewSchema, structuredDataScript } from '@/lib/structured-data';

export const metadata: Metadata = buildPageMetadata(
  'Client Testimonials - What Our Clients Say',
  'Read testimonials from satisfied clients who transformed their businesses with Best IT Consulting. Real stories of success, growth, and digital transformation.',
  '/testimonials'
);

// Example review schemas - these should be populated with actual testimonials
const sampleReviews = [
  createReviewSchema({
    author: 'John Smith',
    reviewBody:
      'Best IT Consulting transformed our business with a modern web application. Their expertise in Next.js and cloud deployment was invaluable.',
    rating: 5,
    datePublished: '2025-12-15',
  }),
  // Add more reviews as they become available
];

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {sampleReviews.map((review, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredDataScript(review),
          }}
        />
      ))}
      {children}
    </>
  );
}

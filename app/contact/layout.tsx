import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'
import {
  createBreadcrumbSchema,
  structuredDataScript,
} from '@/lib/structured-data'

export const metadata: Metadata = buildPageMetadata(
  'Contact Us - Get Your Free Consultation',
  'Ready to transform your business? Contact Best IT Consulting for a free consultation. We respond within 24 hours to discuss your project needs and goals.',
  '/contact'
)

const breadcrumbSchema = createBreadcrumbSchema([
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
])

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(breadcrumbSchema),
        }}
      />
      {children}
    </>
  )
}

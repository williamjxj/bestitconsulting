import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'
import {
  createBreadcrumbSchema,
  structuredDataScript,
} from '@/lib/structured-data'

export const metadata: Metadata = buildPageMetadata(
  'Case Studies - Client Success Stories',
  'Read detailed case studies of how Best IT Consulting helped businesses achieve digital transformation, improve performance, and scale with modern web technologies.',
  '/case-studies'
)

const breadcrumbSchema = createBreadcrumbSchema([
  { label: 'Home', href: '/' },
  { label: 'Case Studies', href: '/case-studies' },
])

export default function CaseStudiesLayout({
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

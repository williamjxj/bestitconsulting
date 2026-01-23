import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = buildPageMetadata(
  'Case Studies - Client Success Stories',
  'Read detailed case studies of how Best IT Consulting helped businesses achieve digital transformation, improve performance, and scale with modern web technologies.',
  '/case-studies'
)

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

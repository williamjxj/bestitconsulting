import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = buildPageMetadata(
  'About Us - IT Consulting Experts',
  'Learn about Best IT Consulting, our team of expert developers, and our commitment to delivering modern web solutions and digital transformation services.',
  '/about'
)

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

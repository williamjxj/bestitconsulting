import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = buildPageMetadata(
  'Contact Us - Get Your Free Consultation',
  'Ready to transform your business? Contact Best IT Consulting for a free consultation. We respond within 24 hours to discuss your project needs and goals.',
  '/contact'
)

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

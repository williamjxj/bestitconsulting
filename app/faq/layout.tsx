import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'
import {
  createFAQPageSchema,
  structuredDataScript,
} from '@/lib/structured-data'

export const metadata: Metadata = buildPageMetadata(
  'FAQ - Frequently Asked Questions',
  'Find answers to common questions about our IT consulting services, web development process, pricing, timelines, and how we can help your business succeed.',
  '/faq'
)

// FAQ structured data for rich results
const faqItems = createFAQPageSchema([
  {
    question: 'What services does Best IT Consulting offer?',
    answer:
      'We offer comprehensive IT services including web development, cloud services, DevOps consulting, and digital transformation. We specialize in Next.js, React, TypeScript, and modern web technologies.',
  },
  {
    question: 'Do you work with small businesses?',
    answer:
      'Yes! We work with businesses of all sizes, from startups to enterprises. Our solutions are tailored to meet your specific needs and budget.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'We specialize in Next.js, React, TypeScript, Node.js, AWS, Vercel, and modern web technologies. We focus on building fast, scalable, and maintainable applications.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary based on scope and complexity. A typical website takes 4-8 weeks, while larger applications may take 3-6 months. We provide detailed timelines during the consultation phase.',
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer:
      'Yes, we offer ongoing support and maintenance packages to ensure your application remains secure, up-to-date, and performing optimally. We can discuss support options during your consultation.',
  },
])

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(faqItems),
        }}
      />
      {children}
    </>
  )
}

import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'
import {
  createBreadcrumbSchema,
  createFAQPageSchema,
  structuredDataScript,
} from '@/lib/structured-data'

export const metadata: Metadata = buildPageMetadata(
  'FAQ - Frequently Asked Questions',
  'Find answers to common questions about our IT consulting services, web development process, pricing, timelines, and how we can help your business succeed.',
  '/faq'
)

// FAQ structured data for rich results.
// Answers mirror the content rendered on the FAQ page.
const faqItems = createFAQPageSchema([
  {
    question: 'What is your typical project timeline?',
    answer:
      'Depends on the project requirements and details.',
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer:
      'Yes, we provide comprehensive support packages including 24/7 monitoring, regular updates, and technical assistance to ensure your solution runs smoothly.',
  },
  {
    question: 'Can you work with our existing technology stack?',
    answer:
      'Absolutely! We specialize in integrating with existing systems and can work with virtually any technology stack to enhance your current infrastructure.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We serve clients across healthcare, finance, retail, manufacturing, transportation, education, and technology sectors, adapting our solutions to industry-specific requirements.',
  },
  {
    question: 'How do you structure your pricing?',
    answer:
      'We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Pricing is based on project scope, complexity, and timeline requirements.',
  },
  {
    question: 'Is the initial consultation really free?',
    answer:
      'Yes! We offer a completely free 30-minute consultation to discuss your project requirements, provide initial recommendations, and answer any questions you may have.',
  },
  {
    question: 'How do you ensure data security and privacy?',
    answer:
      'We implement industry-standard security measures including encryption, secure data transmission, regular security audits, and compliance with GDPR and other privacy regulations.',
  },
  {
    question: 'What is the size and expertise of your team?',
    answer:
      'Our team consists of 50+ certified professionals including software engineers, cloud architects, data scientists, UI/UX designers, and project managers with expertise across multiple technologies.',
  },
  {
    question: 'How do you handle project communication and updates?',
    answer:
      "We maintain regular communication through scheduled meetings, progress reports, and real-time collaboration tools. You'll have a dedicated project manager as your primary point of contact.",
  },
  {
    question: 'Can your solutions scale with our business growth?',
    answer:
      'Absolutely! We design scalable solutions that can grow with your business. Our cloud-based architectures and modular designs ensure your systems can handle increased load and functionality.',
  },
])

const breadcrumbSchema = createBreadcrumbSchema([
  { label: 'Home', href: '/' },
  { label: 'FAQ', href: '/faq' },
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

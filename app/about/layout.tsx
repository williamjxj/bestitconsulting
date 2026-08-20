import type { Metadata } from 'next'
import type { Person, WithContext } from 'schema-dts'
import { buildPageMetadata } from '@/lib/seo-utils'
import {
  createBreadcrumbSchema,
  structuredDataScript,
} from '@/lib/structured-data'
import { getBaseUrl } from '@/lib/seo-utils'

export const metadata: Metadata = buildPageMetadata(
  'About Us - IT Consulting Experts',
  'Learn about Best IT Consulting, our team of expert developers, and our commitment to delivering modern web solutions and digital transformation services.',
  '/about'
)

const baseUrl = getBaseUrl()

const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'William Jiang',
  jobTitle: 'Founder & Lead Developer',
  description:
    'Full-stack developer with 20+ years of experience building scalable web applications and digital solutions.',
  worksFor: {
    '@type': 'Organization',
    name: 'Best IT Consulting',
    url: baseUrl,
  },
  knowsAbout: [
    'Web Development',
    'Cloud Solutions',
    'Digital Transformation',
    'AI Consulting',
    'Software Architecture',
  ],
} satisfies WithContext<Person>

const breadcrumbSchema = createBreadcrumbSchema([
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
])

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(founderSchema),
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

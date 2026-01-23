import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
import { MarqueeStyles } from '@/components/ui/MarqueeStyles'
import { organizationSchema, structuredDataScript } from '@/lib/structured-data'
// import { AnimationPerformanceProvider } from '@/lib/animations/performance'
// import { AnimationAccessibilityProvider } from '@/lib/animations/accessibility'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://bestitconsulting.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Best IT Consulting - Modern Web Solutions & IT Services',
    template: '%s | Best IT Consulting',
  },
  description:
    'Professional IT consulting, web development, and digital transformation services. Transform your business with modern technology and expert guidance.',
  keywords: [
    'IT consulting',
    'web development',
    'digital transformation',
    'cloud services',
    'modern web solutions',
    'Next.js development',
    'React development',
    'TypeScript',
  ],
  authors: [{ name: 'Best IT Consulting' }],
  creator: 'Best IT Consulting',
  publisher: 'Best IT Consulting',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Best IT Consulting',
    title: 'Best IT Consulting - Modern Web Solutions',
    description:
      'Professional IT consulting and web development services for modern businesses.',
    images: [
      {
        url: `${baseUrl}/og-images/default.png`,
        width: 1200,
        height: 630,
        alt: 'Best IT Consulting - Modern Web Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bestitconsulting',
    creator: '@bestitconsulting',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: baseUrl,
    languages: {
      'x-default': baseUrl,
      en: baseUrl,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Organization structured data (site-wide) */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: structuredDataScript(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <I18nProvider>
          <MarqueeStyles />
          {/* <AnimationAccessibilityProvider>
            <AnimationPerformanceProvider> */}
          {children}
          {/* </AnimationPerformanceProvider>
          </AnimationAccessibilityProvider> */}
        </I18nProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
import { MarqueeStyles } from '@/components/ui/MarqueeStyles'
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

export const metadata: Metadata = {
  title: 'Best IT Consulting',
  description:
    'We provide top-notch IT consulting services to help your business thrive.',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
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

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
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

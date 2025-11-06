import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BestIT Consulting - Modern IT Solutions & Digital Transformation',
  description:
    'Transform your business with our expert IT consulting services. We deliver modern, scalable solutions that drive growth and innovation.',
  keywords:
    'IT consulting, digital transformation, cloud solutions, software development, cybersecurity',
  authors: [{ name: 'BestIT Consulting' }],
  openGraph: {
    title: 'BestIT Consulting - Modern IT Solutions',
    description:
      'Transform your business with our expert IT consulting services.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BestIT Consulting - Modern IT Solutions',
    description:
      'Transform your business with our expert IT consulting services.',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={inter.variable}>
      <body
        className='font-sans antialiased bg-background text-foreground'
        suppressHydrationWarning={true}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}

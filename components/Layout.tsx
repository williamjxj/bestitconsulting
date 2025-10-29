'use client'

import Header from './Header'
import { Footer } from './layout/Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

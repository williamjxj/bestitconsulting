'use client'

import { Header } from './layout/Header'
import { Footer } from './layout/Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='pt-16'>{children}</main>
      <Footer />
    </div>
  )
}

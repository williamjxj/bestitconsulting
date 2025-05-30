'use client'

import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

type Language = 'en' | 'fr' | 'es' | 'cn'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [currentLang, setCurrentLang] = useState<Language>('en')

  return (
    <div className='min-h-screen bg-white'>
      <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />
      <main className='pt-16'>{children}</main>
      <Footer />
    </div>
  )
}

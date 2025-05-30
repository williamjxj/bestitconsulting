'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useNavTranslation } from '@/lib/i18n/hooks'
import { LanguageSelector } from './LanguageSelector'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useNavTranslation()

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/services' },
    { key: 'about', href: '/about' },
    { key: 'portfolio', href: '/portfolio' },
    { key: 'testimonials', href: '/testimonials' },
    { key: 'contact', href: '/contact' },
  ]

  return (
    <nav className='fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Link href='/'>
                <h1 className='text-2xl font-bold text-blue-600'>BestIT</h1>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {navItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  {t(key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className='hidden md:flex items-center space-x-2'>
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-gray-700 hover:text-blue-600'
            >
              {mobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t'>
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
            <div className='flex space-x-2 px-3 py-2'>
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { useNavTranslation } from '@/lib/i18n/hooks'
import { LanguageSelector } from './LanguageSelector'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useNavTranslation()
  const pathname = usePathname()

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/services' },
    { key: 'about', href: '/about' },
    { key: 'our-work', href: '/our-work' },
    { key: 'portfolio', href: '/portfolio' },
    { key: 'testimonials', href: '/testimonials' },
    { key: 'contact', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-14 sm:h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Link
                href='/'
                className='group flex items-center'
                title='BestIT Consulting - Technology Solutions'
              >
                <div className='h-12 sm:h-14 md:h-16 w-auto relative group-hover:scale-105 transition-all duration-300'>
                  <img
                    src='/bitc-logo.svg'
                    alt='BestIT Consulting - Technology Solutions'
                    className='h-full w-auto object-contain'
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-1'>
              {navItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {t(key)}
                  {isActive(href) && (
                    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full'></div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector & CTA */}
          <div className='hidden md:flex items-center space-x-3'>
            <LanguageSelector showNativeName={true} />
            <Link
              href='/contact'
              className='group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden whitespace-nowrap'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <div className='relative flex items-center gap-1.5'>
                <Sparkles className='w-4 h-4 group-hover:rotate-12 transition-transform duration-300' />
                <span>Get Started</span>
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-1 sm:space-x-2'>
            <LanguageSelector showNativeName={true} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-gray-700 hover:text-blue-600 p-1 sm:p-2'
            >
              {mobileMenuOpen ? (
                <X className='h-5 w-5 sm:h-6 sm:w-6' />
              ) : (
                <Menu className='h-5 w-5 sm:h-6 sm:w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 shadow-lg'>
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href='/contact'
              className='group relative block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-2 rounded-md font-medium mt-4 overflow-hidden whitespace-nowrap'
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <div className='relative flex items-center justify-center gap-1.5'>
                <Sparkles className='w-4 h-4 group-hover:rotate-12 transition-transform duration-300' />
                <span>Get Started</span>
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
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
    { key: 'case-studies', href: '/case-studies' },
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

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])

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
          {/* Logo - Left Side */}
          <div className='flex items-center flex-shrink-0'>
            <Link
              href='/'
              className='group flex items-center'
              title='BestIT Consulting - Technology Solutions'
            >
              <Image
                src='/logo.png'
                alt='BestIT Consulting Logo'
                width={160}
                height={40}
                className='h-10 sm:h-12 w-auto transition-opacity duration-300 group-hover:opacity-90'
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center - Hidden on mobile */}
          <div className='hidden lg:flex flex-1 justify-center'>
            <div className='flex items-center space-x-0.5'>
              {navItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
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

          {/* Desktop Right Side - Language Selector */}
          <div className='hidden lg:flex items-center space-x-3 flex-shrink-0'>
            <LanguageSelector showNativeName={true} />
          </div>

          {/* Mobile Right Side - Menu Button */}
          <div className='lg:hidden flex items-center space-x-2 flex-shrink-0 z-50'>
            <LanguageSelector showNativeName={false} />
            <button
              type='button'
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className='h-6 w-6' strokeWidth={2} />
              ) : (
                <Menu className='h-6 w-6' strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with smooth animation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen
            ? 'max-h-[800px] opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className='py-4 border-t border-gray-200 bg-white'>
          <div className='flex flex-col space-y-3'>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:translate-x-2 ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {t(item.key)}
                {!isActive(item.href) && (
                  <span className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300'></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

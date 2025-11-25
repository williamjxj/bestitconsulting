'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Home,
  Briefcase,
  Info,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Mail,
} from 'lucide-react'
import { useNavTranslation } from '@/lib/i18n/hooks'
import { LanguageSelector } from './LanguageSelector'
import { brandClasses } from '@/lib/branding'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useNavTranslation()
  const pathname = usePathname()

  const navItems = [
    { key: 'home', href: '/', icon: Home },
    { key: 'services', href: '/services', icon: Briefcase },
    { key: 'about', href: '/about', icon: Info },
    { key: 'case-studies', href: '/case-studies', icon: FileText },
    { key: 'portfolio', href: '/portfolio', icon: ImageIcon },
    { key: 'testimonials', href: '/testimonials', icon: MessageSquare },
    { key: 'contact', href: '/contact', icon: Mail },
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
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className='w-full max-w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 lg:px-8 box-border'>
        <div className='flex items-center justify-between h-14 sm:h-16 gap-2 min-w-0 w-full'>
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
                className='h-8 w-auto max-w-[75px] sm:max-w-[100px] transition-opacity duration-300 group-hover:opacity-90 lg:h-10 lg:max-w-none'
                priority
              />
            </Link>
          </div>

          {/* Mobile: Hamburger Menu, Language Selector, and Sister Site Link - Right side */}
          <div className='lg:hidden flex items-center space-x-1.5 flex-shrink-0 z-50'>
            <LanguageSelector showNativeName={true} iconOnly={true} />
            <a
              href='https://www.bestitconsultants.ca'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center transition-opacity duration-300 hover:opacity-80'
              title='Visit BestIT Consultants - Sister Website'
            >
              <Image
                src='/b22-logo.png'
                alt='BestIT Consultants Logo'
                width={36}
                height={36}
                className='h-9 w-9'
              />
            </a>
            <div className='relative flex-shrink-0'>
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

              {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <>
                  <div
                    className='fixed inset-0 z-40 lg:hidden'
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px] lg:hidden'>
                    <div className='py-2'>
                      {navItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`relative py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                              isActive(item.href)
                                ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <Icon
                              className={`h-5 w-5 flex-shrink-0 ${
                                isActive(item.href)
                                  ? 'text-white'
                                  : 'text-gray-500'
                              }`}
                              strokeWidth={2}
                            />
                            {t(item.key)}
                            {!isActive(item.href) && (
                              <span className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300'></span>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation - Center */}
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

          {/* Desktop Language Selector and Sister Site Link - Right Side */}
          <div className='hidden lg:flex items-center space-x-3 flex-shrink-0'>
            <LanguageSelector showNativeName={true} />
            <a
              href='https://www.bestitconsultants.ca'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center transition-opacity duration-300 hover:opacity-80'
              title='Visit BestIT Consultants - Sister Website'
            >
              <Image
                src='/b22-logo.png'
                alt='BestIT Consultants Logo'
                width={40}
                height={40}
                className='h-10 w-10'
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

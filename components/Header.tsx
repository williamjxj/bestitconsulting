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
          : 'bg-white/90 backdrop-blur-sm border-b border-transparent'
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
                id='mobile-menu-toggle'
                aria-controls='mobile-menu'
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
                  <div
                    id='mobile-menu'
                    className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[calc(100vw-2rem)] max-w-sm bg-white border border-gray-200/80 rounded-2xl shadow-2xl shadow-gray-900/10 z-50 lg:hidden overflow-hidden'
                  >
                    <div className='py-3'>
                      {navItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`relative mx-3 my-0.5 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                              isActive(item.href)
                                ? 'text-blue-700 bg-blue-50 border border-blue-100'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <Icon
                              className={`h-5 w-5 flex-shrink-0 transition-colors ${
                                isActive(item.href)
                                  ? 'text-blue-600'
                                  : 'text-gray-400 group-hover:text-blue-500'
                              }`}
                              strokeWidth={2}
                            />
                            {t(item.key)}
                            {isActive(item.href) && (
                              <span className='ml-auto h-1.5 w-1.5 rounded-full bg-blue-600' />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                    <div className='border-t border-gray-100 p-3 bg-gray-50/60'>
                      <Link
                        href='/contact?title=Get%20Free%20Consultation#contact-form'
                        onClick={() => setMobileMenuOpen(false)}
                        className='flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:brightness-110'
                      >
                        <MessageSquare className='h-4 w-4' />
                        Get Free Consultation
                      </Link>
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
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
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

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Box,
  FlaskConical,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { useNavTranslation } from '@/lib/i18n/hooks'
import { LanguageSelector } from './LanguageSelector'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useNavTranslation()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/services' },
    { key: 'about', href: '/about' },
    { key: 'our-work', href: '/our-work' },
    { key: 'portfolio', href: '/portfolio' },
    { key: 'testimonials', href: '/testimonials' },
    { key: 'contact', href: '/contact' },
  ]

  const dropdownItems = [
    {
      key: '3d-effects',
      href: '/3d-effects',
      label: '3D Effects',
      icon: Box,
      description: 'WebGL & Three.js demos',
    },
    {
      key: 'r2-test',
      href: '/r2-test',
      label: 'R2 Test',
      icon: FlaskConical,
      description: 'Asset management testing',
    },
    {
      key: 'admin',
      href: '/admin',
      label: 'Admin',
      icon: Settings,
      description: 'Language management',
    },
    {
      key: 'faq',
      href: '/faq',
      label: 'FAQ',
      icon: HelpCircle,
      description: 'Frequently asked questions',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

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
          <div className='hidden lg:block'>
            <div className='ml-10 flex items-center space-x-0.5'>
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

          {/* Language Selector & CTA */}
          <div className='hidden lg:flex items-center space-x-3'>
            {/* Dropdown Menu - Only in Development */}
            {process.env.NODE_ENV === 'development' && (
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-300'
                >
                  <span>Tools</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Content */}
                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50'>
                    {dropdownItems.map(item => {
                      const IconComponent = item.icon
                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 group'
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className='flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200'>
                            <IconComponent className='w-4 h-4 text-blue-600' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200'>
                              {item.label}
                            </div>
                            <div className='text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-200'>
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

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
          <div className='lg:hidden flex items-center space-x-1 sm:space-x-2'>
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
        <div className='lg:hidden'>
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

            {/* Mobile Dropdown Items - Only in Development */}
            {process.env.NODE_ENV === 'development' && (
              <div className='border-t border-gray-200 pt-2 mt-2'>
                <div className='px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Tools
                </div>
                {dropdownItems.map(item => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className='flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className='flex-shrink-0 w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center'>
                        <IconComponent className='w-4 h-4 text-blue-600' />
                      </div>
                      <div>
                        <div className='font-medium'>{item.label}</div>
                        <div className='text-xs text-gray-500'>
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

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

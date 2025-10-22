'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavTranslation } from '@/lib/i18n/hooks'
import { LanguageSelector } from './LanguageSelector'
import { AnimatedButton } from './AnimatedButton'
import { useResponsive } from '@/lib/breakpoints'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, isLoading: i18nLoading } = useNavTranslation()
  const pathname = usePathname()
  const { isMobile, isTablet } = useResponsive()

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
    setMounted(true)
  }, [])

  // Wait for component mount, i18n, and responsive to be ready
  const isReady = true // Temporarily disable conditional rendering

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
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Link href='/' className='group flex items-center space-x-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300'>
                  <Zap className='h-5 w-5 text-white' />
                </div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
                  BestIT
                </h1>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-1'>
              {navItems.map(({ key, href }, index) => (
                <div key={key}>
                  <Link
                    href={href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive(href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {t(key)}
                    {isActive(href) && (
                      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full' />
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Language Selector & CTA */}
          <div className='hidden md:flex items-center space-x-4'>
            <LanguageSelector />
            <AnimatedButton
              variant='primary'
              size='md'
              hover={{ scale: 1.05 }}
              className='bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300'
              onClick={() => (window.location.href = '/contact')}
            >
              Get Started
            </AnimatedButton>
          </div>

          {/* Mobile menu button */}
          <div className='flex items-center space-x-2'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-gray-700 hover:text-blue-600 p-2 touch-manipulation'
              tabIndex={0}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='md:hidden overflow-hidden'
            >
              <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 shadow-lg'>
                {navItems.map(({ key, href }, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      className={`block px-3 py-3 rounded-md text-base font-medium transition-colors touch-manipulation ${
                        isActive(href)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(key)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.2 }}
                  className='mt-4'
                >
                  <AnimatedButton
                    variant='primary'
                    size='lg'
                    hover={{ scale: 1.02 }}
                    className='w-full text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-3 rounded-md font-medium'
                    onClick={() => {
                      setMobileMenuOpen(false)
                      window.location.href = '/contact'
                    }}
                  >
                    Get Started
                  </AnimatedButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </nav>
  )
}

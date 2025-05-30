'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const languages = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      portfolio: 'Portfolio',
      testimonials: 'Testimonials',
      contact: 'Contact',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      about: 'À propos',
      portfolio: 'Portfolio',
      testimonials: 'Témoignages',
      contact: 'Contact',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      about: 'Acerca de',
      portfolio: 'Portafolio',
      testimonials: 'Testimonios',
      contact: 'Contacto',
    },
  },
  cn: {
    nav: {
      home: '首页',
      services: '服务',
      about: '关于我们',
      portfolio: '项目案例',
      testimonials: '客户评价',
      contact: '联系我们',
    },
  },
}

interface HeaderProps {
  currentLang: keyof typeof languages
  setCurrentLang: (lang: keyof typeof languages) => void
}

export default function Header({ currentLang, setCurrentLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = languages[currentLang]

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
                  {t.nav[key as keyof typeof t.nav]}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className='hidden md:flex items-center space-x-2'>
            {Object.keys(languages).map(lang => (
              <button
                key={lang}
                onClick={() => setCurrentLang(lang as keyof typeof languages)}
                className={`px-2 py-1 text-xs rounded ${
                  currentLang === lang
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
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
                {t.nav[key as keyof typeof t.nav]}
              </Link>
            ))}
            <div className='flex space-x-2 px-3 py-2'>
              {Object.keys(languages).map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang as keyof typeof languages)
                    setMobileMenuOpen(false)
                  }}
                  className={`px-2 py-1 text-xs rounded ${
                    currentLang === lang
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

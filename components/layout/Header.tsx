'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import {
  Menu,
  X,
  Code2,
  ChevronDown,
  ArrowRight,
  Globe,
  Users,
  Briefcase,
  MessageSquare,
  FileText,
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Globe },
  { name: 'Services', href: '/services', icon: Code2 },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Testimonials', href: '/testimonials', icon: MessageSquare },
  { name: 'Contact', href: '/contact', icon: FileText },
]

const services = [
  { name: 'Web Development', href: '/services#web-development' },
  { name: 'Mobile Apps', href: '/services#mobile-apps' },
  { name: 'Cloud Solutions', href: '/services#cloud-solutions' },
  { name: 'AI & ML', href: '/services#ai-ml' },
  { name: 'DevOps', href: '/services#devops' },
  { name: 'Consulting', href: '/services#consulting' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={brandClasses.container}>
        <div className='flex items-center justify-between h-16 lg:h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2 group'>
            <motion.div
              className='relative'
              whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
              transition={{ duration: 0.2 }}
            >
              <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'>
                <Code2 className='h-6 w-6 text-white' />
              </div>
              {shouldAnimate && (
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg opacity-0 group-hover:opacity-100'
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
            <div className='flex flex-col'>
              <span
                className={`font-bold text-lg ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                BestIT
              </span>
              <span
                className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}
              >
                Consulting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center space-x-8'>
            {navigation.map(item => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className='h-4 w-4' />
                  <span className='font-medium'>{item.name}</span>
                  {isActive && (
                    <motion.div
                      className='absolute inset-0 bg-blue-50 rounded-lg'
                      layoutId='activeTab'
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <div className='hidden lg:flex items-center space-x-4'>
            <Button
              variant='outline'
              size='sm'
              className={`${
                isScrolled
                  ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-blue-600'
              }`}
            >
              Get Quote
            </Button>
            <Button
              size='sm'
              className='bg-blue-600 hover:bg-blue-700 text-white'
            >
              Start Project
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='lg:hidden bg-white border-t border-gray-200'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='px-4 py-6 space-y-4'>
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className='h-5 w-5' />
                      <span className='font-medium'>{item.name}</span>
                    </Link>
                  </motion.div>
                )
              })}

              <div className='pt-4 border-t border-gray-200 space-y-3'>
                <Button
                  variant='outline'
                  className='w-full justify-center'
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote
                </Button>
                <Button
                  className='w-full justify-center bg-blue-600 hover:bg-blue-700 text-white'
                  onClick={() => setIsOpen(false)}
                >
                  Start Project
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

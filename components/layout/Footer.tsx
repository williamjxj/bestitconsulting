'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  CheckCircle,
  Shield,
  Award,
  Users,
  Smartphone,
  Presentation,
} from 'lucide-react'
import { QRCodeCompact } from '@/components/ui/qr-code'
import { FAQDialogCompact } from '@/components/ui/faq-dialog'

// Pages that exist and should navigate normally
const existingPages = [
  '/about',
  '/about#team',
  '/services',
  '/portfolio',
  '/case-studies',
  '/faq',
]

// Pages that should redirect to contact form with CTA title
const redirectToContactPages = ['/careers', '/blog', '/docs', '/support']

// Legal pages that should show tooltip (don't exist)
const legalPages = ['/privacy', '/terms', '/cookies', '/gdpr']

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '/careers', redirectToContact: true },
    { name: 'FAQ', href: '/faq' },
  ],
  services: [
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'Cloud Solutions', href: '/services#cloud-solutions' },
    { name: 'AI Consulting', href: '/services#ai-consulting' },
    { name: 'Mobile Apps', href: '/services#mobile-apps' },
    {
      name: 'Enterprise Software Upgrade',
      href: '/services#enterprise-software-upgrade',
    },
    { name: 'Software Outsourcing', href: '/services#software-outsourcing' },
    { name: 'DevOps', href: '/services#devops' },
  ],
  resources: [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog', redirectToContact: true },
    { name: 'Documentation', href: '/docs', redirectToContact: true },
    { name: 'Support', href: '/support', redirectToContact: true },
    {
      name: 'Presentation',
      href: 'https://gamma.app/docs/Best-IT-Consulting-gwcl04w56hlfimh',
      icon: Presentation,
      isExternal: true,
    },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy', showTooltip: true },
    { name: 'Terms of Service', href: '/terms', showTooltip: true },
    { name: 'Cookie Policy', href: '/cookies', showTooltip: true },
    { name: 'GDPR', href: '/gdpr', showTooltip: true },
  ],
}

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'GitHub', href: '#', icon: Github },
]

const faqs = [
  {
    id: 'timeline',
    question: 'What is your typical project timeline?',
    answer: 'Depends on the project requirements and details.',
  },
  {
    id: 'support',
    question: 'Do you offer ongoing support and maintenance?',
    answer:
      'Yes, we provide comprehensive support packages including 24/7 monitoring, regular updates, and technical assistance to ensure your solution runs smoothly.',
  },
  {
    id: 'technology',
    question: 'Can you work with our existing technology stack?',
    answer:
      'Absolutely! We specialize in integrating with existing systems and can work with virtually any technology stack to enhance your current infrastructure.',
  },
  {
    id: 'industries',
    question: 'What industries do you serve?',
    answer:
      'We serve clients across healthcare, finance, retail, manufacturing, transportation, education, and technology sectors, adapting our solutions to industry-specific requirements.',
  },
  {
    id: 'pricing',
    question: 'How do you structure your pricing?',
    answer:
      'We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Pricing is based on project scope, complexity, and timeline requirements.',
  },
  {
    id: 'consultation',
    question: 'Is the initial consultation really free?',
    answer:
      'Yes! We offer a completely free 30-minute consultation to discuss your project requirements, provide initial recommendations, and answer any questions you may have.',
  },
]

export function Footer() {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'
  const router = useRouter()
  const [tooltip, setTooltip] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: any
  ) => {
    // External links (like Presentation) should open in new tab - don't prevent default
    if (link.isExternal) {
      return
    }

    // Links that should redirect to contact form
    if (link.redirectToContact) {
      e.preventDefault()
      const title = encodeURIComponent(link.name)
      router.push(`/contact?title=${title}#contact-form`)
      return
    }

    // Legal links that should show tooltip
    if (link.showTooltip) {
      e.preventDefault()
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setTooltip({
        text: 'Coming soon',
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      })
      setTimeout(() => setTooltip(null), 2000)
      return
    }

    // Normal navigation for existing pages (no prevent default)
  }

  return (
    <footer className='bg-gray-900 text-white'>
      {/* Main Footer Content */}
      <div className={brandClasses.container}>
        <div className='py-16 lg:py-20'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6'>
            {/* Company Info */}
            <motion.div
              className='sm:col-span-2 md:col-span-1'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href='/' className='flex items-center mb-6 group'>
                <motion.div
                  whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src='/logo.png'
                    alt='BestIT Consulting Logo'
                    width={160}
                    height={40}
                    className='h-10 w-auto transition-opacity duration-300 group-hover:opacity-90'
                  />
                </motion.div>
              </Link>

              {/* Contact Info */}
              <div className='space-y-3 mb-6'>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <Mail className='h-4 w-4 text-blue-400' />
                  <span className='text-sm'>service@bestitconsulting.ca</span>
                </div>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <Phone className='h-4 w-4 text-blue-400' />
                  <span className='text-sm'>+1 (236) 992-3846</span>
                </div>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <MapPin className='h-4 w-4 text-blue-400' />
                  <span className='text-sm'>Great Vancouver, Canada 🇨🇦</span>
                </div>
              </div>

              {/* Social Links */}
              <div className='flex space-x-4'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    tabIndex={0}
                    className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors duration-200'
                    whileHover={
                      shouldAnimate ? { scale: 1.1, y: -2 } : undefined
                    }
                    whileTap={shouldAnimate ? { scale: 0.95 } : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className='h-5 w-5' />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(
              ([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  className='lg:col-span-1'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className='font-semibold text-white mb-4 capitalize'>
                    {category}
                  </h3>
                  <ul className='space-y-3'>
                    {links.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {link.name === 'FAQ' ? (
                          <FAQDialogCompact
                            faqs={faqs}
                            triggerText={link.name}
                            className='text-gray-300 hover:text-white transition-colors duration-200 p-0 h-auto font-normal justify-start'
                          />
                        ) : (link as any).isExternal ? (
                          <a
                            href={(link as any).href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-gray-300 hover:text-white transition-colors duration-200 flex items-center group cursor-pointer'
                          >
                            {(link as any).icon &&
                              (() => {
                                const IconComponent = (link as any).icon
                                return (
                                  <IconComponent className='mr-2 h-4 w-4' />
                                )
                              })()}
                            <span>{link.name}</span>
                            <ArrowRight className='ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                          </a>
                        ) : (
                          <a
                            href={link.href}
                            onClick={e => handleLinkClick(e, link)}
                            className='text-gray-300 hover:text-white transition-colors duration-200 flex items-center group cursor-pointer'
                          >
                            <span>{link.name}</span>
                            <ArrowRight className='ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                          </a>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}

            {/* Mobile Access Section */}
            <motion.div
              className='lg:col-span-1'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className='font-semibold text-white mb-4 flex items-center gap-2'>
                <Smartphone className='h-4 w-4 text-blue-400' />
                Mobile Access
              </h3>
              <div className='flex flex-col items-center space-y-3'>
                <QRCodeCompact
                  url='https://bestitconsulting.vercel.app'
                  size={80}
                />
                <p className='text-gray-300 text-xs text-center'>
                  Scan to visit our website
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className='pt-4 pb-6 border-t border-gray-800 flex flex-col lg:flex-row items-center justify-between'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className='text-gray-400 text-sm mb-4 lg:mb-0'>
            © 2025 Best IT Consulting. All rights reserved.
          </div>
          <div className='flex items-center space-x-6 text-sm text-gray-400'>
            <a
              href='/privacy'
              onClick={e => {
                e.preventDefault()
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect()
                setTooltip({
                  text: 'Coming soon',
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                })
                setTimeout(() => setTooltip(null), 2000)
              }}
              className='hover:text-white transition-colors cursor-pointer'
            >
              Privacy Policy
            </a>
            <a
              href='/terms'
              onClick={e => {
                e.preventDefault()
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect()
                setTooltip({
                  text: 'Coming soon',
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                })
                setTimeout(() => setTooltip(null), 2000)
              }}
              className='hover:text-white transition-colors cursor-pointer'
            >
              Terms of Service
            </a>
            <a
              href='/cookies'
              onClick={e => {
                e.preventDefault()
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect()
                setTooltip({
                  text: 'Coming soon',
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                })
                setTimeout(() => setTooltip(null), 2000)
              }}
              className='hover:text-white transition-colors cursor-pointer'
            >
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          className='fixed z-50 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg pointer-events-none'
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateX(-50%) translateY(-100%)',
          }}
          initial={{ opacity: 0, y: tooltip.y + 5 }}
          animate={{ opacity: 1, y: tooltip.y }}
          exit={{ opacity: 0, y: tooltip.y + 5 }}
          transition={{ duration: 0.2 }}
        >
          {tooltip.text}
          <div
            className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800'
            style={{ marginTop: '-1px' }}
          />
        </motion.div>
      )}
    </footer>
  )
}

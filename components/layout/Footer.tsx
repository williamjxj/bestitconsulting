'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  Video,
  FileText,
  Image as ImageIcon,
  Music,
} from 'lucide-react'
import { QRCodeCompact } from '@/components/ui/qr-code'
import { FAQDialogCompact } from '@/components/ui/faq-dialog'
import { getR2AssetUrl } from '@/lib/r2-utils'

// Helper function to get icon for file extension
function getFileIcon(filename: string) {
  const ext = filename.toLowerCase().split('.').pop()
  switch (ext) {
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'mkv':
    case 'webm':
      return Video
    case 'm4a':
    case 'mp3':
    case 'wav':
    case 'ogg':
      return Music
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
      return FileText
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
    case 'svg':
      return ImageIcon
    default:
      return FileText
  }
}

// Helper function to get display name from filename
function getDisplayName(filename: string): string {
  // Remove 'resources/' prefix if present
  let name = filename.replace(/^resources\//, '')
  // Remove file extension
  name = name.replace(/\.[^/.]+$/, '')
  // Replace hyphens/underscores with spaces and capitalize
  name = name.replace(/[-_]/g, ' ')
  // Capitalize first letter of each word
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Pages that exist and should navigate normally
const existingPages = [
  '/about',
  '/about#values',
  '/about#how-we-work',
  '/services',
  '/portfolio',
  '/case-studies',
  '/testimonials',
  '/faq',
]

// Pages that should redirect to contact form with CTA title
const redirectToContactPages = ['/support']

// Legal pages that should show tooltip (don't exist)
const legalPages = ['/privacy', '/terms', '/cookies', '/gdpr']

const footerLinks = {
  sitemap: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'AI Consulting', href: '/services#ai-consulting' },
    { name: 'Software Outsourcing', href: '/services#software-outsourcing' },
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'Cloud Solutions', href: '/services#cloud-solutions' },
    { name: 'Mobile Apps', href: '/services#mobile-apps' },
    { name: 'DevOps', href: '/services#devops' },
    { name: 'FAQ', href: '/faq', isLarge: true },
  ],
  resources: [], // Will be populated from R2 bucket
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

interface R2Resource {
  filename: string
  url: string
  icon: any
  displayName: string
}

export function Footer() {
  const reducedMotion = useReducedMotion()
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  )
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const router = useRouter()
  const [tooltip, setTooltip] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)
  const [r2Resources, setR2Resources] = useState<R2Resource[]>([])
  const [resourcesLoading, setResourcesLoading] = useState(true)

  // Only compute device type and animation preference on client after hydration
  useEffect(() => {
    const currentDeviceType = getDeviceType()
    setDeviceType(currentDeviceType)
    setShouldAnimate(!reducedMotion && currentDeviceType !== 'mobile')
  }, [reducedMotion])

  // Fetch R2 resources folder items
  useEffect(() => {
    const fetchR2Resources = async () => {
      try {
        const response = await fetch('/api/r2-assets')
        const data = await response.json()

        if (data.assets && Array.isArray(data.assets)) {
          // Filter for resources folder items
          const resources = data.assets
            .filter((asset: any) => asset.filename.startsWith('resources/'))
            .map((asset: any) => ({
              filename: asset.filename,
              url: asset.url,
              icon: getFileIcon(asset.filename),
              displayName: getDisplayName(asset.filename),
            }))
            .sort((a: R2Resource, b: R2Resource) =>
              a.displayName.localeCompare(b.displayName)
            )

          setR2Resources(resources)
        }
      } catch (error) {
        console.error('Error fetching R2 resources:', error)
      } finally {
        setResourcesLoading(false)
      }
    }

    fetchR2Resources()
  }, [])

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
      const title = encodeURIComponent((link as any).ctaTitle || link.name)
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
    <footer className='bg-gray-900 text-white py-8 sm:py-12'>
      {/* Main Footer Content */}
      <div className={brandClasses.container}>
        <div className='flex flex-wrap justify-between gap-4 sm:gap-6 md:gap-8 lg:flex-nowrap lg:justify-start'>
          {/* Company Info */}
          <motion.div
            className='w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1.33rem)] lg:w-[calc(16.666%-1.33rem)] lg:flex-shrink-0'
            style={{ order: 1 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href='/' className='flex items-center mb-4 sm:mb-6 group'>
              <motion.div
                whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
                transition={{ scale: { duration: 0.2 } }}
                className='text-xl sm:text-2xl font-bold text-white transition-opacity duration-300 group-hover:opacity-90'
              >
                Best IT Consulting
              </motion.div>
            </Link>

            {/* Contact Info */}
            <div className='space-y-2 sm:space-y-2 mb-4 sm:mb-6'>
              <div className='flex items-start sm:items-center space-x-2 sm:space-x-3 text-gray-400'>
                <Mail className='h-4 w-4 text-white flex-shrink-0 mt-0.5 sm:mt-0' />
                <span className='text-xs sm:text-sm break-all'>
                  service@bestitconsulting.ca
                </span>
              </div>
              <div className='flex items-center space-x-2 sm:space-x-3 text-gray-400'>
                <Phone className='h-4 w-4 text-white flex-shrink-0' />
                <a
                  href='tel:+12369923846'
                  className='text-xs sm:text-sm hover:text-white transition-colors'
                >
                  +1 (236) 992-3846
                </a>
              </div>
              <div className='flex items-start sm:items-center space-x-2 sm:space-x-3 text-gray-400'>
                <MapPin className='h-4 w-4 text-white flex-shrink-0 mt-0.5 sm:mt-0' />
                <span className='text-xs sm:text-sm'>
                  Great Vancouver, Canada 🇨🇦
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className='flex space-x-4'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  tabIndex={0}
                  className='text-gray-400 hover:text-white transition-colors'
                  whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
                  whileTap={shouldAnimate ? { scale: 0.95 } : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className='h-6 w-6' />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => {
              // For resources category, use R2 resources instead of static links
              const displayLinks =
                category === 'resources' ? r2Resources : links

              // Determine order for mobile stacking
              const orderMap: { [key: string]: number } = {
                sitemap: 2,
                services: 3,
                resources: 4,
                legal: 5,
              }

              return (
                <motion.div
                  key={category}
                  className={`w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1.33rem)] lg:w-[calc(16.666%-1.33rem)] lg:flex-shrink-0 ${
                    category === 'resources' ? 'lg:mr-4 xl:mr-6' : ''
                  }`}
                  style={{ order: orderMap[category] || categoryIndex + 2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className='font-semibold text-white mb-2 sm:mb-3 md:mb-4 capitalize text-xs sm:text-sm md:text-base'>
                    {category}
                  </h3>
                  <ul className='space-y-1 sm:space-y-1.5 md:space-y-2 text-gray-400'>
                    {category === 'resources' && resourcesLoading ? (
                      <li className='text-[11px] sm:text-xs md:text-sm text-gray-500'>
                        Loading...
                      </li>
                    ) : category === 'resources' && displayLinks.length === 0 ? (
                      <li className='text-[11px] sm:text-xs md:text-sm text-gray-500'>
                        No resources available
                      </li>
                    ) : (
                      displayLinks.map((link: any, index: number) => (
                        <motion.li
                          key={category === 'resources' ? link.filename : link.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {category === 'resources' ? (
                            // R2 Resource link
                            <a
                              href={link.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-gray-400 hover:text-white transition-colors flex items-start sm:items-center group cursor-pointer text-[11px] sm:text-xs md:text-sm'
                            >
                              {(() => {
                                const IconComponent = link.icon
                                return (
                                  <IconComponent className='mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5 sm:mt-0' />
                                )
                              })()}
                              <span className='break-words leading-tight flex-1 min-w-0'>
                                {link.displayName}
                              </span>
                              <ArrowRight className='ml-auto sm:ml-2 h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0' />
                            </a>
                          ) : link.name === 'FAQ' ? (
                        <div className='flex items-start sm:items-center group w-full cursor-pointer'>
                          <FAQDialogCompact
                            faqs={faqs}
                            triggerText={link.name}
                            className={`text-gray-400 hover:text-white hover:bg-transparent transition-colors p-0 h-auto font-normal justify-start flex-1 cursor-pointer ${
                              (link as any).isLarge
                                ? 'text-xs sm:text-sm md:text-base font-medium'
                                : 'text-[11px] sm:text-xs md:text-sm'
                            }`}
                          />
                          <ArrowRight className='ml-auto sm:ml-2 h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0' />
                        </div>
                      ) : (link as any).isExternal ? (
                        <a
                          href={(link as any).href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={`text-gray-400 hover:text-white transition-colors flex items-start sm:items-center group cursor-pointer ${
                            (link as any).isLarge
                              ? 'text-xs sm:text-sm md:text-base font-medium'
                              : 'text-[11px] sm:text-xs md:text-sm'
                          }`}
                        >
                          {(link as any).icon &&
                            (() => {
                              const IconComponent = (link as any).icon
                              return (
                                <IconComponent className='mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5 sm:mt-0' />
                              )
                            })()}
                          <span className='break-words leading-tight'>
                            {link.name}
                          </span>
                          <ArrowRight className='ml-auto sm:ml-2 h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0' />
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          onClick={e => handleLinkClick(e, link)}
                          className={`text-gray-400 hover:text-white transition-colors flex items-start sm:items-center group cursor-pointer ${
                            (link as any).isLarge
                              ? 'text-xs sm:text-sm md:text-base font-medium'
                              : 'text-[11px] sm:text-xs md:text-sm'
                          }`}
                        >
                          {(link as any).icon &&
                            (() => {
                              const IconComponent = (link as any).icon
                              return (
                                <IconComponent className='mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5 sm:mt-0' />
                              )
                            })()}
                          <span className='break-words leading-tight'>
                            {link.name}
                          </span>
                          <ArrowRight className='ml-auto sm:ml-2 h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0' />
                            </a>
                          )}
                        </motion.li>
                      ))
                    )}
                  </ul>
                </motion.div>
              )
            }
          )}

          {/* Mobile Access Section */}
          <motion.div
            className='w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1.33rem)] lg:w-[calc(16.666%-1.33rem)] lg:flex-shrink-0'
            style={{ order: 6 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className='font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base'>
              <Smartphone className='h-4 w-4 text-white' />
              Mobile Access
            </h3>
            <div className='flex flex-col items-start'>
              <QRCodeCompact url='https://bestitconsulting.ca' size={80} />
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className='border-t border-gray-100 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400'
          style={{ borderColor: '#334155' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className='text-xs sm:text-sm px-4'>
            © 2025 BestIT Consulting Ltd. All rights reserved.
          </p>
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

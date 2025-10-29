'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import {
  Code2,
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
} from 'lucide-react'
import { QRCodeCompact } from '@/components/ui/qr-code'
import { FAQDialogCompact } from '@/components/ui/faq-dialog'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '/careers' },
    { name: 'FAQ', href: '/faq' },
  ],
  services: [
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'Mobile Apps', href: '/services#mobile-apps' },
    { name: 'Cloud Solutions', href: '/services#cloud-solutions' },
    { name: 'AI & ML', href: '/services#ai-ml' },
    { name: 'DevOps', href: '/services#devops' },
    { name: 'Consulting', href: '/services#consulting' },
  ],
  resources: [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Support', href: '/support' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
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
              <Link href='/' className='flex items-center space-x-2 mb-6 group'>
                <motion.div
                  className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'
                  whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
                  transition={{ duration: 0.2 }}
                >
                  <Code2 className='h-6 w-6 text-white' />
                </motion.div>
                <div className='flex flex-col'>
                  <span className='font-bold text-xl'>BestIT</span>
                  <span className='text-sm text-gray-400'>Consulting</span>
                </div>
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
                        ) : (
                          <Link
                            href={link.href}
                            className='text-gray-300 hover:text-white transition-colors duration-200 flex items-center group'
                          >
                            <span>{link.name}</span>
                            <ArrowRight className='ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                          </Link>
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
            <Link
              href='/privacy'
              className='hover:text-white transition-colors'
            >
              Privacy Policy
            </Link>
            <Link href='/terms' className='hover:text-white transition-colors'>
              Terms of Service
            </Link>
            <Link
              href='/cookies'
              className='hover:text-white transition-colors'
            >
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

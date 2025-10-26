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
} from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '/careers' },
    { name: 'News', href: '/news' },
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

const certifications = [
  { name: 'ISO 9001:2015', icon: Shield },
  { name: 'AWS Partner', icon: Award },
  { name: 'Microsoft Gold', icon: Award },
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
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12'>
            {/* Company Info */}
            <motion.div
              className='lg:col-span-1'
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

              <p className='text-gray-300 mb-6 leading-relaxed'>
                We deliver cutting-edge technology solutions that help
                businesses scale, innovate, and succeed in the digital era.
              </p>

              {/* Contact Info */}
              <div className='space-y-3 mb-6'>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <Mail className='h-4 w-4 text-blue-400' />
                  <span className='text-sm'>contact@bestitconsulting.ca</span>
                </div>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <Phone className='h-4 w-4 text-blue-400' />
                  <span className='text-sm'>+1 (236) 992-3846</span>
                </div>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <MapPin className='h-4 w-4 text-blue-400' />
                  <span className='text-sm'>San Francisco, CA</span>
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
                        <Link
                          href={link.href}
                          className='text-gray-300 hover:text-white transition-colors duration-200 flex items-center group'
                        >
                          <span>{link.name}</span>
                          <ArrowRight className='ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Certifications Section */}
        <motion.div
          className='py-8 border-t border-gray-800'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className='flex flex-col lg:flex-row items-center justify-between'>
            <div className='mb-6 lg:mb-0'>
              <h4 className='font-semibold text-white mb-4'>
                Certified & Trusted
              </h4>
              <div className='flex flex-wrap gap-4'>
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    className='flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg'
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <cert.icon className='h-4 w-4 text-blue-400' />
                    <span className='text-sm text-gray-300'>{cert.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='text-center lg:text-right'>
              <div className='flex items-center justify-center lg:justify-end space-x-6 mb-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-400'>500+</div>
                  <div className='text-xs text-gray-400'>Happy Clients</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-green-400'>98%</div>
                  <div className='text-xs text-gray-400'>Success Rate</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-purple-400'>10+</div>
                  <div className='text-xs text-gray-400'>Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className='py-6 border-t border-gray-800 flex flex-col lg:flex-row items-center justify-between'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className='text-gray-400 text-sm mb-4 lg:mb-0'>
            © 2024 Best IT Consulting. All rights reserved.
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

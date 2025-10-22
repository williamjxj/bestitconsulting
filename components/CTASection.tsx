'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedText, AnimatedButton } from './'
import { useResponsive } from '@/lib/breakpoints'
import {
  Rocket,
  Phone,
  Calendar,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
} from 'lucide-react'

interface CTASectionProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
}

/**
 * CTASection Component
 *
 * A compelling call-to-action section that drives user engagement
 * and conversion with clear value propositions and urgency
 */
export function CTASection({
  className = '',
  variant = 'primary',
}: CTASectionProps) {
  const { isMobile } = useResponsive()

  const benefits = [
    'Free consultation and project assessment',
    'Custom solution architecture design',
    'No-obligation proposal with clear pricing',
    '24/7 support during implementation',
  ]

  const urgency = {
    title: 'Limited Time Offer',
    description: 'Get 20% off your first project when you start this month',
    deadline: 'Offer expires in 7 days',
  }

  const socialProof = {
    clients: '500+',
    satisfaction: '98%',
    responseTime: '< 2 hours',
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background:
            'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
          text: 'text-white',
          accent: 'text-blue-200',
        }
      case 'secondary':
        return {
          background:
            'bg-gradient-to-br from-green-600 via-teal-600 to-cyan-700',
          text: 'text-white',
          accent: 'text-green-200',
        }
      case 'accent':
        return {
          background:
            'bg-gradient-to-br from-orange-600 via-red-600 to-pink-700',
          text: 'text-white',
          accent: 'text-orange-200',
        }
      default:
        return {
          background:
            'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
          text: 'text-white',
          accent: 'text-blue-200',
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <AnimatedSection
      animation='fadeInUp'
      delay={0.2}
      className={`py-16 md:py-24 ${styles.background} ${className}`}
    >
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Content */}
            <div>
              <AnimatedText animation='slideInLeft' delay={0.4}>
                <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                  Ready to Transform Your{' '}
                  <span className='text-yellow-400'>Business</span>?
                </h2>
              </AnimatedText>

              <AnimatedText animation='slideInLeft' delay={0.6}>
                <p className='text-xl mb-8 leading-relaxed'>
                  Join hundreds of companies that have already revolutionized
                  their operations with our proven IT solutions. Let's discuss
                  your project and create a custom roadmap to success.
                </p>
              </AnimatedText>

              {/* Benefits */}
              <div className='mb-8'>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className='flex items-center mb-4'
                  >
                    <CheckCircle className='h-5 w-5 text-green-400 mr-3 flex-shrink-0' />
                    <span className='text-lg'>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Urgency */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className='bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/30'
              >
                <div className='flex items-center mb-2'>
                  <Star className='h-5 w-5 text-yellow-400 mr-2' />
                  <span className='font-bold text-yellow-400'>
                    {urgency.title}
                  </span>
                </div>
                <p className='text-lg mb-2'>{urgency.description}</p>
                <p className='text-sm text-red-200 font-medium'>
                  {urgency.deadline}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <AnimatedButton
                  variant='primary'
                  size='lg'
                  hover={{ scale: 1.05 }}
                  className='bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center'
                  onClick={() => (window.location.href = '/contact')}
                >
                  <Rocket className='mr-2 h-5 w-5' />
                  Get Free Consultation
                  <ArrowRight className='ml-2 h-5 w-5' />
                </AnimatedButton>

                <AnimatedButton
                  variant='outline'
                  size='lg'
                  hover={{ scale: 1.05 }}
                  className='border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center'
                  onClick={() => (window.location.href = '/schedule')}
                >
                  <Calendar className='mr-2 h-5 w-5' />
                  Schedule Call
                </AnimatedButton>
              </div>
            </div>

            {/* Visual Elements */}
            <div className='relative'>
              {/* Main CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className='bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20'
              >
                <div className='text-center mb-6'>
                  <div className='w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Zap className='h-10 w-10 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold mb-2'>
                    Start Your Project Today
                  </h3>
                  <p className='text-blue-100'>
                    Get instant access to our expert team
                  </p>
                </div>

                {/* Social Proof */}
                <div className='grid grid-cols-3 gap-4 mb-6'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-white'>
                      {socialProof.clients}
                    </div>
                    <div className='text-sm text-blue-200'>Happy Clients</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-white'>
                      {socialProof.satisfaction}
                    </div>
                    <div className='text-sm text-blue-200'>Satisfaction</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-white'>
                      {socialProof.responseTime}
                    </div>
                    <div className='text-sm text-blue-200'>Response</div>
                  </div>
                </div>

                {/* Contact Options */}
                <div className='space-y-3'>
                  <button
                    onClick={() => (window.location.href = '/contact')}
                    className='w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center'
                  >
                    <Phone className='mr-2 h-5 w-5' />
                    Call Now: (555) 123-4567
                  </button>

                  <button
                    onClick={() => (window.location.href = '/contact')}
                    className='w-full border-2 border-white/30 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center'
                  >
                    <Users className='mr-2 h-5 w-5' />
                    Live Chat Available
                  </button>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className='absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg'
              >
                <Star className='h-8 w-8 text-white' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className='absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg'
              >
                <CheckCircle className='h-6 w-6 text-white' />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

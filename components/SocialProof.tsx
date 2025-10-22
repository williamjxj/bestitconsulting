'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedText } from './'
import { useResponsive } from '@/lib/breakpoints'
import {
  Star,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Quote,
} from 'lucide-react'

interface SocialProofProps {
  className?: string
}

/**
 * SocialProof Component
 *
 * A social proof section that showcases client logos, testimonials,
 * and key metrics to build trust and credibility
 */
export function SocialProof({ className = '' }: SocialProofProps) {
  const { isMobile } = useResponsive()

  const clientLogos = [
    { name: 'TechCorp', logo: '/logos/techcorp.svg' },
    { name: 'InnovateLabs', logo: '/logos/innovate.svg' },
    { name: 'DataFlow', logo: '/logos/dataflow.svg' },
    { name: 'CloudTech', logo: '/logos/cloudtech.svg' },
    { name: 'SecureSys', logo: '/logos/securesys.svg' },
    { name: 'FutureSoft', logo: '/logos/futuresoft.svg' },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, TechCorp',
      company: 'Fortune 500 Technology Company',
      content:
        'BestIT transformed our entire infrastructure. The results speak for themselves - 40% cost reduction and 60% faster deployment times.',
      rating: 5,
      avatar: '/avatars/sarah-johnson.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'VP Engineering, InnovateLabs',
      company: 'Leading Innovation Lab',
      content:
        "Their expertise in cloud architecture helped us scale from startup to enterprise. The team's dedication and technical excellence is unmatched.",
      rating: 5,
      avatar: '/avatars/michael-chen.jpg',
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO, DataFlow',
      company: 'Data Analytics Platform',
      content:
        'BestIT delivered a solution that exceeded our expectations. The ROI was evident within the first quarter of implementation.',
      rating: 5,
      avatar: '/avatars/emily-rodriguez.jpg',
    },
  ]

  const metrics = [
    {
      icon: <Users className='h-8 w-8 text-blue-500' />,
      value: '500+',
      label: 'Happy Clients',
      description: 'Companies that trust us with their IT needs',
    },
    {
      icon: <Award className='h-8 w-8 text-yellow-500' />,
      value: '98%',
      label: 'Success Rate',
      description: 'Projects delivered on time and within budget',
    },
    {
      icon: <TrendingUp className='h-8 w-8 text-green-500' />,
      value: '300%',
      label: 'Average ROI',
      description: 'Return on investment for our clients',
    },
    {
      icon: <Star className='h-8 w-8 text-purple-500' />,
      value: '4.9/5',
      label: 'Client Rating',
      description: 'Based on 500+ client reviews',
    },
  ]

  return (
    <AnimatedSection
      animation='fadeInUp'
      delay={0.2}
      className={`py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}
    >
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <AnimatedText animation='fadeInUp' delay={0.4}>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Trusted by <span className='text-blue-600'>Industry Leaders</span>
            </h2>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={0.6}>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Join hundreds of companies that have transformed their business
              with our proven IT solutions and exceptional service.
            </p>
          </AnimatedText>
        </div>

        {/* Client Logos */}
        <div className='mb-16'>
          <AnimatedText animation='fadeInUp' delay={0.8}>
            <h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
              Our Valued Clients
            </h3>
          </AnimatedText>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center'>
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                className='group flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'
              >
                <div className='w-24 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center'>
                  <span className='text-gray-600 font-semibold text-sm'>
                    {client.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              className='text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
            >
              <div className='w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4'>
                {metric.icon}
              </div>
              <div className='text-3xl font-bold text-gray-900 mb-2'>
                {metric.value}
              </div>
              <div className='text-lg font-semibold text-gray-700 mb-2'>
                {metric.label}
              </div>
              <div className='text-sm text-gray-600'>{metric.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className='mb-16'>
          <AnimatedText animation='fadeInUp' delay={1.6}>
            <h3 className='text-3xl font-bold text-gray-900 text-center mb-12'>
              What Our Clients Say
            </h3>
          </AnimatedText>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.8 + index * 0.2, duration: 0.6 }}
                className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
              >
                <div className='flex items-center mb-4'>
                  <Quote className='h-8 w-8 text-blue-500' />
                  <div className='flex ml-2'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='h-4 w-4 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                </div>
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  "{testimonial.content}"
                </p>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4'>
                    {testimonial.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className='font-semibold text-gray-900'>
                      {testimonial.name}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {testimonial.role}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white'>
          <div className='text-center'>
            <AnimatedText animation='fadeInUp' delay={2.4}>
              <h3 className='text-3xl md:text-4xl font-bold mb-6'>
                Why Industry Leaders Choose BestIT
              </h3>
            </AnimatedText>
            <AnimatedText animation='fadeInUp' delay={2.6}>
              <p className='text-xl text-blue-100 mb-8 max-w-3xl mx-auto'>
                Our track record speaks for itself. We've helped companies of
                all sizes achieve their digital transformation goals with
                measurable results.
              </p>
            </AnimatedText>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 2.8, duration: 0.6 }}
                className='text-center'
              >
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <CheckCircle className='h-8 w-8' />
                </div>
                <h4 className='text-xl font-bold mb-2'>Proven Expertise</h4>
                <p className='text-blue-100'>
                  10+ years of experience delivering complex IT solutions
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 3.0, duration: 0.6 }}
                className='text-center'
              >
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Award className='h-8 w-8' />
                </div>
                <h4 className='text-xl font-bold mb-2'>Quality Assured</h4>
                <p className='text-blue-100'>
                  Rigorous testing and quality assurance processes
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 3.2, duration: 0.6 }}
                className='text-center'
              >
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <TrendingUp className='h-8 w-8' />
                </div>
                <h4 className='text-xl font-bold mb-2'>Measurable Results</h4>
                <p className='text-blue-100'>
                  Clear ROI and performance metrics for every project
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

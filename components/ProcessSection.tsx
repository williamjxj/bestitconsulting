'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'
import { AnimatedText } from './AnimatedText'
import { useResponsive } from '@/lib/breakpoints'
import {
  Search,
  Lightbulb,
  Cog,
  Rocket,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

interface ProcessSectionProps {
  className?: string
}

/**
 * ProcessSection Component
 *
 * An animated process visualization that shows the company's
 * methodology in clear, engaging steps
 */
export function ProcessSection({ className = '' }: ProcessSectionProps) {
  const { isMobile } = useResponsive()

  const processSteps = [
    {
      number: '01',
      icon: <Search className='h-8 w-8 text-blue-500' />,
      title: 'Discovery & Analysis',
      description:
        'We dive deep into your business challenges, current systems, and growth objectives to understand your unique needs.',
      details: [
        'Stakeholder interviews',
        'System audit & assessment',
        'Requirements gathering',
        'Risk analysis',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: '02',
      icon: <Lightbulb className='h-8 w-8 text-yellow-500' />,
      title: 'Strategy & Planning',
      description:
        'Our experts design a comprehensive solution architecture tailored to your specific business goals and constraints.',
      details: [
        'Solution architecture design',
        'Technology stack selection',
        'Timeline & resource planning',
        'Success metrics definition',
      ],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      number: '03',
      icon: <Cog className='h-8 w-8 text-green-500' />,
      title: 'Development & Implementation',
      description:
        'We build your solution using agile methodologies, ensuring quality, security, and scalability at every step.',
      details: [
        'Agile development sprints',
        'Continuous testing & QA',
        'Security implementation',
        'Performance optimization',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: '04',
      icon: <Rocket className='h-8 w-8 text-purple-500' />,
      title: 'Launch & Optimization',
      description:
        'We deploy your solution with comprehensive training and ongoing support to ensure maximum adoption and ROI.',
      details: [
        'Phased deployment',
        'Team training & documentation',
        'Performance monitoring',
        'Continuous optimization',
      ],
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <AnimatedSection
      animation='fadeInUp'
      delay={0.2}
      className={`py-16 md:py-24 bg-white ${className}`}
    >
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <AnimatedText animation='fadeInUp' delay={0.4}>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Our Proven <span className='text-blue-600'>Process</span>
            </h2>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={0.6}>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              We follow a systematic approach that ensures every project
              delivers exceptional results on time and within budget.
            </p>
          </AnimatedText>
        </div>

        {/* Process Steps */}
        <div className='relative'>
          {/* Connection Line */}
          <div className='hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-yellow-200 to-purple-200 transform -translate-y-1/2 z-0'></div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4'>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className='relative z-10'
              >
                <div className='group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
                  {/* Step Number */}
                  <div className='flex items-center justify-between mb-6'>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {step.number}
                    </div>
                    <div className='w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>
                    {step.title}
                  </h3>
                  <p className='text-gray-600 mb-6 leading-relaxed'>
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className='space-y-2'>
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          delay: index * 0.2 + 0.3 + detailIndex * 0.1,
                          duration: 0.4,
                        }}
                        className='flex items-center'
                      >
                        <CheckCircle className='h-4 w-4 text-green-500 mr-3 flex-shrink-0' />
                        <span className='text-sm text-gray-600'>{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Arrow for mobile */}
                  {index < processSteps.length - 1 && (
                    <div className='lg:hidden flex justify-center mt-6'>
                      <ArrowRight className='h-6 w-6 text-gray-400' />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Benefits */}
        <div className='mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className='text-center'
            >
              <div className='w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <CheckCircle className='h-8 w-8 text-white' />
              </div>
              <h4 className='text-xl font-bold text-gray-900 mb-2'>
                Quality Assured
              </h4>
              <p className='text-gray-600'>
                Every step is thoroughly tested and validated to ensure the
                highest standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className='text-center'
            >
              <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Rocket className='h-8 w-8 text-white' />
              </div>
              <h4 className='text-xl font-bold text-gray-900 mb-2'>
                Fast Delivery
              </h4>
              <p className='text-gray-600'>
                Agile methodologies ensure rapid development without
                compromising on quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className='text-center'
            >
              <div className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Cog className='h-8 w-8 text-white' />
              </div>
              <h4 className='text-xl font-bold text-gray-900 mb-2'>
                Ongoing Support
              </h4>
              <p className='text-gray-600'>
                Continuous monitoring and optimization to ensure long-term
                success.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className='text-center mt-12'>
          <AnimatedText animation='fadeInUp' delay={1.4}>
            <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
              Ready to Start Your Project?
            </h3>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={1.6}>
            <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
              Let's discuss your project requirements and see how our proven
              process can deliver exceptional results for your business.
            </p>
          </AnimatedText>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <button
              onClick={() => (window.location.href = '/contact')}
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center'
            >
              <Rocket className='mr-2 h-5 w-5' />
              Start Your Project
            </button>
            <button
              onClick={() => (window.location.href = '/portfolio')}
              className='border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 flex items-center justify-center'
            >
              <Search className='mr-2 h-5 w-5' />
              View Our Work
            </button>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

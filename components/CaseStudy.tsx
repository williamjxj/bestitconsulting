'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'
import { AnimatedText } from './AnimatedText'
import { AnimatedButton } from './AnimatedButton'
import { useResponsive } from '@/lib/breakpoints'
import {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Building,
  Target,
  Award,
  Zap,
  Quote,
} from 'lucide-react'

interface CaseStudyProps {
  className?: string
}

/**
 * CaseStudy Component
 *
 * A showcase of successful case studies with before/after visuals
 * and detailed results to demonstrate company capabilities
 */
export function CaseStudy({ className = '' }: CaseStudyProps) {
  const { isMobile } = useResponsive()

  const caseStudies = [
    {
      id: 'techcorp-transformation',
      company: 'TechCorp',
      industry: 'Technology',
      challenge:
        'Legacy systems causing 40% productivity loss and frequent downtime',
      solution:
        'Complete digital transformation with cloud migration and modern architecture',
      results: {
        costReduction: '45%',
        productivityGain: '60%',
        uptime: '99.9%',
        roi: '320%',
      },
      timeline: '6 months',
      team: '12 professionals',
      image: '/case-studies/techcorp-before-after.jpg',
      testimonial: {
        quote:
          'BestIT transformed our entire infrastructure. The results speak for themselves - 40% cost reduction and 60% faster deployment times.',
        author: 'Sarah Johnson',
        role: 'CTO, TechCorp',
      },
    },
    {
      id: 'innovate-scaling',
      company: 'InnovateLabs',
      industry: 'Research & Development',
      challenge:
        'Scaling challenges preventing growth from startup to enterprise',
      solution: 'Scalable cloud architecture with AI-powered automation',
      results: {
        costReduction: '35%',
        productivityGain: '80%',
        uptime: '99.8%',
        roi: '280%',
      },
      timeline: '4 months',
      team: '8 professionals',
      image: '/case-studies/innovate-before-after.jpg',
      testimonial: {
        quote:
          "Their expertise in cloud architecture helped us scale from startup to enterprise. The team's dedication and technical excellence is unmatched.",
        author: 'Michael Chen',
        role: 'VP Engineering, InnovateLabs',
      },
    },
    {
      id: 'dataflow-optimization',
      company: 'DataFlow',
      industry: 'Data Analytics',
      challenge:
        'Data processing bottlenecks limiting real-time analytics capabilities',
      solution:
        'High-performance data pipeline with real-time processing and visualization',
      results: {
        costReduction: '50%',
        productivityGain: '75%',
        uptime: '99.95%',
        roi: '400%',
      },
      timeline: '5 months',
      team: '10 professionals',
      image: '/case-studies/dataflow-before-after.jpg',
      testimonial: {
        quote:
          'BestIT delivered a solution that exceeded our expectations. The ROI was evident within the first quarter of implementation.',
        author: 'Emily Rodriguez',
        role: 'CEO, DataFlow',
      },
    },
  ]

  const metrics = [
    {
      icon: <TrendingUp className='h-6 w-6 text-green-500' />,
      label: 'Average ROI',
      value: '333%',
    },
    {
      icon: <Users className='h-6 w-6 text-blue-500' />,
      label: 'Projects Completed',
      value: '500+',
    },
    {
      icon: <Clock className='h-6 w-6 text-purple-500' />,
      label: 'Average Timeline',
      value: '5 months',
    },
    {
      icon: <Award className='h-6 w-6 text-yellow-500' />,
      label: 'Success Rate',
      value: '98%',
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
              Success <span className='text-blue-600'>Stories</span>
            </h2>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={0.6}>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Real projects, real results. Discover how we've helped companies
              transform their operations and achieve remarkable business
              outcomes.
            </p>
          </AnimatedText>
        </div>

        {/* Case Studies */}
        <div className='space-y-16'>
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className='bg-white rounded-3xl shadow-xl overflow-hidden'
            >
              <div className='grid grid-cols-1 lg:grid-cols-2'>
                {/* Content */}
                <div className='p-8 md:p-12'>
                  <div className='flex items-center mb-6'>
                    <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4'>
                      {study.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className='text-2xl font-bold text-gray-900'>
                        {study.company}
                      </h3>
                      <p className='text-gray-600'>{study.industry}</p>
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className='mb-8'>
                    <h4 className='text-lg font-semibold text-gray-900 mb-3 flex items-center'>
                      <Target className='h-5 w-5 text-red-500 mr-2' />
                      Challenge
                    </h4>
                    <p className='text-gray-600 mb-6'>{study.challenge}</p>

                    <h4 className='text-lg font-semibold text-gray-900 mb-3 flex items-center'>
                      <Zap className='h-5 w-5 text-blue-500 mr-2' />
                      Solution
                    </h4>
                    <p className='text-gray-600'>{study.solution}</p>
                  </div>

                  {/* Results */}
                  <div className='grid grid-cols-2 gap-4 mb-8'>
                    <div className='bg-green-50 rounded-xl p-4 text-center'>
                      <div className='text-2xl font-bold text-green-600'>
                        {study.results.costReduction}
                      </div>
                      <div className='text-sm text-gray-600'>
                        Cost Reduction
                      </div>
                    </div>
                    <div className='bg-blue-50 rounded-xl p-4 text-center'>
                      <div className='text-2xl font-bold text-blue-600'>
                        {study.results.productivityGain}
                      </div>
                      <div className='text-sm text-gray-600'>
                        Productivity Gain
                      </div>
                    </div>
                    <div className='bg-purple-50 rounded-xl p-4 text-center'>
                      <div className='text-2xl font-bold text-purple-600'>
                        {study.results.uptime}
                      </div>
                      <div className='text-sm text-gray-600'>Uptime</div>
                    </div>
                    <div className='bg-yellow-50 rounded-xl p-4 text-center'>
                      <div className='text-2xl font-bold text-yellow-600'>
                        {study.results.roi}
                      </div>
                      <div className='text-sm text-gray-600'>ROI</div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className='flex flex-wrap gap-4 mb-6'>
                    <div className='flex items-center text-sm text-gray-600'>
                      <Clock className='h-4 w-4 mr-2' />
                      {study.timeline}
                    </div>
                    <div className='flex items-center text-sm text-gray-600'>
                      <Users className='h-4 w-4 mr-2' />
                      {study.team}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className='bg-gray-50 rounded-xl p-6'>
                    <Quote className='h-6 w-6 text-blue-500 mb-3' />
                    <p className='text-gray-700 mb-4 italic'>
                      "{study.testimonial.quote}"
                    </p>
                    <div className='flex items-center'>
                      <div className='w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3'>
                        {study.testimonial.author
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className='font-semibold text-gray-900'>
                          {study.testimonial.author}
                        </div>
                        <div className='text-sm text-gray-600'>
                          {study.testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className='relative bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mb-6 mx-auto'>
                      {study.company.charAt(0)}
                    </div>
                    <h4 className='text-xl font-bold text-gray-900 mb-2'>
                      Before & After
                    </h4>
                    <p className='text-gray-600 mb-6'>
                      Visual transformation showcase
                    </p>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-red-100 rounded-lg p-4 text-center'>
                        <div className='text-sm text-red-600 font-medium'>
                          Before
                        </div>
                        <div className='text-2xl font-bold text-red-700'>
                          40%
                        </div>
                        <div className='text-xs text-red-500'>
                          Productivity Loss
                        </div>
                      </div>
                      <div className='bg-green-100 rounded-lg p-4 text-center'>
                        <div className='text-sm text-green-600 font-medium'>
                          After
                        </div>
                        <div className='text-2xl font-bold text-green-700'>
                          {study.results.productivityGain}
                        </div>
                        <div className='text-xs text-green-500'>
                          Productivity Gain
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Metrics */}
        <div className='mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl'>
          <AnimatedText animation='fadeInUp' delay={1.2}>
            <h3 className='text-3xl font-bold text-center text-gray-900 mb-12'>
              Our Track Record
            </h3>
          </AnimatedText>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className='text-center'
              >
                <div className='w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4'>
                  {metric.icon}
                </div>
                <div className='text-3xl font-bold text-gray-900 mb-2'>
                  {metric.value}
                </div>
                <div className='text-gray-600 font-medium'>{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='text-center mt-16'>
          <AnimatedText animation='fadeInUp' delay={1.6}>
            <h3 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
              Ready to Write Your Success Story?
            </h3>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={1.8}>
            <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto'>
              Let us help you achieve similar results with our proven
              methodology and expert team of IT professionals.
            </p>
          </AnimatedText>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <AnimatedButton
              variant='primary'
              size='lg'
              hover={{ scale: 1.05 }}
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center'
              onClick={() => (window.location.href = '/contact')}
            >
              <Building className='mr-2 h-5 w-5' />
              Start Your Project
              <ArrowRight className='ml-2 h-5 w-5' />
            </AnimatedButton>
            <AnimatedButton
              variant='outline'
              size='lg'
              hover={{ scale: 1.05 }}
              className='border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center'
              onClick={() => (window.location.href = '/portfolio')}
            >
              <Award className='mr-2 h-5 w-5' />
              View All Case Studies
            </AnimatedButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

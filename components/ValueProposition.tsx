'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'
import { AnimatedText } from './AnimatedText'
import { AnimatedButton } from './AnimatedButton'
import { useResponsive } from '@/lib/breakpoints'
import {
  Target,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

interface ValuePropositionProps {
  className?: string
}

/**
 * ValueProposition Component
 *
 * A compelling value proposition section that clearly communicates
 * the company's unique benefits and differentiators
 */
export function ValueProposition({ className = '' }: ValuePropositionProps) {
  const { isMobile } = useResponsive()

  const valueProps = [
    {
      icon: <Target className='h-8 w-8 text-blue-500' />,
      title: 'Precision Solutions',
      description:
        'Tailored IT strategies that hit your business targets every time',
      benefit: '95% project success rate',
    },
    {
      icon: <Zap className='h-8 w-8 text-yellow-500' />,
      title: 'Lightning Fast',
      description:
        'Rapid deployment and implementation without compromising quality',
      benefit: '50% faster delivery',
    },
    {
      icon: <Shield className='h-8 w-8 text-green-500' />,
      title: 'Enterprise Security',
      description:
        'Bank-level security protocols protecting your most sensitive data',
      benefit: 'Zero security breaches',
    },
    {
      icon: <TrendingUp className='h-8 w-8 text-purple-500' />,
      title: 'Scalable Growth',
      description: 'Solutions that grow with your business, not against it',
      benefit: '300% average ROI',
    },
  ]

  const outcomes = [
    'Reduce operational costs by 40%',
    'Increase team productivity by 60%',
    'Achieve 99.9% system uptime',
    'Scale to 10x your current capacity',
  ]

  return (
    <AnimatedSection
      animation='fadeInUp'
      delay={0.2}
      className={`py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}
    >
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <AnimatedText animation='fadeInUp' delay={0.4}>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Why Choose <span className='text-blue-600'>BestIT</span>?
            </h2>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={0.6}>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              We don't just build software – we architect digital
              transformations that drive measurable business results.
            </p>
          </AnimatedText>
        </div>

        {/* Value Propositions Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className='group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
            >
              <div className='mb-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                  {prop.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {prop.title}
                </h3>
                <p className='text-gray-600 mb-4 leading-relaxed'>
                  {prop.description}
                </p>
                <div className='inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium'>
                  <CheckCircle className='h-4 w-4 mr-1' />
                  {prop.benefit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outcomes Section */}
        <div className='bg-white rounded-3xl p-8 md:p-12 shadow-xl'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <AnimatedText animation='slideInLeft' delay={0.8}>
                <h3 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                  Real Results, Real Impact
                </h3>
              </AnimatedText>
              <AnimatedText animation='slideInLeft' delay={1.0}>
                <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                  Our clients consistently achieve remarkable outcomes that
                  transform their business operations and drive sustainable
                  growth.
                </p>
              </AnimatedText>

              <div className='space-y-4'>
                {outcomes.map((outcome, index) => (
                  <motion.div
                    key={outcome}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    className='flex items-center'
                  >
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0'>
                      <CheckCircle className='h-5 w-5 text-white' />
                    </div>
                    <span className='text-gray-700 font-medium'>{outcome}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='relative'>
              <AnimatedText animation='slideInRight' delay={1.4}>
                <div className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white'>
                  <div className='text-center'>
                    <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                      <TrendingUp className='h-10 w-10' />
                    </div>
                    <h4 className='text-2xl font-bold mb-4'>
                      Average Client Impact
                    </h4>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='text-center'>
                        <div className='text-3xl font-bold'>40%</div>
                        <div className='text-blue-100 text-sm'>
                          Cost Reduction
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-3xl font-bold'>60%</div>
                        <div className='text-blue-100 text-sm'>
                          Productivity Gain
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-3xl font-bold'>99.9%</div>
                        <div className='text-blue-100 text-sm'>Uptime</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-3xl font-bold'>300%</div>
                        <div className='text-blue-100 text-sm'>ROI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center mt-16'>
          <AnimatedText animation='fadeInUp' delay={1.6}>
            <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
              Ready to Transform Your Business?
            </h3>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={1.8}>
            <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
              Join 500+ companies that have already transformed their operations
              with our proven IT solutions.
            </p>
          </AnimatedText>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <AnimatedButton
              variant='primary'
              size='lg'
              hover={{ scale: 1.05 }}
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
              onClick={() => (window.location.href = '/contact')}
            >
              <Users className='mr-2 h-5 w-5' />
              Start Your Transformation
              <ArrowRight className='ml-2 h-5 w-5' />
            </AnimatedButton>
            <AnimatedButton
              variant='outline'
              size='lg'
              hover={{ scale: 1.05 }}
              className='border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300'
              onClick={() => (window.location.href = '/case-studies')}
            >
              <Clock className='mr-2 h-5 w-5' />
              View Case Studies
            </AnimatedButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

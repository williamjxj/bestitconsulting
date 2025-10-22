'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedText, AnimatedButton } from './'
import { useResponsive } from '@/lib/breakpoints'
import { useState } from 'react'
import {
  Check,
  X,
  Star,
  Zap,
  Shield,
  Clock,
  Users,
  Award,
  ArrowRight,
  Target,
} from 'lucide-react'

interface ServiceComparisonProps {
  className?: string
}

/**
 * ServiceComparison Component
 *
 * An interactive service comparison tool that helps users
 * understand different service tiers and choose the right option
 */
export function ServiceComparison({ className = '' }: ServiceComparisonProps) {
  const { isMobile } = useResponsive()
  const [selectedPlan, setSelectedPlan] = useState('professional')

  const services = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses getting started',
      price: '$2,999',
      period: 'per month',
      popular: false,
      features: [
        { name: 'Basic website development', included: true },
        { name: 'Mobile responsive design', included: true },
        { name: 'SEO optimization', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'SSL certificate', included: true },
        { name: 'Content management system', included: true },
        { name: 'Social media integration', included: false },
        { name: 'E-commerce functionality', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom integrations', included: false },
      ],
      color: 'from-gray-500 to-gray-600',
      icon: <Target className='h-8 w-8' />,
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing businesses with complex needs',
      price: '$4,999',
      period: 'per month',
      popular: true,
      features: [
        { name: 'Advanced website development', included: true },
        { name: 'Mobile responsive design', included: true },
        { name: 'Advanced SEO optimization', included: true },
        { name: 'Comprehensive analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'SSL certificate', included: true },
        { name: 'Advanced CMS', included: true },
        { name: 'Social media integration', included: true },
        { name: 'E-commerce functionality', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Performance optimization', included: true },
        { name: 'Security monitoring', included: false },
      ],
      color: 'from-blue-500 to-blue-600',
      icon: <Star className='h-8 w-8' />,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      price: '$9,999',
      period: 'per month',
      popular: false,
      features: [
        { name: 'Enterprise-grade development', included: true },
        { name: 'Mobile responsive design', included: true },
        { name: 'Advanced SEO optimization', included: true },
        { name: 'Real-time analytics', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Advanced SSL security', included: true },
        { name: 'Enterprise CMS', included: true },
        { name: 'Social media integration', included: true },
        { name: 'Advanced e-commerce', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Performance optimization', included: true },
        { name: 'Security monitoring', included: true },
      ],
      color: 'from-purple-500 to-purple-600',
      icon: <Award className='h-8 w-8' />,
    },
  ]

  const benefits = [
    {
      icon: <Zap className='h-6 w-6 text-blue-500' />,
      title: 'Fast Delivery',
      description: 'Quick turnaround times without compromising quality',
    },
    {
      icon: <Shield className='h-6 w-6 text-green-500' />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee',
    },
    {
      icon: <Users className='h-6 w-6 text-purple-500' />,
      title: 'Expert Team',
      description: 'Dedicated professionals with years of experience',
    },
    {
      icon: <Clock className='h-6 w-6 text-orange-500' />,
      title: 'Ongoing Support',
      description: 'Continuous monitoring and optimization',
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
              Choose Your <span className='text-blue-600'>Perfect Plan</span>
            </h2>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={0.6}>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Flexible solutions designed to grow with your business. Compare
              our service tiers and find the perfect fit for your needs.
            </p>
          </AnimatedText>
        </div>

        {/* Service Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                service.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              } ${selectedPlan === service.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedPlan(service.id)}
            >
              {service.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold'>
                    Most Popular
                  </div>
                </div>
              )}

              <div className='p-8'>
                {/* Header */}
                <div className='text-center mb-6'>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4`}
                  >
                    {service.icon}
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    {service.name}
                  </h3>
                  <p className='text-gray-600'>{service.description}</p>
                </div>

                {/* Price */}
                <div className='text-center mb-8'>
                  <div className='text-4xl font-bold text-gray-900 mb-1'>
                    {service.price}
                  </div>
                  <div className='text-gray-600'>{service.period}</div>
                </div>

                {/* Features */}
                <div className='space-y-4 mb-8'>
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        delay: 1.0 + index * 0.1 + featureIndex * 0.05,
                        duration: 0.4,
                      }}
                      className='flex items-center'
                    >
                      {feature.included ? (
                        <Check className='h-5 w-5 text-green-500 mr-3 flex-shrink-0' />
                      ) : (
                        <X className='h-5 w-5 text-gray-300 mr-3 flex-shrink-0' />
                      )}
                      <span
                        className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}
                      >
                        {feature.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <AnimatedButton
                  variant={service.popular ? 'primary' : 'outline'}
                  size='lg'
                  hover={{ scale: 1.05 }}
                  className={`w-full ${
                    service.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                  }`}
                  onClick={() => (window.location.href = '/contact')}
                >
                  Choose {service.name}
                </AnimatedButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16'>
          <AnimatedText animation='fadeInUp' delay={1.2}>
            <h3 className='text-3xl font-bold text-center text-gray-900 mb-12'>
              Why Choose BestIT?
            </h3>
          </AnimatedText>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className='text-center'
              >
                <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                  {benefit.icon}
                </div>
                <h4 className='text-xl font-bold text-gray-900 mb-2'>
                  {benefit.title}
                </h4>
                <p className='text-gray-600'>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Solution */}
        <div className='text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white'>
          <AnimatedText animation='fadeInUp' delay={1.6}>
            <h3 className='text-3xl md:text-4xl font-bold mb-6'>
              Need a Custom Solution?
            </h3>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={1.8}>
            <p className='text-xl text-blue-100 mb-8 max-w-3xl mx-auto'>
              Every business is unique. Let us create a tailored solution that
              perfectly fits your specific requirements and budget.
            </p>
          </AnimatedText>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <AnimatedButton
              variant='primary'
              size='lg'
              hover={{ scale: 1.05 }}
              className='bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center'
              onClick={() => (window.location.href = '/contact')}
            >
              <Users className='mr-2 h-5 w-5' />
              Discuss Custom Solution
              <ArrowRight className='ml-2 h-5 w-5' />
            </AnimatedButton>
            <AnimatedButton
              variant='outline'
              size='lg'
              hover={{ scale: 1.05 }}
              className='border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center'
              onClick={() => (window.location.href = '/portfolio')}
            >
              <Award className='mr-2 h-5 w-5' />
              View Our Work
            </AnimatedButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

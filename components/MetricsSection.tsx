'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedText, AnimatedCounter } from './'
import { useResponsive } from '@/lib/breakpoints'
import {
  TrendingUp,
  Users,
  Clock,
  Award,
  DollarSign,
  Zap,
  Shield,
  Target,
} from 'lucide-react'

interface MetricsSectionProps {
  className?: string
}

/**
 * MetricsSection Component
 *
 * An animated metrics dashboard that showcases key performance indicators
 * and business impact metrics with engaging visualizations
 */
export function MetricsSection({ className = '' }: MetricsSectionProps) {
  const { isMobile } = useResponsive()

  const primaryMetrics = [
    {
      icon: <Users className='h-8 w-8 text-blue-500' />,
      value: 500,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Companies that trust us with their IT needs',
      color: 'from-blue-500 to-blue-600',
      trend: '+15%',
      trendDirection: 'up',
    },
    {
      icon: <Award className='h-8 w-8 text-green-500' />,
      value: 98,
      suffix: '%',
      label: 'Success Rate',
      description: 'Projects delivered on time and within budget',
      color: 'from-green-500 to-emerald-500',
      trend: '+2%',
      trendDirection: 'up',
    },
    {
      icon: <DollarSign className='h-8 w-8 text-yellow-500' />,
      value: 300,
      suffix: '%',
      label: 'Average ROI',
      description: 'Return on investment for our clients',
      color: 'from-yellow-500 to-orange-500',
      trend: '+25%',
      trendDirection: 'up',
    },
    {
      icon: <Clock className='h-8 w-8 text-purple-500' />,
      value: 50,
      suffix: '%',
      label: 'Faster Delivery',
      description: 'Reduced time-to-market for our clients',
      color: 'from-purple-500 to-pink-500',
      trend: '+10%',
      trendDirection: 'up',
    },
  ]

  const impactMetrics = [
    {
      icon: <TrendingUp className='h-6 w-6 text-green-500' />,
      value: 40,
      suffix: '%',
      label: 'Cost Reduction',
      description: 'Average operational cost savings',
    },
    {
      icon: <Zap className='h-6 w-6 text-blue-500' />,
      value: 60,
      suffix: '%',
      label: 'Productivity Gain',
      description: 'Team efficiency improvement',
    },
    {
      icon: <Shield className='h-6 w-6 text-purple-500' />,
      value: 99.9,
      suffix: '%',
      label: 'Uptime',
      description: 'System reliability and availability',
    },
    {
      icon: <Target className='h-6 w-6 text-orange-500' />,
      value: 95,
      suffix: '%',
      label: 'Goal Achievement',
      description: 'Client objectives met or exceeded',
    },
  ]

  const achievements = [
    {
      year: '2024',
      achievement: 'Best IT Consulting Firm',
      organization: 'Tech Awards Canada',
      description: 'Recognized for excellence in digital transformation',
    },
    {
      year: '2023',
      achievement: 'Top 10 Fastest Growing',
      organization: 'Canadian Business Review',
      description: 'Rapid growth while maintaining quality standards',
    },
    {
      year: '2023',
      achievement: 'Client Satisfaction Award',
      organization: 'Industry Excellence',
      description: 'Highest client satisfaction scores in the region',
    },
  ]

  return (
    <AnimatedSection
      animation='fadeInUp'
      delay={0.2}
      className={`py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white ${className}`}
    >
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <AnimatedText animation='fadeInUp' delay={0.4}>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              Our <span className='text-blue-400'>Impact</span> in Numbers
            </h2>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={0.6}>
            <p className='text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed'>
              Measurable results that demonstrate our commitment to delivering
              exceptional value and driving business transformation.
            </p>
          </AnimatedText>
        </div>

        {/* Primary Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
          {primaryMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className='group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2'
            >
              <div className='flex items-center justify-between mb-4'>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}
                >
                  {metric.icon}
                </div>
                <div className='flex items-center text-green-400'>
                  <TrendingUp className='h-4 w-4 mr-1' />
                  <span className='text-sm font-medium'>{metric.trend}</span>
                </div>
              </div>

              <div className='text-3xl md:text-4xl font-bold mb-2'>
                <AnimatedCounter
                  end={metric.value}
                  suffix={metric.suffix}
                  duration={2}
                  delay={index * 0.2}
                  className='text-white'
                />
              </div>

              <div className='text-lg font-semibold text-blue-100 mb-2'>
                {metric.label}
              </div>
              <div className='text-sm text-blue-200'>{metric.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Impact Metrics */}
        <div className='bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16'>
          <AnimatedText animation='fadeInUp' delay={1.2}>
            <h3 className='text-3xl font-bold text-center mb-12'>
              Client Impact Metrics
            </h3>
          </AnimatedText>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className='text-center'
              >
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  {metric.icon}
                </div>
                <div className='text-2xl md:text-3xl font-bold text-white mb-2'>
                  <AnimatedCounter
                    end={metric.value}
                    suffix={metric.suffix}
                    duration={2}
                    delay={1.6 + index * 0.1}
                    className='text-white'
                  />
                </div>
                <div className='text-lg font-semibold text-blue-100 mb-2'>
                  {metric.label}
                </div>
                <div className='text-sm text-blue-200'>
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className='mb-16'>
          <AnimatedText animation='fadeInUp' delay={1.8}>
            <h3 className='text-3xl font-bold text-center mb-12'>
              Recent Achievements & Recognition
            </h3>
          </AnimatedText>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.achievement}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 2.0 + index * 0.2, duration: 0.6 }}
                className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='text-2xl font-bold text-blue-400'>
                    {achievement.year}
                  </div>
                  <Award className='h-6 w-6 text-yellow-400' />
                </div>
                <h4 className='text-xl font-bold text-white mb-2'>
                  {achievement.achievement}
                </h4>
                <div className='text-blue-200 font-medium mb-2'>
                  {achievement.organization}
                </div>
                <p className='text-blue-100 text-sm'>
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center'>
          <AnimatedText animation='fadeInUp' delay={2.6}>
            <h3 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to Join Our Success Stories?
            </h3>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={2.8}>
            <p className='text-xl text-blue-100 mb-8 max-w-3xl mx-auto'>
              Let us help you achieve similar results with our proven
              methodology and expert team of IT professionals.
            </p>
          </AnimatedText>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 3.0, duration: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <button
              onClick={() => (window.location.href = '/contact')}
              className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center'
            >
              <TrendingUp className='mr-2 h-5 w-5' />
              Start Your Success Story
            </button>
            <button
              onClick={() => (window.location.href = '/case-studies')}
              className='border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center'
            >
              <Award className='mr-2 h-5 w-5' />
              View Case Studies
            </button>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

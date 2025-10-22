'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedText } from './'
import { useResponsive } from '@/lib/breakpoints'
import {
  Calendar,
  Users,
  Award,
  Rocket,
  Building,
  Globe,
  Target,
  Star,
} from 'lucide-react'

interface TimelineProps {
  className?: string
}

/**
 * Timeline Component
 *
 * An animated timeline that tells the company's story and journey
 * with key milestones and achievements
 */
export function Timeline({ className = '' }: TimelineProps) {
  const { isMobile } = useResponsive()

  const milestones = [
    {
      year: '2014',
      title: 'The Beginning',
      description:
        'Founded with a vision to transform businesses through innovative IT solutions',
      icon: <Building className='h-6 w-6 text-blue-500' />,
      achievements: [
        'Company founded by industry veterans',
        'First office in Toronto',
        'Initial team of 5 employees',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      year: '2016',
      title: 'First Major Success',
      description:
        'Delivered our first enterprise-scale project, establishing our reputation for excellence',
      icon: <Target className='h-6 w-6 text-green-500' />,
      achievements: [
        'First Fortune 500 client',
        'Team expanded to 25 employees',
        'Revenue reached $1M',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      year: '2018',
      title: 'Rapid Expansion',
      description:
        'Opened offices across Canada and built partnerships with leading technology providers',
      icon: <Globe className='h-6 w-6 text-purple-500' />,
      achievements: [
        'Expanded to 3 Canadian cities',
        'Partnership with Microsoft and AWS',
        'Team grew to 50+ professionals',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      year: '2020',
      title: 'Digital Transformation Leader',
      description:
        'Became a recognized leader in digital transformation, helping businesses adapt to remote work',
      icon: <Rocket className='h-6 w-6 text-orange-500' />,
      achievements: [
        'Pandemic response solutions',
        'Remote work infrastructure',
        '100+ successful projects',
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      year: '2022',
      title: 'Industry Recognition',
      description:
        'Received multiple awards and recognition for our innovative solutions and client satisfaction',
      icon: <Award className='h-6 w-6 text-yellow-500' />,
      achievements: [
        'Best IT Consulting Firm Award',
        'Client Satisfaction Excellence',
        '500+ successful projects',
      ],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      year: '2024',
      title: 'Future Forward',
      description:
        'Leading the industry with cutting-edge AI and cloud solutions, setting new standards for excellence',
      icon: <Star className='h-6 w-6 text-indigo-500' />,
      achievements: [
        'AI-powered solutions',
        'Cloud-first architecture',
        '500+ happy clients',
      ],
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  const stats = [
    { label: 'Years of Excellence', value: '10+' },
    { label: 'Projects Delivered', value: '500+' },
    { label: 'Happy Clients', value: '500+' },
    { label: 'Team Members', value: '50+' },
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
              Our <span className='text-blue-600'>Journey</span> of Excellence
            </h2>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={0.6}>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              From a small startup to a leading IT consulting firm, discover the
              milestones that shaped our success and our clients'
              transformations.
            </p>
          </AnimatedText>
        </div>

        {/* Timeline */}
        <div className='relative'>
          {/* Timeline Line */}
          <div className='hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-green-200 via-purple-200 via-orange-200 via-yellow-200 to-indigo-200 transform -translate-x-1/2'></div>

          <div className='space-y-12 lg:space-y-16'>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full lg:w-5/12 ${
                    index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'
                  }`}
                >
                  <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
                    {/* Year Badge */}
                    <div className='flex items-center mb-4'>
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}
                      >
                        {milestone.year}
                      </div>
                      <div className='w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center'>
                        {milestone.icon}
                      </div>
                    </div>

                    <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                      {milestone.title}
                    </h3>
                    <p className='text-gray-600 mb-4 leading-relaxed'>
                      {milestone.description}
                    </p>

                    {/* Achievements */}
                    <div className='space-y-2'>
                      {milestone.achievements.map(
                        (achievement, achievementIndex) => (
                          <motion.div
                            key={achievement}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                              delay: index * 0.2 + 0.3 + achievementIndex * 0.1,
                              duration: 0.4,
                            }}
                            className='flex items-center'
                          >
                            <div className='w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0'></div>
                            <span className='text-sm text-gray-600'>
                              {achievement}
                            </span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className='hidden lg:block w-2/12 flex justify-center'>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                    className={`w-6 h-6 bg-gradient-to-r ${milestone.color} rounded-full shadow-lg border-4 border-white`}
                  ></motion.div>
                </div>

                {/* Spacer for mobile */}
                <div className='lg:hidden w-full'></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className='mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12'>
          <AnimatedText animation='fadeInUp' delay={1.2}>
            <h3 className='text-3xl font-bold text-center text-gray-900 mb-12'>
              Our Impact in Numbers
            </h3>
          </AnimatedText>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className='text-center'
              >
                <div className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>
                  {stat.value}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className='mt-16 text-center'>
          <AnimatedText animation='fadeInUp' delay={1.6}>
            <h3 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
              Looking to the Future
            </h3>
          </AnimatedText>
          <AnimatedText animation='fadeInUp' delay={1.8}>
            <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed'>
              As we continue to grow and innovate, we remain committed to
              helping businesses transform through cutting-edge technology and
              exceptional service.
            </p>
          </AnimatedText>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <button
              onClick={() => (window.location.href = '/about')}
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center'
            >
              <Users className='mr-2 h-5 w-5' />
              Learn More About Us
            </button>
            <button
              onClick={() => (window.location.href = '/contact')}
              className='border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 flex items-center justify-center'
            >
              <Rocket className='mr-2 h-5 w-5' />
              Start Your Journey
            </button>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

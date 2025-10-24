'use client'

import { motion } from 'framer-motion'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn, SlideIn } from '@/components/animations'
import {
  ProfessionalGraphic,
  TechIcon,
  AchievementBadge,
  QualitySeal,
} from '@/components/ui/professional-graphic'
import {
  Award,
  Shield,
  Users,
  Star,
  CheckCircle,
  Globe,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Award as CertificationIcon,
  Building2,
} from 'lucide-react'

interface CredibilitySectionProps {
  title?: string
  description?: string
  className?: string
}

export function CredibilitySection({
  title = 'Why Choose Best IT Consulting',
  description = "Our track record speaks for itself. Here's what sets us apart in the competitive software development landscape.",
  className,
}: CredibilitySectionProps) {
  const achievements = [
    {
      icon: Users,
      number: '500+',
      label: 'Happy Clients',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Satisfied customers worldwide',
    },
    {
      icon: Star,
      number: '4.9',
      label: 'Average Rating',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Based on client feedback',
    },
    {
      icon: CheckCircle,
      number: '98%',
      label: 'Success Rate',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Project delivery success',
    },
    {
      icon: Globe,
      number: '50+',
      label: 'Countries',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Global presence',
    },
  ]

  const certifications = [
    {
      name: 'ISO 9001:2015',
      description: 'Quality Management System',
      icon: Shield,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'ISO 27001:2013',
      description: 'Information Security Management',
      icon: Shield,
      gradient: 'from-green-500 to-teal-600',
    },
    {
      name: 'AWS Partner',
      description: 'Certified Cloud Solutions',
      icon: Zap,
      gradient: 'from-orange-500 to-yellow-500',
    },
    {
      name: 'Microsoft Gold',
      description: 'Certified Development Partner',
      icon: Award,
      gradient: 'from-blue-600 to-purple-600',
    },
  ]

  const expertise = [
    {
      title: '10+ Years Experience',
      description: 'Proven track record in software development',
      icon: Clock,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'Agile Methodology',
      description: 'Flexible and efficient development process',
      icon: Target,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock technical assistance',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Scalable Solutions',
      description: 'Built to grow with your business',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section
      className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}
    >
      <div className='container mx-auto px-4'>
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <div className='text-center mb-16'>
            <FadeIn delay={0.2} duration={0.6}>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>{title}</h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                {description}
              </p>
            </FadeIn>
          </div>
        </ScrollTrigger>

        {/* Achievements Grid */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <div className='mb-16'>
            <h3 className='text-2xl font-semibold text-center mb-8 text-gray-800'>
              Our Achievements
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {achievements.map((achievement, index) => (
                <SlideIn
                  key={index}
                  direction='up'
                  delay={0.2 + index * 0.1}
                  duration={0.6}
                >
                  <div className='text-center group'>
                    <div className='mb-4'>
                      <TechIcon
                        icon={achievement.icon}
                        size='lg'
                        gradient={achievement.gradient}
                        className='mx-auto'
                      />
                    </div>
                    <div className='text-3xl font-bold text-gray-900 mb-2'>
                      {achievement.number}
                    </div>
                    <div className='text-lg font-semibold text-gray-700 mb-1'>
                      {achievement.label}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {achievement.description}
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </ScrollTrigger>

        {/* Certifications */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <div className='mb-16'>
            <h3 className='text-2xl font-semibold text-center mb-8 text-gray-800'>
              Certifications & Partnerships
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {certifications.map((cert, index) => (
                <SlideIn
                  key={index}
                  direction='up'
                  delay={0.2 + index * 0.1}
                  duration={0.6}
                >
                  <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-center mb-4'>
                      <TechIcon
                        icon={cert.icon}
                        size='md'
                        gradient={cert.gradient}
                        className='mr-3'
                      />
                      <div>
                        <h4 className='font-semibold text-gray-900'>
                          {cert.name}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </ScrollTrigger>

        {/* Expertise Areas */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <div>
            <h3 className='text-2xl font-semibold text-center mb-8 text-gray-800'>
              Our Expertise
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {expertise.map((item, index) => (
                <SlideIn
                  key={index}
                  direction='up'
                  delay={0.2 + index * 0.1}
                  duration={0.6}
                >
                  <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group'>
                    <div className='flex items-start mb-4'>
                      <TechIcon
                        icon={item.icon}
                        size='md'
                        gradient={item.gradient}
                        className='mr-3 flex-shrink-0'
                      />
                      <div>
                        <h4 className='font-semibold text-gray-900 mb-2'>
                          {item.title}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  )
}

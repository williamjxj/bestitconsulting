/**
 * ServicesSection component with animated service cards
 * Displays services with professional animations and hover effects
 */

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { ScaleIn } from '@/components/animations/ScaleIn'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'

interface Service {
  id: string
  title: string
  description: string
  icon: ReactNode
  features: string[]
  color: string
}

interface ServicesSectionProps {
  services?: Service[]
  title?: string
  description?: string
  className?: string
}

const defaultServices: Service[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description:
      'End-to-end web and mobile applications built with modern technologies.',
    icon: (
      <svg
        className='h-8 w-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
        />
      </svg>
    ),
    features: [
      'React/Next.js',
      'Node.js/Express',
      'Database Design',
      'API Development',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description:
      'Scalable cloud architecture and deployment for maximum performance.',
    icon: (
      <svg
        className='h-8 w-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
        />
      </svg>
    ),
    features: [
      'AWS/Azure/GCP',
      'Docker/Kubernetes',
      'CI/CD Pipelines',
      'Monitoring',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description:
      'Comprehensive security solutions to protect your digital assets.',
    icon: (
      <svg
        className='h-8 w-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
        />
      </svg>
    ),
    features: [
      'Security Audits',
      'Penetration Testing',
      'Compliance',
      'Incident Response',
    ],
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'team',
    title: 'Team Augmentation',
    description: 'Expert developers to accelerate your project delivery.',
    icon: (
      <svg
        className='h-8 w-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        />
      </svg>
    ),
    features: [
      'Dedicated Teams',
      'Project Management',
      'Code Reviews',
      'Mentoring',
    ],
    color: 'from-purple-500 to-indigo-500',
  },
]

export function ServicesSection({
  services = defaultServices,
  title = 'Our Services',
  description = 'Comprehensive IT solutions tailored to your business needs',
  className = '',
}: ServicesSectionProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className='container mx-auto px-4'>
        <FadeIn delay={0.2} duration={0.8}>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {description}
            </p>
          </div>
        </FadeIn>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {services.map((service, index) => (
            <ScaleIn
              key={service.id}
              delay={0.4 + index * 0.1}
              duration={0.6}
              className='h-full'
            >
              <Card
                className='group h-full hover:shadow-xl transition-all duration-300'
                animated={!reducedMotion}
                hover={deviceType !== 'mobile'}
              >
                <CardHeader>
                  <div className='flex items-center gap-4 mb-4'>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} p-0.5`}
                    >
                      <div className='w-full h-full bg-background rounded-lg flex items-center justify-center text-foreground'>
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle className='text-xl'>{service.title}</CardTitle>
                  </div>
                  <CardDescription className='text-base'>
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className='space-y-2'>
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className='flex items-center gap-2 text-sm text-muted-foreground'
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.1 + featureIndex * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <div className='w-1.5 h-1.5 rounded-full bg-primary' />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScaleIn>
          ))}
        </div>

        <FadeIn delay={1.0} duration={0.8}>
          <div className='text-center mt-12'>
            <motion.div
              className='inline-flex items-center gap-2 text-primary font-medium'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span>Learn more about our services</span>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

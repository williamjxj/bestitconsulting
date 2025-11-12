/**
 * ServicesSection component with animated service cards
 * Displays services with professional animations and hover effects
 */

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import {
  Brain,
  Code2,
  Cloud,
  Users,
  Server,
  BarChart2,
  Shield,
  CheckCircle2,
} from 'lucide-react'
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
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  icon: ReactNode
  features: string[]
  color: string
  hoverGradient: string
  iconGradient: string
}

interface ServicesSectionProps {
  services?: Service[]
  title?: string
  description?: string
  className?: string
}

const defaultServices: Service[] = [
  {
    id: 'ai-integration',
    title: 'AI Integration & Modernization',
    description:
      'Bring AI into current systems and upgrade legacy systems with cutting-edge AI technologies.',
    icon: <Brain className='h-8 w-8 text-white' />,
    features: [
      'Legacy System Assessment',
      'AI Strategy & Roadmap',
      'LLM/Agent Integration, RAG',
      'Automation & Orchestration',
      'Data Pipeline Modernization',
      'LLM localization and customization',
    ],
    color: 'from-purple-500 to-pink-500',
    hoverGradient: 'from-purple-50 to-pink-50',
    iconGradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description:
      'End-to-end web and mobile application development using modern technologies and best practices.',
    icon: <Code2 className='h-8 w-8 text-white' />,
    features: [
      'Frontend (React, Next.js, Tailwind CSS, Shadcn/UI)',
      'Backend (Node.js, Python, Express, FastAPI)',
      'Database Design & Optimization',
      'API Development & Integration',
      'Performance Optimization',
      'Code Review & QA',
    ],
    color: 'from-blue-500 to-cyan-500',
    hoverGradient: 'from-blue-50 to-cyan-50',
    iconGradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description:
      'Scalable cloud architecture and deployment solutions for modern applications.',
    icon: <Cloud className='h-8 w-8 text-white' />,
    features: [
      'Cloud Migration Strategy',
      'Serverless Architecture',
      'Container Orchestration',
      'Auto-scaling Solutions',
      'Monitoring & Logging',
      'Cost Optimization',
    ],
    color: 'from-sky-500 to-blue-500',
    hoverGradient: 'from-sky-50 to-blue-50',
    iconGradient: 'from-sky-500 to-blue-500',
  },
  {
    id: 'team',
    title: 'Team Augmentation',
    description:
      'Dedicated development teams to scale your projects and accelerate delivery.',
    icon: <Users className='h-8 w-8 text-white' />,
    features: [
      'Skilled Developer Teams',
      'Project Management',
      'Agile Methodologies',
      '24/7 Development Coverage',
      'Quality Assurance',
      'Knowledge Transfer',
    ],
    color: 'from-green-500 to-emerald-500',
    hoverGradient: 'from-green-50 to-emerald-50',
    iconGradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    description:
      'Streamlined development workflows and robust infrastructure management.',
    icon: <Server className='h-8 w-8 text-white' />,
    features: [
      'CI/CD Pipeline Setup',
      'Infrastructure as Code',
      'Monitoring & Alerting',
      'Security & Compliance',
      'Performance Tuning',
      'Disaster Recovery',
    ],
    color: 'from-emerald-500 to-teal-500',
    hoverGradient: 'from-emerald-50 to-teal-50',
    iconGradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    description:
      'Data-driven insights and analytics solutions for your business.',
    icon: <BarChart2 className='h-8 w-8 text-white' />,
    features: [
      'Data Warehousing',
      'Business Intelligence',
      'Big Data Processing',
      'Machine Learning',
      'Data Visualization',
      'Predictive Analytics',
    ],
    color: 'from-amber-500 to-orange-600',
    hoverGradient: 'from-amber-50 to-orange-50',
    iconGradient: 'from-amber-500 to-orange-500',
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

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <ScaleIn
              key={service.id}
              delay={0.4 + index * 0.1}
              duration={0.6}
              className='h-full'
            >
              <div className='group h-full'>
                <div
                  className={cn(
                    'rounded-xl text-card-foreground h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 relative overflow-hidden',
                    `before:absolute before:inset-0 before:bg-gradient-to-br ${service.hoverGradient} before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 before:z-0`
                  )}
                >
                  <div className='relative z-10'>
                    <div className='flex flex-col space-y-1.5 p-6 pb-4'>
                      <div className='flex items-center mb-4'>
                        <div
                          className={cn(
                            'p-3 rounded-2xl bg-gradient-to-r',
                            service.iconGradient,
                            'shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3'
                          )}
                        >
                          {service.icon}
                        </div>
                        <div className='ml-4 flex-1'>
                          <CardTitle className='tracking-tight text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>
                            {service.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                    <div className='p-6 pt-0'>
                      <CardDescription className='text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                        {service.description}
                      </CardDescription>
                      <ul className='space-y-3'>
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className='flex items-start'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.6 + index * 0.1 + featureIndex * 0.05,
                              duration: 0.3,
                            }}
                          >
                            <div className='flex-shrink-0 mr-3 mt-0.5'>
                              <CheckCircle2 className='w-5 h-5 text-green-500' />
                            </div>
                            <span className='text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300'>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>

        <FadeIn delay={1.0} duration={0.8}>
          <div className='text-center mt-12'>
            <Link href='/contact?title=Learn%20more%20about%20our%20services#contact-form'>
              <motion.div
                className='inline-flex items-center gap-2 text-primary font-medium cursor-pointer hover:text-primary/80 transition-colors duration-200'
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
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

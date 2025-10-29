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
    id: 'ai-integration',
    title: 'AI Integration & Modernization',
    description:
      'Bring AI into current systems and upgrade legacy systems with cutting-edge AI technologies.',
    icon: <Brain className='h-8 w-8' />,
    features: [
      'Legacy System Assessment',
      'AI Strategy & Roadmap',
      'LLM/Agent Integration',
      'Automation & Orchestration',
      'Data Pipeline Modernization',
      'Model Evaluation & Monitoring',
    ],
    color: 'from-fuchsia-500 to-purple-500',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description:
      'End-to-end web and mobile application development using modern technologies and best practices.',
    icon: <Code2 className='h-8 w-8' />,
    features: [
      'Frontend (React, Vue, Angular)',
      'Backend (Node.js, Python, Java)',
      'Database Design & Optimization',
      'API Development & Integration',
      'Performance Optimization',
      'Code Review & QA',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description:
      'Scalable cloud architecture and deployment solutions for modern applications.',
    icon: <Cloud className='h-8 w-8' />,
    features: [
      'Cloud Migration Strategy',
      'Serverless Architecture',
      'Container Orchestration',
      'Auto-scaling Solutions',
      'Monitoring & Logging',
      'Cost Optimization',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'team',
    title: 'Team Augmentation',
    description:
      'Dedicated development teams to scale your projects and accelerate delivery.',
    icon: <Users className='h-8 w-8' />,
    features: [
      'Skilled Developer Teams',
      'Project Management',
      'Agile Methodologies',
      '24/7 Development Coverage',
      'Quality Assurance',
      'Knowledge Transfer',
    ],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    description:
      'Streamlined development workflows and robust infrastructure management.',
    icon: <Server className='h-8 w-8' />,
    features: [
      'CI/CD Pipeline Setup',
      'Infrastructure as Code',
      'Monitoring & Alerting',
      'Security & Compliance',
      'Performance Tuning',
      'Disaster Recovery',
    ],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    description:
      'Data-driven insights and analytics solutions for your business.',
    icon: <BarChart2 className='h-8 w-8' />,
    features: [
      'Data Warehousing',
      'Business Intelligence',
      'Big Data Processing',
      'Machine Learning',
      'Data Visualization',
      'Predictive Analytics',
    ],
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description:
      'Comprehensive security solutions to protect your digital assets.',
    icon: <Shield className='h-8 w-8' />,
    features: [
      'Security Audits',
      'Penetration Testing',
      'Compliance Management',
      'Threat Detection & Response',
    ],
    color: 'from-red-500 to-pink-500',
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
                className='group h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white'
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

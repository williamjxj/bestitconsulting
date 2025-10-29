/**
 * PortfolioSection component with interactive project showcase
 * Displays portfolio projects with engaging animations and interactions
 */

'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { ScaleIn } from '@/components/animations/ScaleIn'
import { useReducedMotion } from '@/hooks/useAccessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { MasonryGrid } from '@/components/portfolio/MasonryGrid'
import { ResponsiveGrid } from '@/components/portfolio/ResponsiveGrid'
import { GridAnimations } from '@/components/portfolio/GridAnimations'
import { ScrollGridReveal } from '@/components/portfolio/ScrollGridReveal'
import { InteractiveLightbox } from '@/components/portfolio/InteractiveLightbox'
import { ImageZoom } from '@/components/portfolio/ImageZoom'
import { GalleryNavigation } from '@/components/portfolio/GalleryNavigation'
import { CardExpansion } from '@/components/portfolio/CardExpansion'
import { AnimatedFilter } from '@/components/portfolio/AnimatedFilter'
import { StaggerFilter } from '@/components/portfolio/StaggerFilter'
import { FilterTransitions } from '@/components/portfolio/FilterTransitions'
import { FilterLoading } from '@/components/portfolio/FilterLoading'
import { GalleryLoading } from '@/components/portfolio/GalleryLoading'
import { CardLoading } from '@/components/portfolio/CardLoading'
import { CardInteractions } from '@/components/portfolio/CardInteractions'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  link?: string
  github?: string
  featured?: boolean
}

interface PortfolioSectionProps {
  projects?: Project[]
  title?: string
  description?: string
  className?: string
}

const defaultProjects: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with advanced features and modern design.',
    image: '/api/placeholder/400/300',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web Development',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 'mobile-app',
    title: 'Mobile Banking App',
    description:
      'Secure mobile banking application with biometric authentication.',
    image: '/api/placeholder/400/300',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
    category: 'Mobile Development',
    link: '#',
    featured: true,
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description:
      'Real-time analytics dashboard with interactive data visualization.',
    image: '/api/placeholder/400/300',
    technologies: ['Vue.js', 'Python', 'D3.js', 'Docker'],
    category: 'Data Visualization',
    link: '#',
  },
  {
    id: 'api-platform',
    title: 'API Management Platform',
    description: 'Comprehensive API management and monitoring platform.',
    image: '/api/placeholder/400/300',
    technologies: ['Next.js', 'TypeScript', 'Redis', 'Kubernetes'],
    category: 'Backend Development',
    link: '#',
    github: '#',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Support',
    description:
      'Intelligent chatbot with natural language processing capabilities.',
    image: '/api/placeholder/400/300',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'OpenAI'],
    category: 'AI/ML',
    link: '#',
  },
]

export function PortfolioSection({
  projects = defaultProjects,
  title = 'Our Portfolio',
  description = 'Showcasing our latest projects and technical expertise',
  className = '',
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  const categories = [
    'All',
    ...Array.from(new Set(projects.map(p => p.category))),
  ]
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p => p.category === selectedCategory)

  return (
    <section className={`py-20 bg-muted/30 ${className}`}>
      <div className='container mx-auto px-4'>
        <FadeIn delay={0.2} duration={0.8}>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {description}
            </p>
          </div>
        </FadeIn>

        <AnimatedFilter
          filters={categories.map(category => ({
            id: category.toLowerCase().replace(/\s+/g, '-'),
            label: category,
            value: category,
          }))}
          activeFilter={selectedCategory}
          onFilterChange={setSelectedCategory}
          className='mb-12'
        >
          {filteredProjects.map((project, index) => (
            <CardInteractions
              key={project.id}
              project={project}
              index={index}
              className='h-full'
            >
              <Card
                className='group h-full overflow-hidden hover:shadow-xl transition-all duration-300'
                animated={!reducedMotion}
                hover={deviceType !== 'mobile'}
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  {project.featured && (
                    <div className='absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium'>
                      Featured
                    </div>
                  )}
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
                </div>

                <CardHeader>
                  <div className='flex items-center justify-between mb-2'>
                    <CardTitle className='text-xl'>{project.title}</CardTitle>
                    <span className='text-sm text-muted-foreground bg-muted px-2 py-1 rounded'>
                      {project.category}
                    </span>
                  </div>
                  <CardDescription className='text-base'>
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className='text-xs bg-muted px-2 py-1 rounded'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.8 + index * 0.1 + techIndex * 0.05,
                          duration: 0.3,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className='flex gap-2'>
                    {project.link && (
                      <Button size='sm' variant='outline' asChild>
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          View Project
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button size='sm' variant='ghost' asChild>
                        <a
                          href={project.github}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                          </svg>
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardInteractions>
          ))}
        </AnimatedFilter>

        <FadeIn delay={1.2} duration={0.8}>
          <div className='text-center mt-12'>
            <Button size='lg' asChild>
              <a href='/portfolio'>
                View All Projects
                <svg
                  className='w-4 h-4 ml-2'
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
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

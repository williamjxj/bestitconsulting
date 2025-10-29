/**
 * PortfolioSection component with interactive project showcase
 * Displays portfolio projects with engaging animations and interactions
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  CheckCircle,
  ArrowRight,
  Monitor,
  Shield,
  TrendingUp,
  Smartphone,
  Cloud,
  Zap,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  image2?: string
  technologies: string[]
  category: string
  link?: string
  github?: string
  featured?: boolean
  client?: string
  results?: string[]
  features?: string[]
  icon?: React.ReactNode
  gradient?: string
  industry?: string
  benefits?: string[]
}

interface PortfolioSectionProps {
  projects?: Project[]
  title?: string
  description?: string
  className?: string
}

// Helper function to get R2 URL safely
function getR2ImageUrl(imagePath: string): string {
  try {
    const base = process.env.NEXT_PUBLIC_R2_BASE_URL
    if (base) return `${base}/${imagePath}`
  } catch {
    // Fallback to placeholder if R2 is not configured
    return '/api/placeholder/400/300'
  }
  // Fallback when no base configured
  return '/api/placeholder/400/300'
}

const defaultProjects: Project[] = [
  {
    id: 'legacy-modernization',
    title: 'Legacy System Modernization',
    client: 'Enterprise Clients',
    description:
      'Modernize your legacy enterprise software with AI-driven solutions. Reduce operational costs, enhance efficiency, and unlock new opportunities for innovation. Transform outdated systems into intelligent, future-ready platforms that power business growth.',
    image: getR2ImageUrl('portfolio/g-01.jpg'),
    image2: getR2ImageUrl('portfolio/g-02.jpg'),
    technologies: [
      'AI/ML',
      'Cloud Migration',
      'Microservices',
      'API Integration',
    ],
    category: 'Digital Transformation',
    industry: 'Enterprise',
    results: [
      '60% reduction in operational costs',
      '80% improvement in system performance',
      '100% data migration success rate',
      'Zero downtime during transition',
    ],
    features: [
      'AI-powered process automation',
      'Cloud-native architecture',
      'Real-time data synchronization',
      'Legacy system integration',
      'Advanced security protocols',
      'Scalable microservices design',
    ],
    icon: <Zap className='h-6 w-6' />,
    gradient: 'from-purple-500 to-indigo-500',
    link: '#',
    featured: true,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with advanced features and modern design.',
    image: getR2ImageUrl('portfolio/g-11.jpg'),
    image2: getR2ImageUrl('portfolio/g-12.jpg'),
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
    image: getR2ImageUrl('portfolio/g-21.jpg'),
    image2: getR2ImageUrl('portfolio/g-22.jpg'),
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
    image: getR2ImageUrl('portfolio/g-31.jpg'),
    image2: getR2ImageUrl('portfolio/g-32.jpg'),
    technologies: ['Vue.js', 'Python', 'D3.js', 'Docker'],
    category: 'Data Visualization',
    link: '#',
  },
  {
    id: 'api-platform',
    title: 'API Management Platform',
    description: 'Comprehensive API management and monitoring platform.',
    image: getR2ImageUrl('portfolio/g-41.jpg'),
    image2: getR2ImageUrl('portfolio/g-42.jpg'),
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
    image: getR2ImageUrl('portfolio/g-51.jpg'),
    image2: getR2ImageUrl('portfolio/g-52.jpg'),
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'OpenAI'],
    category: 'AI/ML',
    link: '#',
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    client: 'Online Retail Chain',
    description:
      'A comprehensive e-commerce solution with advanced inventory management, payment processing, and real-time analytics. Built for scalability to handle millions of transactions.',
    image: getR2ImageUrl('portfolio/g-61.jpg'),
    image2: getR2ImageUrl('portfolio/g-62.jpg'),
    technologies: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Stripe',
      'Redis',
      'AWS',
    ],
    category: 'Web Application',
    industry: 'Retail',
    results: [
      '40% increase in conversion rates',
      '60% improvement in page load speed',
      '500K+ users served monthly',
      '99.9% uptime achieved',
    ],
    features: [
      'Multi-vendor marketplace',
      'Real-time inventory tracking',
      'Advanced search & filtering',
      'Mobile-responsive design',
      'Integrated payment gateway',
      'Admin dashboard with analytics',
    ],
    icon: <Monitor className='h-6 w-6' />,
    gradient: 'from-blue-500 to-cyan-500',
    link: '#',
  },
  {
    id: 'healthcare-management',
    title: 'Healthcare Management System',
    client: 'Regional Healthcare Provider',
    description:
      'HIPAA-compliant patient management system with appointment scheduling, electronic health records, and telemedicine capabilities.',
    image: getR2ImageUrl('portfolio/g-71.jpg'),
    image2: getR2ImageUrl('portfolio/g-72.jpg'),
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Socket.io',
      'Docker',
      'Azure',
    ],
    category: 'Healthcare Software',
    industry: 'Healthcare',
    results: [
      '30% reduction in appointment no-shows',
      '50% faster patient check-in process',
      '25% increase in patient satisfaction',
      '100% HIPAA compliance achieved',
    ],
    features: [
      'Patient portal with secure messaging',
      'Telemedicine video consultations',
      'Electronic health records (EHR)',
      'Appointment scheduling system',
      'Prescription management',
      'Insurance claim processing',
    ],
    icon: <Shield className='h-6 w-6' />,
    gradient: 'from-green-500 to-emerald-500',
    link: '#',
  },
  {
    id: 'financial-analytics',
    title: 'Financial Analytics Dashboard',
    client: 'Investment Firm',
    description:
      'Real-time financial data visualization platform with advanced analytics, portfolio tracking, and automated reporting capabilities.',
    image: getR2ImageUrl('portfolio/g-81.jpg'),
    image2: getR2ImageUrl('portfolio/g-82.jpg'),
    technologies: [
      'Vue.js',
      'Python',
      'Django',
      'PostgreSQL',
      'Redis',
      'D3.js',
      'AWS',
    ],
    category: 'Data Visualization',
    industry: 'Finance',
    results: [
      '70% faster data processing',
      '90% reduction in report generation time',
      '45% improvement in decision-making speed',
      '$2M+ in cost savings annually',
    ],
    features: [
      'Real-time market data integration',
      'Interactive charts and graphs',
      'Portfolio performance tracking',
      'Risk assessment algorithms',
      'Automated compliance reporting',
      'Multi-currency support',
    ],
    icon: <TrendingUp className='h-6 w-6' />,
    gradient: 'from-purple-500 to-pink-500',
    link: '#',
  },
  {
    id: 'iot-fleet-management',
    title: 'IoT Fleet Management',
    client: 'Logistics Company',
    description:
      'IoT-powered fleet management system with real-time vehicle tracking, predictive maintenance, and route optimization.',
    image: getR2ImageUrl('portfolio/g-91.jpg'),
    image2: getR2ImageUrl('portfolio/g-92.jpg'),
    technologies: [
      'React Native',
      'Node.js',
      'IoT Sensors',
      'MongoDB',
      'GraphQL',
      'AWS IoT',
      'Machine Learning',
    ],
    category: 'IoT Application',
    industry: 'Transportation',
    results: [
      '35% reduction in fuel costs',
      '50% decrease in maintenance expenses',
      '25% improvement in delivery times',
      '99.5% vehicle uptime achieved',
    ],
    features: [
      'Real-time GPS tracking',
      'Predictive maintenance alerts',
      'Route optimization algorithms',
      'Driver behavior monitoring',
      'Fuel consumption analytics',
      'Mobile driver app',
    ],
    icon: <Smartphone className='h-6 w-6' />,
    gradient: 'from-orange-500 to-red-500',
    link: '#',
  },
  {
    id: 'cloud-migration-platform',
    title: 'Cloud Migration Platform',
    client: 'Manufacturing Enterprise',
    description:
      'Enterprise-grade cloud migration platform with automated workload assessment, migration planning, and monitoring.',
    image: getR2ImageUrl('portfolio/g-101.jpg'),
    image2: getR2ImageUrl('portfolio/g-102.jpg'),
    technologies: [
      'Angular',
      'Spring Boot',
      'Java',
      'MySQL',
      'Kubernetes',
      'Docker',
      'Google Cloud',
    ],
    category: 'Cloud Platform',
    industry: 'Manufacturing',
    results: [
      '60% reduction in infrastructure costs',
      '80% improvement in system reliability',
      '40% faster deployment cycles',
      'Zero-downtime migration achieved',
    ],
    features: [
      'Automated workload discovery',
      'Migration planning dashboard',
      'Cost optimization recommendations',
      'Security compliance monitoring',
      'Performance analytics',
      'Multi-cloud support',
    ],
    icon: <Cloud className='h-6 w-6' />,
    gradient: 'from-indigo-500 to-blue-500',
    link: '#',
  },
  {
    id: 'ai-customer-service',
    title: 'AI-Powered Customer Service',
    client: 'Telecommunications Company',
    description:
      'Intelligent customer service platform with AI chatbots, sentiment analysis, and automated ticket routing.',
    image: getR2ImageUrl('portfolio/g-111.jpg'),
    image2: getR2ImageUrl('portfolio/g-112.jpg'),
    technologies: [
      'Next.js',
      'Python',
      'TensorFlow',
      'Natural Language Processing',
      'Redis',
      'PostgreSQL',
      'AWS',
    ],
    category: 'AI Application',
    industry: 'Telecommunications',
    results: [
      '75% reduction in response time',
      '50% decrease in support tickets',
      '90% customer satisfaction rate',
      '24/7 automated support coverage',
    ],
    features: [
      'AI-powered chatbot',
      'Sentiment analysis',
      'Automated ticket routing',
      'Knowledge base integration',
      'Multi-language support',
      'Performance analytics dashboard',
    ],
    icon: <Zap className='h-6 w-6' />,
    gradient: 'from-yellow-500 to-orange-500',
    link: '#',
  },
  {
    id: 'legacy-upgrade-maintenance',
    title: 'Legacy Software Upgrade & Maintenance',
    client: 'Global Enterprise Suite',
    description:
      'Comprehensive modernization and ongoing maintenance of mission-critical legacy systems with minimal disruption and measurable ROI.',
    image: getR2ImageUrl('portfolio/g-121.jpg'),
    image2: getR2ImageUrl('portfolio/g-122.jpg'),
    technologies: ['Java', '.NET', 'PostgreSQL', 'Kubernetes', 'AWS', 'CI/CD'],
    category: 'Modernization',
    industry: 'Enterprise',
    results: [
      'Stability improvements and reduced incidents',
      'Performance boosts with targeted refactors',
      'Smooth cutovers with zero major outages',
    ],
    features: [
      'Strangler-fig migration patterns',
      'Automated test coverage and CI gating',
      '24/7 observability & SLOs',
      'Security hardening & dependency audits',
    ],
    benefits: [
      'Lower TCO via phased migration and optimization',
      'Rapid risk mitigation with progressive rollouts',
      'Future-ready architecture without full rewrites',
    ],
    icon: <Zap className='h-6 w-6' />,
    gradient: 'from-slate-700 to-indigo-600',
    link: '#',
  },
]

// Remove newer duplicates and prefer original items
const dedupedProjects: Project[] = defaultProjects.filter(
  p =>
    ![
      'ecommerce-platform',
      'financial-analytics',
      'ai-customer-service',
    ].includes(p.id)
)

// Carousel component for project images
function ProjectImageCarousel({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const reducedMotion = useReducedMotion()

  const images = [project.image, project.image2].filter(Boolean)
  const placeholderUrl = '/api/placeholder/400/300'

  useEffect(() => {
    if (images.length <= 1 || reducedMotion || isHovered || imageError) return

    const getRandomInterval = () => Math.random() * 3000 + 5000 // 5-8 seconds

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length)
    }, getRandomInterval())

    return () => clearInterval(interval)
  }, [images.length, reducedMotion, isHovered, imageError])

  // Handle image load error
  const handleImageError = () => {
    setImageError(true)
  }

  // If there's an error or no images, show placeholder
  if (imageError || images.length === 0) {
    return (
      <div className='w-full h-64 rounded-lg overflow-hidden bg-gray-200'>
        <img
          src={placeholderUrl}
          alt={project.title}
          className='w-full h-full object-cover'
        />
      </div>
    )
  }

  if (images.length <= 1) {
    return (
      <div className='w-full h-64 rounded-lg overflow-hidden bg-gray-200'>
        <img
          src={project.image}
          alt={project.title}
          className='w-full h-full object-cover'
          onError={handleImageError}
        />
      </div>
    )
  }

  return (
    <div
      className='relative w-full h-64 rounded-lg overflow-hidden bg-gray-200'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode='wait'>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={project.title}
          className='w-full h-full object-cover'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          onError={handleImageError}
        />
      </AnimatePresence>
    </div>
  )
}

export function PortfolioSection({
  projects = dedupedProjects,
  title = 'Our Portfolio',
  description = 'Showcasing our latest projects and technical expertise',
  className = '',
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const [openProjectId, setOpenProjectId] = useState<string | null>(null)

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

        <div className='flex flex-wrap justify-center gap-2 mb-12'>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProjects.map((project, index) => {
            const displayResults = project.results?.slice(0, 2) || []
            const displayTechs = project.technologies.slice(0, 4)
            const remainingTechs = project.technologies.length - 4

            return (
              <FadeIn
                key={project.id}
                direction='up'
                delay={index * 0.1}
                duration={0.6}
              >
                <Card className='group h-full overflow-hidden rounded-xl bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
                  {/* Header with Icon and Category Tag */}
                  <div className='relative p-4 flex items-start justify-between'>
                    {/* Icon */}
                    {project.icon && (
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                          project.gradient || 'from-blue-500 to-cyan-500'
                        } flex items-center justify-center text-white shadow-md`}
                      >
                        {project.icon}
                      </div>
                    )}
                    {/* Category Tag */}
                    <span className='px-3 py-1 bg-black text-white text-xs font-medium rounded-full'>
                      {project.category}
                    </span>
                  </div>

                  {/* Image */}
                  <div className='relative px-4'>
                    <ProjectImageCarousel project={project} />
                  </div>

                  {/* Industry Tag */}
                  {project.industry && (
                    <div className='px-4 mt-4'>
                      <span className='px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full'>
                        {project.industry}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <CardContent className='p-6 pt-4'>
                    {/* Title and Client */}
                    <div className='mb-3'>
                      <CardTitle className='text-xl font-bold mb-1'>
                        {project.title}
                      </CardTitle>
                      {project.client && (
                        <p className='text-sm text-gray-600'>
                          {project.client}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <CardDescription className='text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3'>
                      {project.description}
                    </CardDescription>

                    {/* Technologies */}
                    <div className='flex flex-wrap items-center gap-2 mb-6'>
                      {displayTechs.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className='px-3 py-1 bg-black text-white text-xs font-medium rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                      {remainingTechs > 0 && (
                        <span className='px-3 py-1 bg-black text-white text-xs font-medium rounded-full'>
                          +{remainingTechs}
                        </span>
                      )}
                    </div>

                    {/* View Case Study Button opens modal */}
                    <Button
                      className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                      onClick={() => setOpenProjectId(project.id)}
                    >
                      View Case Study
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        {/* Centralized Dialog for reliability */}
        <Dialog
          open={!!openProjectId}
          onOpenChange={v => !v && setOpenProjectId(null)}
        >
          <DialogContent className='sm:max-w-xl md:max-w-2xl max-h-[85vh] overflow-y-auto'>
            {(() => {
              const project = projects.find(p => p.id === openProjectId)
              if (!project) return null
              return (
                <>
                  <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                  </DialogHeader>

                  <div className='mb-4 flex items-center gap-2'>
                    {project.industry && (
                      <span className='px-2 py-1 text-xs rounded-full bg-blue-600 text-white'>
                        {project.industry}
                      </span>
                    )}
                    {project.client && (
                      <span className='text-xs text-muted-foreground'>
                        Client: {project.client}
                      </span>
                    )}
                  </div>

                  <p className='text-sm text-gray-700 mb-4'>
                    {project.description}
                  </p>

                  <div className='mb-4'>
                    <h4 className='font-semibold text-sm mb-2'>
                      Why our implementation
                    </h4>
                    <ul className='list-disc pl-5 space-y-1 text-sm text-gray-700'>
                      {(project.benefits && project.benefits.length > 0
                        ? project.benefits
                        : [
                            'Faster time‑to‑value using proven delivery playbooks',
                            'Security-by-default with compliance-ready pipelines',
                            'Performance-first architecture that scales efficiently',
                          ]
                      ).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  {project.results && project.results.length > 0 && (
                    <div className='mb-4'>
                      <h4 className='font-semibold text-sm mb-2'>
                        Key Results
                      </h4>
                      <ul className='space-y-2'>
                        {project.results.map((r, i) => (
                          <li
                            key={i}
                            className='flex items-center gap-2 text-sm'
                          >
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.features && project.features.length > 0 && (
                    <div className='mb-2'>
                      <h4 className='font-semibold text-sm mb-2'>Highlights</h4>
                      <ul className='list-disc pl-5 space-y-1 text-sm text-gray-700'>
                        {project.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )
            })()}
          </DialogContent>
        </Dialog>

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

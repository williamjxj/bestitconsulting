'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  X,
  ExternalLink,
  Github,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react'
import OptimizedImage from './OptimizedImage'

interface InteractivePortfolioGalleryProps extends HTMLMotionProps<'div'> {
  projects: Array<{
    id: string
    title: string
    description: string
    image: string
    category: string
    technologies: string[]
    year: number
    status: 'completed' | 'in-progress' | 'planned'
    featured?: boolean
    liveUrl?: string
    githubUrl?: string
    videoUrl?: string
    gallery?: string[]
  }>
  categories: string[]
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onProjectSelect?: (project: any) => void
  className?: string
}

const InteractivePortfolioGallery: React.FC<
  InteractivePortfolioGalleryProps
> = ({
  projects,
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery = '',
  onSearchChange,
  onProjectSelect,
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'portfolio-gallery',
      name: 'Portfolio Gallery',
      type: 'interaction',
      duration: 600,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-gallery',
        staticFallback: true,
      },
      performance: {
        maxDuration: 600,
        targetFPS: 60,
        memoryLimit: 20,
        gpuAcceleration: true,
      },
    },
    'portfolio-gallery'
  )

  const [selectedProject, setSelectedProject] = React.useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const filteredProjects = projects.filter(project => {
    const matchesCategory =
      !selectedCategory || project.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    onProjectSelect?.(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
    setIsPlaying(false)
  }

  const handleNextImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex(prev => (prev + 1) % selectedProject.gallery.length)
    }
  }

  const handlePreviousImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex(
        prev =>
          (prev - 1 + selectedProject.gallery.length) %
          selectedProject.gallery.length
      )
    }
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...(rest as any)}>
        {/* Filters */}
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={() => onCategoryChange?.('')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !selectedCategory
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => onCategoryChange?.(category)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProjects.map((project: any) => (
            <div
              key={project.id}
              className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
              onClick={() => handleProjectClick(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <div className='flex items-center justify-between mb-2'>
                  <Badge variant='secondary'>{project.category}</Badge>
                  <span className='text-sm text-muted-foreground'>
                    {project.year}
                  </span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>{project.title}</h3>
                <p className='text-muted-foreground mb-4'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-1'>
                  {project.technologies.slice(0, 3).map((tech: string) => (
                    <Badge key={tech} variant='outline' className='text-xs'>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-2xl font-bold'>
                    {selectedProject.title}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className='p-2 hover:bg-gray-100 rounded-full'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className='w-full h-64 object-cover rounded-lg mb-4'
                />
                <p className='text-muted-foreground mb-4'>
                  {selectedProject.description}
                </p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {selectedProject.technologies.map((tech: string) => (
                    <Badge key={tech} variant='secondary'>
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className='flex gap-2'>
                  {selectedProject.liveUrl && (
                    <Button asChild>
                      <a
                        href={selectedProject.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='h-4 w-4 mr-2' />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button variant='outline' asChild>
                      <a
                        href={selectedProject.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github className='h-4 w-4 mr-2' />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        staggerChildren: 0.1,
        ease: optimizedConfig.easing,
      },
    },
  }

  const projectVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: 'easeIn' as const,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`space-y-6 ${className}`}
      {...(rest as any)}
    >
      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex flex-col md:flex-row gap-4 items-center justify-between'
      >
        <div className='flex flex-wrap gap-2'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange?.('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !selectedCategory
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </motion.button>
          {categories.map((category: string, index: number) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange?.(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            type='text'
            placeholder='Search projects...'
            value={searchQuery}
            onChange={e => onSearchChange?.(e.target.value)}
            className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
      </motion.div>

      {/* Projects grid */}
      <motion.div
        variants={containerVariants}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        {filteredProjects.map((project: any, index: number) => (
          <motion.div
            key={project.id}
            variants={projectVariants}
            whileHover='hover'
            onClick={() => handleProjectClick(project)}
            className='group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300'
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Project image */}
            <div className='relative overflow-hidden'>
              <img
                src={project.image}
                alt={project.title}
                className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
              />

              {/* Overlay */}
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                <div className='text-white text-center'>
                  <ExternalLink className='h-8 w-8 mx-auto mb-2' />
                  <p className='text-sm font-medium'>View Details</p>
                </div>
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div className='absolute top-4 left-4'>
                  <Badge className='bg-yellow-400 text-yellow-900'>
                    Featured
                  </Badge>
                </div>
              )}

              {/* Status badge */}
              <div className='absolute top-4 right-4'>
                <Badge
                  variant={
                    project.status === 'completed'
                      ? 'default'
                      : project.status === 'in-progress'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </div>

            {/* Project content */}
            <div className='p-6'>
              <div className='flex items-center justify-between mb-2'>
                <Badge variant='secondary'>{project.category}</Badge>
                <span className='text-sm text-muted-foreground'>
                  {project.year}
                </span>
              </div>

              <h3 className='text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors'>
                {project.title}
              </h3>

              <p className='text-muted-foreground mb-4 line-clamp-2'>
                {project.description}
              </p>

              <div className='flex flex-wrap gap-1'>
                {project.technologies.slice(0, 3).map((tech: string) => (
                  <Badge key={tech} variant='outline' className='text-xs'>
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant='outline' className='text-xs'>
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
          onClick={handleCloseModal}
        >
          <motion.div
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto'
            onClick={e => e.stopPropagation()}
          >
            <div className='p-6'>
              {/* Modal header */}
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h2 className='text-3xl font-bold mb-2'>
                    {selectedProject.title}
                  </h2>
                  <div className='flex items-center gap-4'>
                    <Badge variant='secondary'>
                      {selectedProject.category}
                    </Badge>
                    <span className='text-muted-foreground'>
                      {selectedProject.year}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              {/* Project image gallery */}
              <div className='relative mb-6'>
                <img
                  src={
                    selectedProject.gallery?.[currentImageIndex] ||
                    selectedProject.image
                  }
                  alt={selectedProject.title}
                  className='w-full h-64 object-cover rounded-lg'
                />

                {/* Image navigation */}
                {selectedProject.gallery &&
                  selectedProject.gallery.length > 1 && (
                    <div className='absolute inset-0 flex items-center justify-between p-4'>
                      <button
                        onClick={handlePreviousImage}
                        className='p-2 bg-white/80 rounded-full hover:bg-white transition-colors'
                      >
                        <ChevronLeft className='h-5 w-5' />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className='p-2 bg-white/80 rounded-full hover:bg-white transition-colors'
                      >
                        <ChevronRight className='h-5 w-5' />
                      </button>
                    </div>
                  )}

                {/* Image indicators */}
                {selectedProject.gallery &&
                  selectedProject.gallery.length > 1 && (
                    <div className='flex justify-center gap-2 mt-4'>
                      {selectedProject.gallery.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
              </div>

              {/* Project details */}
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='text-xl font-semibold mb-4'>Description</h3>
                  <p className='text-muted-foreground mb-6'>
                    {selectedProject.description}
                  </p>

                  <h3 className='text-xl font-semibold mb-4'>Technologies</h3>
                  <div className='flex flex-wrap gap-2'>
                    {selectedProject.technologies.map((tech: string) => (
                      <Badge key={tech} variant='secondary'>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-semibold mb-4'>Links</h3>
                  <div className='space-y-3'>
                    {selectedProject.liveUrl && (
                      <Button asChild className='w-full'>
                        <a
                          href={selectedProject.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='h-4 w-4 mr-2' />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button variant='outline' asChild className='w-full'>
                        <a
                          href={selectedProject.githubUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Github className='h-4 w-4 mr-2' />
                          GitHub Repository
                        </a>
                      </Button>
                    )}
                    {selectedProject.videoUrl && (
                      <Button variant='outline' asChild className='w-full'>
                        <a
                          href={selectedProject.videoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Play className='h-4 w-4 mr-2' />
                          Watch Video
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default InteractivePortfolioGallery

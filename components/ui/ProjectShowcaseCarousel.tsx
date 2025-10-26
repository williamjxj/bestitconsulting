'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, HTMLMotionProps, useAnimation } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  Github,
  Eye,
  Calendar,
  Star,
  TrendingUp,
} from 'lucide-react'

interface ProjectShowcaseCarouselProps extends HTMLMotionProps<'div'> {
  projects: Array<{
    id: string
    title: string
    description: string
    image: string
    alt: string
    tags: string[]
    year: number
    featured: boolean
    link?: string
    github?: string
    demo?: string
    stats?: {
      views?: number
      likes?: number
      shares?: number
    }
  }>
  autoplay?: boolean
  autoplayDelay?: number
  showControls?: boolean
  showIndicators?: boolean
  showStats?: boolean
  onProjectClick?: (projectId: string) => void
  className?: string
}

const ProjectShowcaseCarousel: React.FC<ProjectShowcaseCarouselProps> = ({
  projects,
  autoplay = true,
  autoplayDelay = 5000,
  showControls = true,
  showIndicators = true,
  showStats = true,
  onProjectClick,
  className,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const controls = useAnimation()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'project-carousel',
      name: 'Project Carousel',
      type: 'interaction',
      duration: 600,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-carousel',
        staticFallback: true,
      },
      performance: {
        maxDuration: 600,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    'project-carousel'
  )

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isHovered && !prefersReducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % projects.length)
      }, autoplayDelay)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    isPlaying,
    isHovered,
    autoplayDelay,
    projects.length,
    prefersReducedMotion,
  ])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    if (onProjectClick) {
      onProjectClick(projects[index].id)
    }
  }

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-4 ${className}`} {...rest}>
        {/* Project display */}
        <div className='relative bg-white rounded-lg shadow-lg overflow-hidden'>
          <img
            src={projects[currentIndex].image}
            alt={projects[currentIndex].alt}
            className='w-full h-64 object-cover'
          />
          <div className='p-6'>
            <div className='flex items-start justify-between mb-3'>
              <div>
                <h3 className='text-xl font-semibold mb-2'>
                  {projects[currentIndex].title}
                </h3>
                <p className='text-gray-600 mb-3'>
                  {projects[currentIndex].description}
                </p>
              </div>
              {projects[currentIndex].featured && (
                <Badge
                  variant='secondary'
                  className='bg-yellow-100 text-yellow-800'
                >
                  <Star className='h-3 w-3 mr-1' />
                  Featured
                </Badge>
              )}
            </div>

            <div className='flex flex-wrap gap-2 mb-4'>
              {projects[currentIndex].tags.map(tag => (
                <Badge key={tag} variant='outline' className='text-xs'>
                  {tag}
                </Badge>
              ))}
            </div>

            {showStats && projects[currentIndex].stats && (
              <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                {projects[currentIndex].stats.views && (
                  <div className='flex items-center gap-1'>
                    <Eye className='h-4 w-4' />
                    {projects[currentIndex].stats.views}
                  </div>
                )}
                {projects[currentIndex].stats.likes && (
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4' />
                    {projects[currentIndex].stats.likes}
                  </div>
                )}
                {projects[currentIndex].stats.shares && (
                  <div className='flex items-center gap-1'>
                    <TrendingUp className='h-4 w-4' />
                    {projects[currentIndex].stats.shares}
                  </div>
                )}
              </div>
            )}

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <Calendar className='h-4 w-4' />
                {projects[currentIndex].year}
              </div>

              <div className='flex gap-2'>
                {projects[currentIndex].demo && (
                  <Button size='sm' variant='outline'>
                    <ExternalLink className='h-4 w-4 mr-1' />
                    Demo
                  </Button>
                )}
                {projects[currentIndex].github && (
                  <Button size='sm' variant='outline'>
                    <Github className='h-4 w-4 mr-1' />
                    Code
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        {showControls && (
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <Button onClick={prevSlide} variant='outline' size='sm'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button onClick={nextSlide} variant='outline' size='sm'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>

            <div className='flex items-center gap-2'>
              <Button onClick={togglePlayPause} variant='outline' size='sm'>
                {isPlaying ? (
                  <Pause className='h-4 w-4' />
                ) : (
                  <Play className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Indicators */}
        {showIndicators && (
          <div className='flex justify-center gap-2'>
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const slideTransition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  }

  const indicatorVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 },
    },
  }

  const controlVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`space-y-4 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {/* Project display */}
      <div className='relative overflow-hidden rounded-lg shadow-lg'>
        <motion.div
          key={currentIndex}
          custom={1}
          variants={slideVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={slideTransition}
          className='relative'
        >
          <div className='relative'>
            <img
              src={projects[currentIndex].image}
              alt={projects[currentIndex].alt}
              className='w-full h-64 md:h-80 object-cover'
            />

            {/* Overlay gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

            {/* Featured badge */}
            {projects[currentIndex].featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className='absolute top-4 right-4'
              >
                <Badge className='bg-yellow-500 text-white shadow-lg'>
                  <Star className='h-3 w-3 mr-1' />
                  Featured
                </Badge>
              </motion.div>
            )}
          </div>

          <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h3 className='text-2xl font-bold mb-2'>
                {projects[currentIndex].title}
              </h3>
              <p className='text-gray-200 mb-4 line-clamp-2'>
                {projects[currentIndex].description}
              </p>

              <div className='flex flex-wrap gap-2 mb-4'>
                {projects[currentIndex].tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                  >
                    <Badge
                      variant='secondary'
                      className='bg-white/20 text-white border-white/30'
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              {showStats && projects[currentIndex].stats && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className='flex items-center gap-6 text-sm text-gray-200 mb-4'
                >
                  {projects[currentIndex].stats.views && (
                    <div className='flex items-center gap-1'>
                      <Eye className='h-4 w-4' />
                      {projects[currentIndex].stats.views}
                    </div>
                  )}
                  {projects[currentIndex].stats.likes && (
                    <div className='flex items-center gap-1'>
                      <Star className='h-4 w-4' />
                      {projects[currentIndex].stats.likes}
                    </div>
                  )}
                  {projects[currentIndex].stats.shares && (
                    <div className='flex items-center gap-1'>
                      <TrendingUp className='h-4 w-4' />
                      {projects[currentIndex].stats.shares}
                    </div>
                  )}
                </motion.div>
              )}

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 text-sm text-gray-200'>
                  <Calendar className='h-4 w-4' />
                  {projects[currentIndex].year}
                </div>

                <div className='flex gap-2'>
                  {projects[currentIndex].demo && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size='sm'
                        variant='secondary'
                        className='bg-white/20 text-white border-white/30 hover:bg-white/30'
                      >
                        <ExternalLink className='h-4 w-4 mr-1' />
                        Demo
                      </Button>
                    </motion.div>
                  )}
                  {projects[currentIndex].github && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size='sm'
                        variant='secondary'
                        className='bg-white/20 text-white border-white/30 hover:bg-white/30'
                      >
                        <Github className='h-4 w-4 mr-1' />
                        Code
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      {showControls && (
        <motion.div
          variants={containerVariants}
          className='flex items-center justify-between'
        >
          <div className='flex gap-2'>
            <motion.div
              variants={controlVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <Button onClick={prevSlide} variant='outline' size='sm'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
            </motion.div>
            <motion.div
              variants={controlVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <Button onClick={nextSlide} variant='outline' size='sm'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </motion.div>
          </div>

          <div className='flex items-center gap-2'>
            <motion.div
              variants={controlVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <Button onClick={togglePlayPause} variant='outline' size='sm'>
                {isPlaying ? (
                  <Pause className='h-4 w-4' />
                ) : (
                  <Play className='h-4 w-4' />
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Indicators */}
      {showIndicators && (
        <motion.div
          variants={containerVariants}
          className='flex justify-center gap-2'
        >
          {projects.map((_, index) => (
            <motion.button
              key={index}
              variants={indicatorVariants}
              whileHover='hover'
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProjectShowcaseCarousel

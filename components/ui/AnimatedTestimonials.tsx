'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react'

interface AnimatedTestimonialsProps extends HTMLMotionProps<'div'> {
  testimonials: Array<{
    id: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    avatar?: string
    video?: string
    featured?: boolean
  }>
  autoplay?: boolean
  autoplayDelay?: number
  showControls?: boolean
  className?: string
}

const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials,
  autoplay = true,
  autoplayDelay = 5000,
  showControls = true,
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'testimonials-animation',
      name: 'Testimonials Animation',
      type: 'interaction',
      duration: 800,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-testimonials',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 12,
        gpuAcceleration: true,
      },
    },
    'testimonials-animation'
  )

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(autoplay)
  const [direction, setDirection] = React.useState(0)

  // Autoplay functionality
  React.useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [isPlaying, autoplayDelay, testimonials.length, prefersReducedMotion])

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...(rest as any)}>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`p-6 rounded-xl border border-border/40 bg-card ${
              index === currentIndex ? 'border-blue-500/30 shadow-lg' : ''
            }`}
          >
            <div className='flex items-center gap-1 mb-4'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <Quote className='h-8 w-8 text-blue-500/30 mb-4' />
            <p className='text-muted-foreground mb-6 italic'>
              "{testimonial.content}"
            </p>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                <span className='text-white font-semibold text-sm'>
                  {testimonial.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </span>
              </div>
              <div>
                <div className='font-semibold'>{testimonial.name}</div>
                <div className='text-sm text-muted-foreground'>
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
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

  const testimonialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    }),
  }

  const dotVariants = {
    inactive: {
      scale: 1,
      opacity: 0.5,
    },
    active: {
      scale: 1.2,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`relative ${className}`}
      {...(rest as any)}
    >
      {/* Main testimonial display */}
      <div className='relative overflow-hidden'>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={testimonialVariants}
          initial='enter'
          animate='center'
          exit='exit'
          className='p-8 rounded-xl border border-border/40 bg-card shadow-lg'
        >
          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className='flex items-center gap-1 mb-6'
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.3,
                  ease: 'backOut',
                }}
              >
                <Star
                  className={`h-5 w-5 ${
                    i < testimonials[currentIndex].rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Quote icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Quote className='h-12 w-12 text-blue-500/30 mb-6' />
          </motion.div>

          {/* Content */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className='text-lg text-muted-foreground mb-8 italic leading-relaxed'
          >
            "{testimonials[currentIndex].content}"
          </motion.p>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className='flex items-center gap-4'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 0.3, ease: 'backOut' }}
              className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'
            >
              <span className='text-white font-semibold text-lg'>
                {testimonials[currentIndex].name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </motion.div>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className='font-semibold text-lg'
              >
                {testimonials[currentIndex].name}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className='text-muted-foreground'
              >
                {testimonials[currentIndex].role} at{' '}
                {testimonials[currentIndex].company}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Controls */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className='flex items-center justify-center gap-4 mt-8'
        >
          {/* Previous button */}
          <motion.button
            onClick={goToPrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
          >
            <ChevronLeft className='h-4 w-4' />
          </motion.button>

          {/* Play/Pause button */}
          <motion.button
            onClick={togglePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors'
          >
            {isPlaying ? (
              <Pause className='h-4 w-4' />
            ) : (
              <Play className='h-4 w-4' />
            )}
          </motion.button>

          {/* Next button */}
          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
          >
            <ChevronRight className='h-4 w-4' />
          </motion.button>
        </motion.div>
      )}

      {/* Dots indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className='flex items-center justify-center gap-2 mt-6'
      >
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            variants={dotVariants}
            animate={index === currentIndex ? 'active' : 'inactive'}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className='w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors'
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

// Testimonial grid component
interface TestimonialGridProps {
  testimonials: Array<{
    id: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    avatar?: string
    featured?: boolean
  }>
  columns?: number
  className?: string
}

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  testimonials,
  columns = 3,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion()

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  if (prefersReducedMotion) {
    return (
      <div
        className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6 ${className}`}
      >
        {testimonials.map(testimonial => (
          <div
            key={testimonial.id}
            className='p-6 rounded-xl border border-border/40 bg-card hover:shadow-lg transition-shadow'
          >
            <div className='flex items-center gap-1 mb-4'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <Quote className='h-6 w-6 text-blue-500/30 mb-4' />
            <p className='text-muted-foreground mb-6 italic'>
              "{testimonial.content}"
            </p>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                <span className='text-white font-semibold text-sm'>
                  {testimonial.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </span>
              </div>
              <div>
                <div className='font-semibold'>{testimonial.name}</div>
                <div className='text-sm text-muted-foreground'>
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6 ${className}`}
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className='p-6 rounded-xl border border-border/40 bg-card hover:shadow-lg transition-all duration-300'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
            className='flex items-center gap-1 mb-4'
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.1 + 0.3 + i * 0.1,
                  duration: 0.3,
                  ease: 'backOut',
                }}
              >
                <Star
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
          >
            <Quote className='h-6 w-6 text-blue-500/30 mb-4' />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
            className='text-muted-foreground mb-6 italic'
          >
            "{testimonial.content}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6, duration: 0.3 }}
            className='flex items-center gap-3'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.1 + 0.7,
                duration: 0.3,
                ease: 'backOut',
              }}
              className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'
            >
              <span className='text-white font-semibold text-sm'>
                {testimonial.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </motion.div>
            <div>
              <div className='font-semibold'>{testimonial.name}</div>
              <div className='text-sm text-muted-foreground'>
                {testimonial.role} at {testimonial.company}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default AnimatedTestimonials

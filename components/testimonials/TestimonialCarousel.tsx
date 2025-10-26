/**
 * Testimonial carousel component
 * Displays testimonials in a carousel with smooth transitions
 */

'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialCarouselProps {
  testimonials: Array<{
    id: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    avatar?: string
    category?: string
    featured?: boolean
  }>
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showDots?: boolean
  className?: string
  onTestimonialChange?: (testimonial: any) => void
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
  className = '',
  onTestimonialChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered || preferences.reducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [
    isPlaying,
    isHovered,
    autoPlayInterval,
    testimonials.length,
    preferences.reducedMotion,
  ])

  // Handle testimonial change
  useEffect(() => {
    onTestimonialChange?.(testimonials[currentIndex])
  }, [currentIndex, testimonials, onTestimonialChange])

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    )
  }, [testimonials.length])

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (preferences.reducedMotion) return

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          event.preventDefault()
          goToNext()
          break
        case ' ':
          event.preventDefault()
          setIsPlaying(!isPlaying)
          break
      }
    },
    [goToPrevious, goToNext, isPlaying, preferences.reducedMotion]
  )

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const transition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  }

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-4 w-4',
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        )}
      />
    ))
  }

  return (
    <div
      ref={carouselRef}
      className={cn('relative w-full', className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role='region'
      aria-label='Testimonials carousel'
    >
      {/* Main carousel container */}
      <div className='relative overflow-hidden rounded-lg'>
        <AnimatePresence mode='wait' custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
            className='w-full'
          >
            <Card className='bg-gradient-to-br from-card to-card/80 border-border/50'>
              <CardContent className='p-8'>
                {/* Quote icon */}
                <motion.div
                  className='absolute top-6 right-6 text-primary/20'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Quote className='h-8 w-8' />
                </motion.div>

                {/* Rating */}
                <motion.div
                  className='flex items-center gap-1 mb-6'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {renderStars(testimonials[currentIndex].rating)}
                </motion.div>

                {/* Content */}
                <motion.div
                  className='mb-8'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className='text-lg text-muted-foreground leading-relaxed'>
                    "{testimonials[currentIndex].content}"
                  </p>
                </motion.div>

                {/* Author */}
                <motion.div
                  className='flex items-center gap-4'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Avatar className='h-16 w-16'>
                    <AvatarImage
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback className='bg-primary/10 text-primary font-semibold text-lg'>
                      {testimonials[currentIndex].name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1'>
                    <h4 className='text-xl font-semibold text-foreground'>
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className='text-muted-foreground'>
                      {testimonials[currentIndex].role} at{' '}
                      {testimonials[currentIndex].company}
                    </p>
                    {testimonials[currentIndex].category && (
                      <Badge variant='secondary' className='mt-2'>
                        {testimonials[currentIndex].category}
                      </Badge>
                    )}
                  </div>
                </motion.div>

                {/* Featured indicator */}
                {testimonials[currentIndex].featured && (
                  <motion.div
                    className='absolute top-4 left-4'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Badge className='bg-yellow-500 text-yellow-900'>
                      Featured
                    </Badge>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      {showControls && (
        <div className='flex items-center justify-between mt-6'>
          <Button
            variant='outline'
            size='icon'
            onClick={goToPrevious}
            className='h-10 w-10 rounded-full'
            aria-label='Previous testimonial'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsPlaying(!isPlaying)}
              className='h-8 px-3'
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>

          <Button
            variant='outline'
            size='icon'
            onClick={goToNext}
            className='h-10 w-10 rounded-full'
            aria-label='Next testimonial'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}

      {/* Dots indicator */}
      {showDots && (
        <div className='flex justify-center gap-2 mt-6'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {isPlaying && !isHovered && (
        <motion.div
          className='absolute bottom-0 left-0 h-1 bg-primary'
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
        />
      )}
    </div>
  )
}

export default TestimonialCarousel

/**
 * Testimonial card component
 * Displays individual testimonials with enhanced animations
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Quote } from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    avatar?: string
    category?: string
    featured?: boolean
  }
  index?: number
  className?: string
  enable3D?: boolean
  enableHover?: boolean
  onSelect?: (testimonial: any) => void
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index = 0,
  className = '',
  enable3D = true,
  enableHover = true,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!enableHover || prefersReducedMotion) return

      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const rotateXValue = (event.clientY - centerY) / (rect.height / 2)
      const rotateYValue = (event.clientX - centerX) / (rect.width / 2)

      mouseX.set(rotateYValue)
      mouseY.set(rotateXValue)
    },
    [enableHover, prefersReducedMotion, mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return

    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }, [mouseX, mouseY, prefersReducedMotion])

  const handleClick = useCallback(() => {
    setIsSelected(!isSelected)
    onSelect?.(testimonial)
  }, [isSelected, onSelect, testimonial])

  // Animation variants
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    selected: {
      scale: 1.05,
      y: -10,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.2,
        ease: 'easeOut',
      },
    },
  }

  const ratingVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1 + 0.4,
        ease: 'easeOut',
      },
    },
  }

  // Render stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        variants={ratingVariants}
        initial='initial'
        animate='animate'
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Star
          className={cn(
            'h-4 w-4',
            i < testimonial.rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          )}
        />
      </motion.div>
    ))
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative', className)}
      variants={cardVariants}
      initial='initial'
      animate='animate'
      whileHover={enableHover && !prefersReducedMotion ? 'hover' : undefined}
      whileTap={enableHover && !prefersReducedMotion ? 'selected' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={
        enable3D && !prefersReducedMotion
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
          : undefined
      }
    >
      <Card
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          'bg-gradient-to-br from-card to-card/80',
          'border border-border/50',
          'hover:border-primary/20',
          'hover:shadow-lg hover:shadow-primary/5',
          isSelected && 'ring-2 ring-primary/20 shadow-primary/10',
          isHovered && 'shadow-xl'
        )}
      >
        {/* Background gradient overlay */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0'
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        <CardContent className='relative p-6'>
          {/* Quote icon */}
          <motion.div
            className='absolute top-4 right-4 text-primary/20'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Quote className='h-8 w-8' />
          </motion.div>

          {/* Rating */}
          <motion.div
            className='flex items-center gap-1 mb-4'
            variants={ratingVariants}
            initial='initial'
            animate='animate'
          >
            {renderStars()}
          </motion.div>

          {/* Content */}
          <motion.div
            className='mb-6'
            variants={contentVariants}
            initial='initial'
            animate='animate'
          >
            <p className='text-muted-foreground leading-relaxed'>
              "{testimonial.content}"
            </p>
          </motion.div>

          {/* Author */}
          <motion.div
            className='flex items-center gap-3'
            variants={contentVariants}
            initial='initial'
            animate='animate'
          >
            <Avatar className='h-12 w-12'>
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                {testimonial.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1'>
              <h4 className='font-semibold text-foreground'>
                {testimonial.name}
              </h4>
              <p className='text-sm text-muted-foreground'>
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
          </motion.div>

          {/* Category badge */}
          {testimonial.category && (
            <motion.div
              className='mt-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              <Badge variant='secondary' className='text-xs'>
                {testimonial.category}
              </Badge>
            </motion.div>
          )}

          {/* Featured indicator */}
          {testimonial.featured && (
            <motion.div
              className='absolute top-2 left-2'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Badge className='bg-yellow-500 text-yellow-900'>Featured</Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TestimonialCard

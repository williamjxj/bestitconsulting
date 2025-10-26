/**
 * Case study card component
 * Enhanced case study card with hover reveal animations
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CaseStudyCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  link?: string
  github?: string
  featured?: boolean
  className?: string
  respectReducedMotion?: boolean
  onHover?: () => void
  onLeave?: () => void
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  image,
  technologies,
  category,
  link,
  github,
  featured = false,
  className = '',
  respectReducedMotion = true,
  onHover,
  onLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    onHover?.()
  }, [onHover])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    onLeave?.()
  }, [onLeave])

  // Card variants
  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5 },
  }

  // Image variants
  const imageVariants = {
    initial: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, opacity: 0.8 },
  }

  // Content variants
  const contentVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { y: -10, opacity: 1 },
  }

  // Badge variants
  const badgeVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.05, opacity: 1 },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <Card ref={cardRef} className={`relative overflow-hidden ${className}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground mb-4'>{description}</p>
          <div className='flex flex-wrap gap-2'>
            {technologies.map((tech, index) => (
              <Badge key={index} variant='secondary'>
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      variants={cardVariants}
      initial='initial'
      whileHover='hover'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card className='relative overflow-hidden h-full'>
        {/* Featured badge */}
        {featured && (
          <motion.div
            className='absolute top-4 right-4 z-10'
            variants={badgeVariants}
            initial='initial'
            whileHover='hover'
          >
            <Badge variant='default' className='bg-blue-500'>
              Featured
            </Badge>
          </motion.div>
        )}

        {/* Category badge */}
        <motion.div
          className='absolute top-4 left-4 z-10'
          variants={badgeVariants}
          initial='initial'
          whileHover='hover'
        >
          <Badge variant='outline'>{category}</Badge>
        </motion.div>

        {/* Image */}
        <motion.div
          className='relative h-48 overflow-hidden'
          variants={imageVariants}
          initial='initial'
          whileHover='hover'
        >
          <img src={image} alt={title} className='w-full h-full object-cover' />

          {/* Image overlay */}
          <motion.div
            className='absolute inset-0 bg-black/20'
            animate={{
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className='p-6'
          variants={contentVariants}
          initial='initial'
          whileHover='hover'
        >
          <CardTitle className='mb-2'>{title}</CardTitle>
          <p className='text-muted-foreground mb-4 line-clamp-3'>
            {description}
          </p>

          {/* Technologies */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge variant='secondary' className='text-xs'>
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Action buttons */}
          <motion.div
            className='flex space-x-2'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {link && (
              <Button size='sm' variant='outline' asChild>
                <a href={link} target='_blank' rel='noopener noreferrer'>
                  View Project
                </a>
              </Button>
            )}
            {github && (
              <Button size='sm' variant='ghost' asChild>
                <a href={github} target='_blank' rel='noopener noreferrer'>
                  GitHub
                </a>
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none'
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}

export default CaseStudyCard

/**
 * 3D service card component
 * Enhanced service card with 3D hover effects and depth
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card, CardContent } from './card'
import { Badge } from './badge'
import { ChevronRight } from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'

interface ServiceCard3DProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  technologies: string[]
  className?: string
  respectReducedMotion?: boolean
}

export const ServiceCard3D: React.FC<ServiceCard3DProps> = ({
  icon,
  title,
  description,
  features,
  technologies,
  className = '',
  respectReducedMotion = true,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Mouse position tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring values for smooth animation
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Transform values for 3D rotation
  const rotateX = useTransform(springY, [-300, 300], [15, -15])
  const rotateY = useTransform(springX, [-300, 300], [-15, 15])
  const scale = useTransform(springX, [-300, 300], [0.95, 1.05])

  // Handle mouse move
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || (respectReducedMotion && prefersReducedMotion))
        return

      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      mouseX.set(event.clientX - centerX)
      mouseY.set(event.clientY - centerY)
    },
    [mouseX, mouseY, respectReducedMotion, prefersReducedMotion]
  )

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }, [mouseX, mouseY])

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  // Card variants
  const cardVariants = {
    initial: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
    },
    hover: {
      scale: 1.05,
      rotateX: rotateX,
      rotateY: rotateY,
      z: 50,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  // Icon variants
  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  // Content variants
  const contentVariants = {
    initial: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -5,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      variants={cardVariants}
      initial='initial'
      whileHover='hover'
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <Card
        className={`
          relative overflow-hidden h-full transition-all duration-300
          border border-border/40 hover:border-blue-500/30
          bg-gradient-to-b from-card to-card/80 hover:to-card/90
          shadow-sm hover:shadow-xl hover:shadow-blue-500/20
          ${isHovered ? 'shadow-2xl' : ''}
        `}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3D background effect */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0'
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Depth layers */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent'
          style={{
            transform: 'translateZ(10px)',
          }}
        />

        <CardContent className='relative z-10 p-6'>
          <motion.div
            className='flex items-start justify-between mb-6'
            variants={contentVariants}
          >
            <motion.div
              className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500'
              variants={iconVariants}
            >
              {icon}
            </motion.div>

            <motion.div
              className='text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
            >
              <ChevronRight className='w-5 h-5' />
            </motion.div>
          </motion.div>

          <motion.div variants={contentVariants}>
            <h3 className='text-xl font-semibold text-foreground mb-3 group-hover:text-blue-600 transition-colors duration-300'>
              {title}
            </h3>
            <p className='text-muted-foreground mb-4 leading-relaxed'>
              {description}
            </p>
          </motion.div>

          <motion.div className='space-y-4' variants={contentVariants}>
            <div>
              <h4 className='text-sm font-medium text-foreground mb-2'>
                Key Features:
              </h4>
              <ul className='space-y-1'>
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className='text-sm text-muted-foreground flex items-center'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className='w-1.5 h-1.5 bg-blue-500 rounded-full mr-2' />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='text-sm font-medium text-foreground mb-2'>
                Technologies:
              </h4>
              <div className='flex flex-wrap gap-2'>
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
            </div>
          </motion.div>
        </CardContent>

        {/* 3D shadow effect */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none'
          style={{
            transform: 'translateZ(-10px)',
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}

export default ServiceCard3D

// @ts-nocheck
/**
 * Card depth effects component
 * Creates depth and perspective animations for cards
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CardDepthEffectsProps {
  children: React.ReactNode
  depth?: number
  perspective?: number
  className?: string
  respectReducedMotion?: boolean
}

export const CardDepthEffects: React.FC<CardDepthEffectsProps> = ({
  children,
  depth = 20,
  perspective = 1000,
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
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // Transform values for depth
  const rotateX = useTransform(springY, [-300, 300], [depth, -depth])
  const rotateY = useTransform(springX, [-300, 300], [-depth, depth])
  const translateZ = useTransform(springX, [-300, 300], [-depth, depth])

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
    [mouseX, mouseY, respectReducedMotion, preferences.reducedMotion]
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
      scale: 1.02,
      rotateX: rotateX,
      rotateY: rotateY,
      z: translateZ,
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
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className='relative w-full h-full'
        style={{
          transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}

        {/* Depth shadow */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none'
          style={{
            transform: 'translateZ(-10px)',
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Depth highlight */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent pointer-events-none'
          style={{
            transform: 'translateZ(10px)',
          }}
          animate={{
            opacity: isHovered ? 0.2 : 0.05,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default CardDepthEffects

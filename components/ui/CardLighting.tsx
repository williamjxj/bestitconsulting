/**
 * Card lighting effects component
 * Creates dynamic lighting and shadow effects for cards
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CardLightingProps {
  children: React.ReactNode
  lightColor?: string
  intensity?: number
  className?: string
  respectReducedMotion?: boolean
}

export const CardLighting: React.FC<CardLightingProps> = ({
  children,
  lightColor = '#3b82f6',
  intensity = 0.3,
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

  // Transform values for lighting
  const lightX = useTransform(springX, [-300, 300], [0, 100])
  const lightY = useTransform(springY, [-300, 300], [0, 100])
  const lightIntensity = useTransform(springX, [-300, 300], [0.1, intensity])

  // Handle mouse move
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        !cardRef.current ||
        (respectReducedMotion && prefersReducedMotion)
      )
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
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.02,
      boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
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
    >
      <motion.div
        className='relative w-full h-full overflow-hidden'
        style={{
          background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${lightColor}${Math.round(
            lightIntensity.get() * 255
          )
            .toString(16)
            .padStart(2, '0')} 0%, transparent 70%)`,
        }}
      >
        {children}

        {/* Dynamic lighting overlay */}
        <motion.div
          className='absolute inset-0 pointer-events-none'
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${lightColor}${Math.round(
              lightIntensity.get() * 255
            )
              .toString(16)
              .padStart(2, '0')} 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Edge lighting */}
        <motion.div
          className='absolute inset-0 pointer-events-none'
          style={{
            background: `linear-gradient(45deg, transparent 0%, ${lightColor}${Math.round(
              lightIntensity.get() * 100
            )
              .toString(16)
              .padStart(2, '0')} 50%, transparent 100%)`,
            opacity: isHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shadow casting */}
        <motion.div
          className='absolute inset-0 pointer-events-none'
          style={{
            background: `radial-gradient(ellipse at ${lightX}% ${lightY}%, transparent 0%, rgba(0, 0, 0, ${lightIntensity.get() * 0.3}) 100%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default CardLighting

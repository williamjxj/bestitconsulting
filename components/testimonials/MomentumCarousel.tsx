/**
 * Momentum carousel component
 * Creates momentum-based scrolling for testimonials
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface MomentumCarouselProps {
  children: React.ReactNode[]
  className?: string
  respectReducedMotion?: boolean
  onSlideChange?: (index: number) => void
}

export const MomentumCarousel: React.FC<MomentumCarouselProps> = ({
  children,
  className = '',
  respectReducedMotion = true,
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Motion values for momentum
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 100, damping: 30 })
  const opacity = useTransform(springX, [-300, 0, 300], [0.5, 1, 0.5])

  // Handle drag start
  const handleDragStart = useCallback(() => {
    if (respectReducedMotion && preferences.reducedMotion) return
    setIsDragging(true)
  }, [respectReducedMotion, preferences.reducedMotion])

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (respectReducedMotion && preferences.reducedMotion) return

    setIsDragging(false)

    // Calculate momentum and snap to nearest slide
    const velocity = x.getVelocity()
    const threshold = 500

    if (Math.abs(velocity) > threshold) {
      const direction = velocity > 0 ? -1 : 1
      const newIndex = Math.max(
        0,
        Math.min(children.length - 1, currentIndex + direction)
      )
      setCurrentIndex(newIndex)
      onSlideChange?.(newIndex)
    }

    // Reset position
    x.set(0)
  }, [
    x,
    currentIndex,
    children.length,
    onSlideChange,
    respectReducedMotion,
    preferences.reducedMotion,
  ])

  // Handle touch events
  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (respectReducedMotion && preferences.reducedMotion) return
      handleDragStart()
    },
    [handleDragStart, respectReducedMotion, preferences.reducedMotion]
  )

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (respectReducedMotion && preferences.reducedMotion) return
      handleDragEnd()
    },
    [handleDragEnd, respectReducedMotion, preferences.reducedMotion]
  )

  // Handle mouse events
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (respectReducedMotion && preferences.reducedMotion) return
      event.preventDefault()
      handleDragStart()
    },
    [handleDragStart, respectReducedMotion, preferences.reducedMotion]
  )

  const handleMouseUp = useCallback(
    (event: React.MouseEvent) => {
      if (respectReducedMotion && preferences.reducedMotion) return
      handleDragEnd()
    },
    [handleDragEnd, respectReducedMotion, preferences.reducedMotion]
  )

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    if (respectReducedMotion && preferences.reducedMotion) return
    handleDragEnd()
  }, [handleDragEnd, respectReducedMotion, preferences.reducedMotion])

  // Carousel variants
  const carouselVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02 },
  }

  // Item variants
  const itemVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div ref={carouselRef} className={`relative ${className}`}>
        {children[currentIndex]}
      </div>
    )
  }

  return (
    <motion.div
      ref={carouselRef}
      className={`relative overflow-hidden ${className}`}
      variants={carouselVariants}
      initial='initial'
      animate='animate'
      whileHover='hover'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className='flex'
        style={{
          x: springX,
          opacity,
        }}
        drag='x'
        dragConstraints={{ left: -300, right: 300 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            className='flex-shrink-0 w-full'
            variants={itemVariants}
            initial='initial'
            animate='animate'
            whileHover='hover'
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default MomentumCarousel

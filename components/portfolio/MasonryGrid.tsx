/**
 * Masonry grid layout component
 * Creates responsive masonry layout for portfolio items
 */

'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface MasonryGridProps {
  children: React.ReactNode[]
  columns?: number
  gap?: number
  className?: string
  respectReducedMotion?: boolean
  onItemClick?: (index: number) => void
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = 3,
  gap = 16,
  className = '',
  respectReducedMotion = true,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [itemPositions, setItemPositions] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([])
  const { prefersReducedMotion } = useAccessibility()

  // Calculate item positions
  const calculatePositions = useCallback(() => {
    if (!containerRef.current || children.length === 0) return

    const container = containerRef.current
    const containerWidth = container.clientWidth
    const itemWidth = (containerWidth - (columns - 1) * gap) / columns
    const columnHeights = new Array(columns).fill(0)
    const positions: Array<{
      x: number
      y: number
      width: number
      height: number
    }> = []

    children.forEach((_, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      )
      const x = shortestColumnIndex * (itemWidth + gap)
      const y = columnHeights[shortestColumnIndex]

      // Estimate height (you might want to measure actual height)
      const estimatedHeight = 200 + Math.random() * 100

      positions.push({
        x,
        y,
        width: itemWidth,
        height: estimatedHeight,
      })

      columnHeights[shortestColumnIndex] += estimatedHeight + gap
    })

    setItemPositions(positions)
  }, [children, columns, gap])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
        calculatePositions()
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculatePositions])

  // Recalculate positions when children change
  useEffect(() => {
    calculatePositions()
  }, [calculatePositions])

  // Item variants
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02, y: -5 },
  }

  // Container variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      variants={containerVariants}
      initial='initial'
      animate='animate'
    >
      {children.map((child, index) => {
        const position = itemPositions[index]
        if (!position) return null

        return (
          <motion.div
            key={index}
            className='absolute'
            style={{
              left: position.x,
              top: position.y,
              width: position.width,
            }}
            variants={itemVariants}
            initial='initial'
            animate='animate'
            whileHover='hover'
            onClick={() => onItemClick?.(index)}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default MasonryGrid

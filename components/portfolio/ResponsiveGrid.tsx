/**
 * Responsive grid component
 * Creates responsive grid layout with breakpoints
 */

'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface ResponsiveGridProps {
  children: React.ReactNode[]
  breakpoints?: {
    mobile: number
    tablet: number
    desktop: number
  }
  gap?: number
  className?: string
  respectReducedMotion?: boolean
  onLayoutChange?: (columns: number) => void
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  breakpoints = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  gap = 16,
  className = '',
  respectReducedMotion = true,
  onLayoutChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(breakpoints.desktop)
  const [containerWidth, setContainerWidth] = useState(0)
  const { prefersReducedMotion } = useAccessibility()

  // Calculate columns based on container width
  const calculateColumns = useCallback(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    setContainerWidth(width)

    let newColumns = breakpoints.desktop
    if (width < 768) {
      newColumns = breakpoints.mobile
    } else if (width < 1024) {
      newColumns = breakpoints.tablet
    }

    if (newColumns !== columns) {
      setColumns(newColumns)
      onLayoutChange?.(newColumns)
    }
  }, [breakpoints, columns, onLayoutChange])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      calculateColumns()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateColumns])

  // Grid variants
  const gridVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  // Item variants
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02, y: -5 },
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
      variants={gridVariants}
      initial='initial'
      animate='animate'
    >
      <div
        className='grid gap-4'
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
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
      </div>
    </motion.div>
  )
}

export default ResponsiveGrid

// @ts-nocheck
/**
 * Scroll-triggered grid reveal component
 * Animates grid items based on scroll position
 */

'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface ScrollGridRevealProps {
  children: React.ReactNode[]
  threshold?: number
  className?: string
  respectReducedMotion?: boolean
  onReveal?: (index: number) => void
}

export const ScrollGridReveal: React.FC<ScrollGridRevealProps> = ({
  children,
  threshold = 0.1,
  className = '',
  respectReducedMotion = true,
  onReveal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const { prefersReducedMotion } = useAccessibility()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Intersection observer for individual items
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0'
            )
            setVisibleItems(prev => new Set([...prev, index]))
            onReveal?.(index)
          }
        })
      },
      { threshold }
    )

    const items = containerRef.current.querySelectorAll('[data-index]')
    items.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [threshold, onReveal])

  // Item variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Container variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
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
      {children.map((child, index) => (
        <motion.div
          key={index}
          data-index={index}
          variants={itemVariants}
          initial='hidden'
          animate={visibleItems.has(index) ? 'visible' : 'hidden'}
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ScrollGridReveal

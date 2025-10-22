'use client'

import { motion } from 'framer-motion'
import { fadeInUp, getAnimationVariants } from '@/lib/framer-animations'
import { scrollTriggerConfig } from '@/lib/framer-animations'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'fadeInUp'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

/**
 * AnimatedSection Component
 *
 * A wrapper component that provides scroll-triggered animations for sections
 * Implements accessibility-aware animations with reduced motion support
 */
export function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  threshold = scrollTriggerConfig.threshold,
  className = '',
  once = scrollTriggerConfig.once,
}: AnimatedSectionProps) {
  // Get the appropriate animation variant
  const getAnimationVariant = () => {
    switch (animation) {
      case 'fadeIn':
        return getAnimationVariants({
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay, ease: 'easeOut' },
          },
        })
      case 'slideUp':
        return getAnimationVariants({
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: 'easeOut' },
          },
        })
      case 'slideInLeft':
        return getAnimationVariants({
          hidden: { opacity: 0, x: -30 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: 'easeOut' },
          },
        })
      case 'slideInRight':
        return getAnimationVariants({
          hidden: { opacity: 0, x: 30 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: 'easeOut' },
          },
        })
      case 'fadeInUp':
      default:
        return getAnimationVariants(fadeInUp)
    }
  }

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{
        once,
        amount: threshold,
        margin: '0px 0px -50px 0px',
      }}
      variants={getAnimationVariant()}
      className={className}
    >
      {children}
    </motion.section>
  )
}

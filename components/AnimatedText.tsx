'use client'

import { motion } from 'framer-motion'
import { fadeInUp, getAnimationVariants } from '@/lib/framer-animations'
import { scrollTriggerConfig } from '@/lib/framer-animations'
import { ReactNode } from 'react'

interface AnimatedTextProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'fadeInUp'
  delay?: number
  duration?: number
  stagger?: number
  className?: string
  once?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

/**
 * AnimatedText Component
 *
 * A text component with scroll-triggered animations
 * Supports staggered animations for multiple text elements
 * Implements accessibility-aware animations with reduced motion support
 */
export function AnimatedText({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = '',
  once = scrollTriggerConfig.once,
  as: Component = 'div',
}: AnimatedTextProps) {
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
    <motion.div
      as={Component}
      initial='hidden'
      whileInView='visible'
      viewport={{
        once,
        amount: scrollTriggerConfig.threshold,
        margin: '0px 0px -50px 0px',
      }}
      variants={getAnimationVariant()}
      transition={{
        delay: delay + stagger,
        duration,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

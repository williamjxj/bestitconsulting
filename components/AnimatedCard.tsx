'use client'

import { motion } from 'framer-motion'
import {
  scaleIn,
  hoverScale,
  getAnimationVariants,
} from '@/lib/framer-animations'
import { scrollTriggerConfig } from '@/lib/framer-animations'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  hover?: {
    scale?: number
    rotate?: number
    translateY?: number
    opacity?: number
  }
  delay?: number
  stagger?: number
  className?: string
  once?: boolean
}

/**
 * AnimatedCard Component
 *
 * A card component with scroll-triggered animations and hover effects
 * Implements accessibility-aware animations with reduced motion support
 */
export function AnimatedCard({
  children,
  hover = { scale: 1.05 },
  delay = 0,
  stagger = 0,
  className = '',
  once = scrollTriggerConfig.once,
}: AnimatedCardProps) {
  const hoverVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      y: 0,
      opacity: 1,
    },
    hover: {
      scale: hover.scale || 1.05,
      rotate: hover.rotate || 0,
      y: hover.translateY || 0,
      opacity: hover.opacity || 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      whileHover='hover'
      viewport={{
        once,
        amount: scrollTriggerConfig.threshold,
        margin: '0px 0px -50px 0px',
      }}
      variants={getAnimationVariants(scaleIn)}
      transition={{
        delay: delay + stagger,
        duration: 0.6,
        ease: 'easeOut',
      }}
      className={`group cursor-pointer ${className}`}
    >
      <motion.div
        variants={hoverVariants}
        initial='rest'
        whileHover='hover'
        className='h-full'
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

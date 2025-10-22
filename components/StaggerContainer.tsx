'use client'

import { motion } from 'framer-motion'
import {
  staggerContainer,
  staggerFade,
  getAnimationVariants,
} from '@/lib/framer-animations'
import { scrollTriggerConfig } from '@/lib/framer-animations'
import { ReactNode } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  delay?: number
  className?: string
  once?: boolean
  threshold?: number
}

/**
 * StaggerContainer Component
 *
 * A container that animates its children with staggered timing
 * Implements accessibility-aware animations with reduced motion support
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delay = 0,
  className = '',
  once = scrollTriggerConfig.once,
  threshold = scrollTriggerConfig.threshold,
}: StaggerContainerProps) {
  const containerVariants = getAnimationVariants({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  })

  const childVariants = getAnimationVariants(staggerFade)

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{
        once,
        amount: threshold,
        margin: '0px 0px -50px 0px',
      }}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={childVariants} className='w-full'>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={childVariants}>{children}</motion.div>
      )}
    </motion.div>
  )
}

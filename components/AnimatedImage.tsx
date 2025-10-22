'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { slideInLeft, getAnimationVariants } from '@/lib/framer-animations'
import { scrollTriggerConfig } from '@/lib/framer-animations'
import { useResponsive } from '@/lib/breakpoints'
import { AnimationOptimizer } from '@/lib/performance'

interface AnimatedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  animation?: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn'
  delay?: number
  duration?: number
  once?: boolean
}

/**
 * AnimatedImage Component
 *
 * An image component with scroll-triggered animations and lazy loading
 * Implements accessibility-aware animations with reduced motion support
 */
export function AnimatedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  animation = 'slideInLeft',
  delay = 0,
  duration = 0.8,
  once = scrollTriggerConfig.once,
}: AnimatedImageProps) {
  const { isMobile } = useResponsive()
  const optimizer = AnimationOptimizer.getInstance()
  const mobileOpts = optimizer.getMobileOptimizations()

  // Mobile-optimized settings
  const optimizedDuration = mobileOpts.reduceAnimations
    ? duration * 0.5
    : duration
  const optimizedThreshold = mobileOpts.lazyLoadThreshold

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
      case 'slideInLeft':
        return getAnimationVariants(slideInLeft)
      case 'slideInRight':
        return getAnimationVariants({
          hidden: { opacity: 0, x: 30 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: 'easeOut' },
          },
        })
      case 'scaleIn':
        return getAnimationVariants({
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, delay, ease: 'easeOut' },
          },
        })
      default:
        return getAnimationVariants(slideInLeft)
    }
  }

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{
        once,
        amount: optimizedThreshold,
        margin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px',
      }}
      variants={getAnimationVariant()}
      transition={{
        delay,
        duration: optimizedDuration,
        ease: 'easeOut',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority || isMobile}
        className={`w-full h-auto object-cover transition-transform duration-300 ${
          isMobile ? 'hover:scale-102' : 'hover:scale-105'
        }`}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        sizes={
          isMobile
            ? '(max-width: 768px) 100vw, 50vw'
            : '(max-width: 1200px) 50vw, 33vw'
        }
        quality={isMobile ? 75 : 90}
      />
    </motion.div>
  )
}

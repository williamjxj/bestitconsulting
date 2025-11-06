'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  shouldReduceMotion,
  getReducedMotionVariants,
} from '@/lib/accessibility'

interface AnimatedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  variant?: 'fade' | 'scale' | 'slide' | 'parallax'
  delay?: number
  duration?: number
  className?: string
  loading?: 'lazy' | 'eager'
  placeholder?: string
  fallback?: string
  onLoad?: () => void
  onError?: () => void
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  variant = 'fade',
  delay = 0,
  duration = 0.8,
  className,
  loading = 'lazy',
  placeholder,
  fallback,
  onLoad,
  onError,
}: AnimatedImageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Get animation variants based on motion preference
  const getAnimationVariants = () => {
    if (shouldReduceMotion()) {
      const reducedVariants = getReducedMotionVariants()
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      }
    }

    const variants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
      scale: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
      slide: {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
      parallax: {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
    }

    return variants[variant]
  }

  const animationVariants = getAnimationVariants()

  if (imageError && fallback) {
    return (
      <motion.div
        ref={ref}
        initial={animationVariants.initial}
        animate={inView ? animationVariants.animate : animationVariants.initial}
        transition={animationVariants.transition}
        className={className}
      >
        <Image
          src={fallback}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={onLoad}
          onError={onError}
        />
      </motion.div>
    )
  }

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className='text-gray-500 text-sm'>Image unavailable</span>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={animationVariants.initial}
      animate={inView ? animationVariants.animate : animationVariants.initial}
      transition={animationVariants.transition}
      className={className}
    >
      {isLoading && placeholder && (
        <Image
          src={placeholder}
          alt=''
          width={width}
          height={height}
          className='absolute inset-0 object-cover blur-sm'
          loading={loading}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => {
          setIsLoading(false)
          onLoad?.()
        }}
        onError={() => {
          setImageError(true)
          onError?.()
        }}
      />
    </motion.div>
  )
}

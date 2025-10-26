'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { cn } from '@/lib/utils'

interface ProfessionalImageProps {
  src?: string
  alt?: string
  className?: string
  variant?: 'hero' | 'team' | 'client' | 'product'
  animated?: boolean
  hover?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: React.ReactNode
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
}

const variantClasses = {
  hero: 'rounded-2xl',
  team: 'rounded-full',
  client: 'rounded-lg',
  product: 'rounded-xl',
}

export function ProfessionalImage({
  src,
  alt = 'Professional image',
  className,
  variant = 'hero',
  animated = true,
  hover = true,
  size = 'md',
  fallback,
}: ProfessionalImageProps) {
  const [mounted, setMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Disable animations for reduced motion or mobile if needed
  const shouldAnimate =
    animated && !reducedMotion && (deviceType !== 'mobile' || hover)

  if (!mounted) {
    return (
      <div
        className={cn(
          'bg-gray-200 animate-pulse',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      />
    )
  }

  const imageElement = (
    <div
      className={cn(
        'relative overflow-hidden',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className='w-full h-full object-cover'
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      ) : (
        <div className='w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center'>
          <div className='w-1/2 h-1/2 bg-blue-200 rounded-lg flex items-center justify-center'>
            <span className='text-blue-600 font-semibold text-sm'>IMG</span>
          </div>
        </div>
      )}
    </div>
  )

  if (!shouldAnimate) {
    return imageElement
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={hover ? { scale: 1.05 } : undefined}
      whileTap={hover ? { scale: 0.95 } : undefined}
      transition={{
        duration: 0.4,
        ease: 'easeOut' as const,
      }}
    >
      {imageElement}
    </motion.div>
  )
}

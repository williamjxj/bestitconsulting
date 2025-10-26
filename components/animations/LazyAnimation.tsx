'use client'

import React, { Suspense, lazy, ComponentType } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LazyAnimationProps {
  component: ComponentType<any>
  fallback?: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  [key: string]: any
}

const LazyAnimation: React.FC<LazyAnimationProps> = ({
  component: Component,
  fallback,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setIsLoaded(true)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin])

  const defaultFallback = (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
    </div>
  )

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {isVisible && (
        <Suspense fallback={fallback || defaultFallback}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Component {...props} />
          </motion.div>
        </Suspense>
      )}
      {!isVisible && !isLoaded && (
        <div className={cn('flex items-center justify-center p-8', className)}>
          {fallback || defaultFallback}
        </div>
      )}
    </div>
  )
}

export default LazyAnimation

'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { cn } from '@/lib/utils'

interface ProfessionalGraphicProps {
  children: React.ReactNode
  className?: string
  animated?: boolean
  hover?: boolean
  variant?: 'icon' | 'illustration' | 'badge' | 'logo'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  gradient?: string
  glow?: boolean
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
}

const variantClasses = {
  icon: 'rounded-lg',
  illustration: 'rounded-xl',
  badge: 'rounded-full',
  logo: 'rounded-lg',
}

export function ProfessionalGraphic({
  children,
  className,
  animated = true,
  hover = true,
  variant = 'icon',
  size = 'md',
  gradient,
  glow = false,
}: ProfessionalGraphicProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  // Disable animations for reduced motion or mobile if needed
  const shouldAnimate =
    animated && !reducedMotion && (deviceType !== 'mobile' || hover)

  const graphicElement = (
    <div
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        variantClasses[variant],
        gradient && `bg-gradient-to-br ${gradient}`,
        glow && 'shadow-lg shadow-blue-500/25',
        className
      )}
    >
      {children}
    </div>
  )

  if (!shouldAnimate) {
    return graphicElement
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={hover ? { scale: 1.1, rotate: 5 } : undefined}
      whileTap={hover ? { scale: 0.95 } : undefined}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
    >
      {graphicElement}
    </motion.div>
  )
}

// Pre-built professional graphics components
export function TechIcon({
  icon: Icon,
  ...props
}: { icon: React.ComponentType<any> } & Omit<
  ProfessionalGraphicProps,
  'children'
>) {
  return (
    <ProfessionalGraphic {...props}>
      <Icon className='w-1/2 h-1/2 text-white' />
    </ProfessionalGraphic>
  )
}

export function AchievementBadge({
  number,
  ...props
}: { number: string | number } & Omit<ProfessionalGraphicProps, 'children'>) {
  return (
    <ProfessionalGraphic variant='badge' {...props}>
      <span className='text-white font-bold text-lg'>{number}</span>
    </ProfessionalGraphic>
  )
}

export function QualitySeal({
  ...props
}: Omit<ProfessionalGraphicProps, 'children'>) {
  return (
    <ProfessionalGraphic
      variant='badge'
      gradient='from-green-400 to-emerald-500'
      {...props}
    >
      <svg
        className='w-1/2 h-1/2 text-white'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
      </svg>
    </ProfessionalGraphic>
  )
}

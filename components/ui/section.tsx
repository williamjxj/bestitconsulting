'use client'

import { motion } from 'framer-motion'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'default' | 'muted' | 'gradient' | 'dark'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  animation?: 'fade' | 'slide' | 'scale' | 'none'
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  delay?: number
}

const backgroundClasses = {
  default: 'bg-white',
  muted: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50',
  dark: 'bg-gray-900 text-white',
}

const paddingClasses = {
  sm: 'py-8',
  md: 'py-12 lg:py-16',
  lg: 'py-16 lg:py-20',
  xl: 'py-20 lg:py-24',
}

export function Section({
  children,
  className = '',
  background = 'default',
  padding = 'lg',
  animation = 'fade',
  direction = 'up',
  duration = 0.8,
  delay = 0,
}: SectionProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const sectionContent = (
    <section
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className={brandClasses.container}>{children}</div>
    </section>
  )

  if (animation === 'none' || !shouldAnimate) {
    return sectionContent
  }

  return (
    <ScrollTrigger
      animation={animation}
      direction={direction}
      duration={duration}
      delay={delay}
    >
      {sectionContent}
    </ScrollTrigger>
  )
}

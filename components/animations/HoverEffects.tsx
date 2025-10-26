'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'

interface HoverEffectsProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  effect?:
    | 'lift'
    | 'glow'
    | 'scale'
    | 'rotate'
    | 'tilt'
    | 'shimmer'
    | 'magnetic'
  intensity?: 'subtle' | 'medium' | 'strong'
  duration?: number
  className?: string
}

const HoverEffects: React.FC<HoverEffectsProps> = ({
  children,
  effect = 'lift',
  intensity = 'medium',
  duration = 0.3,
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: `hover-${effect}`,
      name: `Hover ${effect}`,
      type: 'interaction',
      duration: duration * 1000,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-hover',
        staticFallback: true,
      },
      performance: {
        maxDuration: duration * 1000,
        targetFPS: 60,
        memoryLimit: 8,
        gpuAcceleration: true,
      },
    },
    'hover-effect'
  )

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  const getHoverVariants = () => {
    const intensityMultiplier = {
      subtle: 0.5,
      medium: 1,
      strong: 1.5,
    }

    const multiplier = intensityMultiplier[intensity]

    switch (effect) {
      case 'lift':
        return {
          hover: {
            y: -8 * multiplier,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            transition: {
              duration: optimizedConfig.duration / 1000,
              ease: optimizedConfig.easing,
            },
          },
        }
      case 'glow':
        return {
          hover: {
            boxShadow: `0 0 20px rgba(59, 130, 246, ${0.3 * multiplier})`,
            scale: 1.02 * multiplier,
            transition: {
              duration: optimizedConfig.duration / 1000,
              ease: optimizedConfig.easing,
            },
          },
        }
      case 'scale':
        return {
          hover: {
            scale: 1.05 * multiplier,
            transition: {
              duration: optimizedConfig.duration / 1000,
              ease: optimizedConfig.easing,
            },
          },
        }
      case 'rotate':
        return {
          hover: {
            rotate: 5 * multiplier,
            scale: 1.02 * multiplier,
            transition: {
              duration: optimizedConfig.duration / 1000,
              ease: optimizedConfig.easing,
            },
          },
        }
      case 'tilt':
        return {
          hover: {
            rotateX: 5 * multiplier,
            rotateY: 5 * multiplier,
            scale: 1.02 * multiplier,
            transition: {
              duration: optimizedConfig.duration / 1000,
              ease: optimizedConfig.easing,
            },
          },
        }
      case 'shimmer':
        return {
          hover: {
            background:
              'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
            backgroundPosition: '200% 0',
            transition: {
              duration: optimizedConfig.duration / 1000,
              ease: optimizedConfig.easing,
            },
          },
        }
      case 'magnetic':
        return {
          hover: {
            scale: 1.1 * multiplier,
            transition: {
              duration: optimizedConfig.duration / 1000,
              ease: optimizedConfig.easing,
            },
          },
        }
      default:
        return {
          hover: {
            scale: 1.02 * multiplier,
            transition: {
              duration: optimizedConfig.duration / 1000,
              ease: optimizedConfig.easing,
            },
          },
        }
    }
  }

  const variants = getHoverVariants()

  return (
    <motion.div
      initial='initial'
      whileHover='hover'
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Specialized hover effect components
export const HoverLift: React.FC<Omit<HoverEffectsProps, 'effect'>> = props => (
  <HoverEffects {...props} effect='lift' />
)

export const HoverGlow: React.FC<Omit<HoverEffectsProps, 'effect'>> = props => (
  <HoverEffects {...props} effect='glow' />
)

export const HoverScale: React.FC<
  Omit<HoverEffectsProps, 'effect'>
> = props => <HoverEffects {...props} effect='scale' />

export const HoverRotate: React.FC<
  Omit<HoverEffectsProps, 'effect'>
> = props => <HoverEffects {...props} effect='rotate' />

export const HoverTilt: React.FC<Omit<HoverEffectsProps, 'effect'>> = props => (
  <HoverEffects {...props} effect='tilt' />
)

export const HoverShimmer: React.FC<
  Omit<HoverEffectsProps, 'effect'>
> = props => <HoverEffects {...props} effect='shimmer' />

export const HoverMagnetic: React.FC<
  Omit<HoverEffectsProps, 'effect'>
> = props => <HoverEffects {...props} effect='magnetic' />

// Magnetic hover effect with mouse tracking
interface MagneticHoverProps extends Omit<HoverEffectsProps, 'effect'> {
  strength?: number
  range?: number
}

export const MagneticHover: React.FC<MagneticHoverProps> = ({
  children,
  strength = 0.3,
  range = 50,
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (prefersReducedMotion || !ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering || !ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const clampedDistance = Math.min(distance, range)

      const angle = Math.atan2(deltaY, deltaX)
      const finalX = Math.cos(angle) * clampedDistance
      const finalY = Math.sin(angle) * clampedDistance

      setMousePosition({ x: finalX, y: finalY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setMousePosition({ x: 0, y: 0 })
    }

    const element = ref.current
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isHovering, strength, range, prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Interactive card with multiple hover effects
interface InteractiveCardProps extends Omit<HoverEffectsProps, 'effect'> {
  title: string
  description: string
  icon?: React.ReactNode
  href?: string
  variant?: 'default' | 'feature' | 'service' | 'testimonial'
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  href,
  variant = 'default',
  className,
  ...rest
}) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3, ease: 'ease-out' },
    },
  }

  const content = (
    <motion.div
      variants={cardVariants}
      initial='initial'
      animate='animate'
      whileHover='hover'
      className={`
        group relative overflow-hidden rounded-xl border border-border/40 bg-card p-6
        transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg
        ${className}
      `}
      {...rest}
    >
      {/* Shimmer effect overlay */}
      <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent' />

      {icon && (
        <div className='w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors'>
          <div className='text-blue-500 group-hover:scale-110 transition-transform'>
            {icon}
          </div>
        </div>
      )}

      <h3 className='text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors'>
        {title}
      </h3>
      <p className='text-muted-foreground group-hover:text-foreground/80 transition-colors'>
        {description}
      </p>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} className='block'>
        {content}
      </a>
    )
  }

  return content
}

export default HoverEffects

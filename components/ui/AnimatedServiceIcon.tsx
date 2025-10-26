'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'

interface AnimatedServiceIconProps extends HTMLMotionProps<'div'> {
  icon: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'gradient' | 'outline' | 'solid'
  animation?: 'none' | 'pulse' | 'rotate' | 'bounce' | 'float' | 'glow'
  color?: string
  className?: string
}

const AnimatedServiceIcon: React.FC<AnimatedServiceIconProps> = ({
  icon,
  size = 'md',
  variant = 'default',
  animation = 'pulse',
  color = '#3B82F6',
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: `service-icon-${animation}`,
      name: `Service Icon ${animation}`,
      type: 'interaction',
      duration: 2000,
      easing: 'ease-in-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-icon',
        staticFallback: true,
      },
      performance: {
        maxDuration: 2000,
        targetFPS: 60,
        memoryLimit: 5,
        gpuAcceleration: true,
      },
    },
    'service-icon'
  )

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        {...(rest as any)}
      >
        {icon}
      </div>
    )
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  }

  const variantClasses = {
    default: 'bg-blue-500/10 text-blue-500',
    gradient: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
    outline: 'border-2 border-blue-500 text-blue-500 bg-transparent',
    solid: 'bg-blue-500 text-white',
  }

  const getAnimationVariants = () => {
    switch (animation) {
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          },
          transition: {
            duration: optimizedConfig.duration / 1000,
            repeat: Infinity,
            ease: 'ease-in-out',
          },
        }
      case 'rotate':
        return {
          animate: {
            rotate: [0, 360],
          },
          transition: {
            duration: optimizedConfig.duration / 1000,
            repeat: Infinity,
            ease: 'linear',
          },
        }
      case 'bounce':
        return {
          animate: {
            y: [0, -10, 0],
          },
          transition: {
            duration: optimizedConfig.duration / 1000,
            repeat: Infinity,
            ease: 'ease-in-out',
          },
        }
      case 'float':
        return {
          animate: {
            y: [0, -5, 0],
            rotate: [0, 5, 0],
          },
          transition: {
            duration: optimizedConfig.duration / 1000,
            repeat: Infinity,
            ease: 'ease-in-out',
          },
        }
      case 'glow':
        return {
          animate: {
            boxShadow: [
              `0 0 0 ${color}20`,
              `0 0 20px ${color}40`,
              `0 0 0 ${color}20`,
            ],
          },
          transition: {
            duration: optimizedConfig.duration / 1000,
            repeat: Infinity,
            ease: 'ease-in-out',
          },
        }
      default:
        return {}
    }
  }

  const animationVariants = getAnimationVariants()

  return (
    <motion.div
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-lg flex items-center justify-center
        transition-all duration-300 hover:scale-110
        ${className}
      `}
      style={{ color }}
      {...animationVariants}
      {...(rest as any)}
    >
      <div className='transition-transform duration-300 hover:rotate-12'>
        {icon}
      </div>
    </motion.div>
  )
}

// Specialized service icon components
export const ServiceIconPulse: React.FC<
  Omit<AnimatedServiceIconProps, 'animation'>
> = props => <AnimatedServiceIcon {...props} animation='pulse' />

export const ServiceIconRotate: React.FC<
  Omit<AnimatedServiceIconProps, 'animation'>
> = props => <AnimatedServiceIcon {...props} animation='rotate' />

export const ServiceIconBounce: React.FC<
  Omit<AnimatedServiceIconProps, 'animation'>
> = props => <AnimatedServiceIcon {...props} animation='bounce' />

export const ServiceIconFloat: React.FC<
  Omit<AnimatedServiceIconProps, 'animation'>
> = props => <AnimatedServiceIcon {...props} animation='float' />

export const ServiceIconGlow: React.FC<
  Omit<AnimatedServiceIconProps, 'animation'>
> = props => <AnimatedServiceIcon {...props} animation='glow' />

// Service icon with hover effects
interface ServiceIconHoverProps extends AnimatedServiceIconProps {
  onHover?: () => void
  onLeave?: () => void
}

export const ServiceIconHover: React.FC<ServiceIconHoverProps> = ({
  onHover,
  onLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onLeave?.()
  }

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? 5 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut' as const,
      }}
    >
      <AnimatedServiceIcon {...props} />
    </motion.div>
  )
}

// Service icon grid
interface ServiceIconGridProps {
  icons: Array<{
    icon: React.ReactNode
    title: string
    description?: string
    color?: string
    animation?: AnimatedServiceIconProps['animation']
  }>
  columns?: number
  className?: string
}

export const ServiceIconGrid: React.FC<ServiceIconGridProps> = ({
  icons,
  columns = 3,
  className,
}) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }

  return (
    <div
      className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6 ${className}`}
    >
      {icons.map((item, index) => (
        <div key={index} className='text-center group'>
          <ServiceIconHover
            icon={item.icon}
            color={item.color}
            animation={item.animation}
            className='mx-auto mb-4'
          />
          <h3 className='text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors'>
            {item.title}
          </h3>
          {item.description && (
            <p className='text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors'>
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default AnimatedServiceIcon

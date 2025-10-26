'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !shouldAnimate) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
      whileTap={shouldAnimate ? { scale: 0.95 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

interface RippleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  rippleColor?: string
}

export function RippleButton({
  children,
  onClick,
  className,
  rippleColor = 'rgba(255, 255, 255, 0.6)',
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<
    Array<{
      id: number
      x: number
      y: number
    }>
  >([])

  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const handleClick = (e: React.MouseEvent) => {
    if (!shouldAnimate) {
      onClick?.()
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  return (
    <motion.button
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
      whileHover={shouldAnimate ? { scale: 1.02 } : undefined}
      whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
      {shouldAnimate &&
        ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className='absolute pointer-events-none rounded-full'
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{ width: 0, height: 0, x: '-50%', y: '-50%' }}
            animate={{ width: 200, height: 200, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          />
        ))}
    </motion.button>
  )
}

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltMax?: number
  perspective?: number
}

export function TiltCard({
  children,
  className,
  tiltMax = 15,
  perspective = 1000,
}: TiltCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!shouldAnimate) return

    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateX = ((e.clientY - centerY) / rect.height) * tiltMax
    const rotateY = ((e.clientX - centerX) / rect.width) * tiltMax

    setMousePosition({ x: rotateY, y: rotateX })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      className={cn('relative', className)}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: shouldAnimate ? mousePosition.y : 0,
        rotateY: shouldAnimate ? mousePosition.x : 0,
        scale: isHovered && shouldAnimate ? 1.05 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
    >
      {children}
    </motion.div>
  )
}

interface FloatingActionProps {
  children: React.ReactNode
  className?: string
  floatDistance?: number
  floatDuration?: number
}

export function FloatingAction({
  children,
  className,
  floatDistance = 10,
  floatDuration = 2,
}: FloatingActionProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  return (
    <motion.div
      className={cn('inline-block', className)}
      animate={
        shouldAnimate
          ? {
              y: [-floatDistance, floatDistance, -floatDistance],
            }
          : {}
      }
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      }}
    >
      {children}
    </motion.div>
  )
}

interface MorphingIconProps {
  icon: React.ComponentType<any>
  className?: string
  morphDuration?: number
}

export function MorphingIcon({
  icon: Icon,
  className,
  morphDuration = 2,
}: MorphingIconProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  return (
    <motion.div
      className={cn('inline-block', className)}
      animate={
        shouldAnimate
          ? {
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }
          : {}
      }
      transition={{
        duration: morphDuration,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      }}
    >
      <Icon />
    </motion.div>
  )
}

interface StaggeredRevealProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function StaggeredReveal({
  children,
  className,
  staggerDelay = 0.1,
  direction = 'up',
}: StaggeredRevealProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const directionMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  }

  const initial = directionMap[direction]

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, ...initial }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
          }}
          viewport={{ once: true }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

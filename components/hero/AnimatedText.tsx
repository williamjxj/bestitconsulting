/**
 * AnimatedText component with typewriter effect
 * Provides engaging text animations for hero sections
 */

'use client'

import { motion, useAnimation } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'

interface AnimatedTextProps {
  children: ReactNode
  typewriter?: boolean
  typewriterSpeed?: number
  typewriterDelay?: number
  animation?: 'fade' | 'slide' | 'scale' | 'typewriter'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  stagger?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  fallback?: ReactNode
}

export const AnimatedText = ({
  children,
  typewriter = false,
  typewriterSpeed = 50,
  typewriterDelay = 0,
  animation = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  stagger = 0.1,
  className = '',
  as = 'div',
  fallback,
}: AnimatedTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const controls = useAnimation()
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  // Typewriter effect
  useEffect(() => {
    if (!typewriter || typeof children !== 'string') return

    const text = children as string
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        currentIndex++
        timeoutId = setTimeout(typeNextChar, typewriterSpeed)
      } else {
        setIsTyping(false)
      }
    }

    const startTyping = () => {
      setIsTyping(true)
      setDisplayText('')
      currentIndex = 0
      timeoutId = setTimeout(typeNextChar, typewriterDelay)
    }

    startTyping()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [children, typewriter, typewriterSpeed, typewriterDelay])

  // Get animation variants based on type
  const getAnimationVariants = () => {
    if (reducedMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    }

    const baseVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }

    switch (animation) {
      case 'slide':
        return {
          ...baseVariants,
          initial: {
            ...baseVariants.initial,
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
            x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
          },
          animate: { ...baseVariants.animate, y: 0, x: 0 },
          exit: {
            ...baseVariants.exit,
            y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0,
            x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
          },
        }
      case 'scale':
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, scale: 0.8 },
          animate: { ...baseVariants.animate, scale: 1 },
          exit: { ...baseVariants.exit, scale: 0.8 },
        }
      case 'typewriter':
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, width: 0 },
          animate: { ...baseVariants.animate, width: 'auto' },
          exit: { ...baseVariants.exit, width: 0 },
        }
      case 'fade':
      default:
        return baseVariants
    }
  }

  const variants = getAnimationVariants()

  // Adjust duration for mobile
  const adjustedDuration =
    deviceType === 'mobile' ? Math.min(duration, 0.4) : duration

  // If reduced motion and fallback is provided, show fallback
  if (reducedMotion && fallback) {
    return <>{fallback}</>
  }

  const MotionComponent = motion[as] as any

  return (
    <MotionComponent
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{
        duration: reducedMotion ? 0.1 : adjustedDuration,
        delay: reducedMotion ? 0 : delay,
        ease: reducedMotion ? 'linear' : 'easeOut',
        staggerChildren: stagger,
      }}
      className={className}
      aria-label={isTyping ? 'Text is being typed' : 'Text is complete'}
    >
      {typewriter ? displayText : children}
      {typewriter && isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className='inline-block w-0.5 h-6 bg-current ml-1'
          aria-hidden='true'
        />
      )}
    </MotionComponent>
  )
}

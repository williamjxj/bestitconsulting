/**
 * TypewriterText animation component
 * Provides typewriter effect for text animations
 */

'use client'

import { motion, useAnimation } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'

interface TypewriterTextProps {
  children: ReactNode
  speed?: number
  delay?: number
  pauseAtEnd?: number
  className?: string
  as?: keyof typeof motion | string
  fallback?: ReactNode
}

export const TypewriterText = ({
  children,
  speed = 50,
  delay = 0,
  pauseAtEnd = 1000,
  className = '',
  as = 'div',
  fallback,
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  // Adjust speed for mobile and reduced motion
  const adjustedSpeed = reducedMotion
    ? 0
    : deviceType === 'mobile'
      ? speed * 2
      : speed

  useEffect(() => {
    if (typeof children !== 'string' || reducedMotion) {
      setDisplayText(children as string)
      return
    }

    const text = children as string
    let timeoutId: NodeJS.Timeout

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)
        setIsTyping(true)
        timeoutId = setTimeout(typeNextChar, adjustedSpeed)
      } else {
        setIsTyping(false)
        // Pause at end before restarting
        if (pauseAtEnd > 0) {
          timeoutId = setTimeout(() => {
            setCurrentIndex(0)
            setDisplayText('')
          }, pauseAtEnd)
        }
      }
    }

    const startTyping = () => {
      timeoutId = setTimeout(typeNextChar, delay)
    }

    startTyping()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [children, adjustedSpeed, delay, pauseAtEnd, currentIndex, reducedMotion])

  // If reduced motion and fallback is provided, show fallback
  if (reducedMotion && fallback) {
    return <>{fallback}</>
  }

  return (
    <motion.div
      className={className}
      aria-label={isTyping ? 'Text is being typed' : 'Text is complete'}
    >
      {displayText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className='inline-block w-0.5 h-6 bg-current ml-1'
          aria-hidden='true'
        />
      )}
    </motion.div>
  )
}

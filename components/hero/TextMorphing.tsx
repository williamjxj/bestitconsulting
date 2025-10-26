/**
 * Text morphing animation component
 * Smoothly transitions between different text states
 */

'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface TextMorphingProps {
  texts: string[]
  duration?: number
  delay?: number
  className?: string
  respectReducedMotion?: boolean
  onTextChange?: (text: string, index: number) => void
}

export const TextMorphing: React.FC<TextMorphingProps> = ({
  texts,
  duration = 3000,
  delay = 0,
  className = '',
  respectReducedMotion = true,
  onTextChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const { prefersReducedMotion } = useAccessibility()

  // Text morphing effect
  useEffect(() => {
    if (respectReducedMotion && prefersReducedMotion) {
      return
    }

    if (texts.length <= 1) return

    const morphText = () => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % texts.length
        onTextChange?.(texts[nextIndex], nextIndex)
        return nextIndex
      })
    }

    // Start morphing after delay
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(morphText, duration)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    texts,
    duration,
    delay,
    onTextChange,
    respectReducedMotion,
    prefersReducedMotion,
  ])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return <span className={className}>{texts[0]}</span>
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode='wait'>
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className='inline-block'
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default TextMorphing

/**
 * Typewriter quote component
 * Creates typewriter effect for testimonial quotes
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface TypewriterQuoteProps {
  text: string
  speed?: number
  delay?: number
  cursor?: boolean
  cursorBlink?: boolean
  className?: string
  respectReducedMotion?: boolean
  onComplete?: () => void
}

export const TypewriterQuote: React.FC<TypewriterQuoteProps> = ({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorBlink = true,
  className = '',
  respectReducedMotion = true,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { preferences } = useAccessibility()

  // Typewriter effect
  useEffect(() => {
    if (respectReducedMotion && preferences.reducedMotion) {
      setDisplayedText(text)
      onComplete?.()
      return
    }

    const typeText = () => {
      setIsTyping(true)
      let index = 0

      const typeChar = () => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
          timeoutRef.current = setTimeout(typeChar, speed)
        } else {
          setIsTyping(false)
          onComplete?.()
        }
      }

      // Start typing after delay
      timeoutRef.current = setTimeout(typeChar, delay)
    }

    typeText()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [
    text,
    speed,
    delay,
    onComplete,
    respectReducedMotion,
    preferences.reducedMotion,
  ])

  // Cursor blink effect
  useEffect(() => {
    if (
      !cursor ||
      !cursorBlink ||
      (respectReducedMotion && preferences.reducedMotion)
    ) {
      setShowCursor(true)
      return
    }

    const blinkCursor = () => {
      setShowCursor(prev => !prev)
      cursorTimeoutRef.current = setTimeout(blinkCursor, 500)
    }

    cursorTimeoutRef.current = setTimeout(blinkCursor, 500)

    return () => {
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current)
      }
    }
  }, [cursor, cursorBlink, respectReducedMotion, preferences.reducedMotion])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current)
      }
    }
  }, [])

  // Quote variants
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  // Cursor variants
  const cursorVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    blink: {
      opacity: [1, 0, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className={`relative ${className}`}
      variants={quoteVariants}
      initial='initial'
      animate='animate'
      transition={{ duration: 0.5 }}
    >
      <motion.span className='text-lg font-medium text-gray-700'>
        "{displayedText}"
      </motion.span>

      {cursor && showCursor && (
        <motion.span
          className='inline-block w-0.5 h-6 bg-current ml-1'
          variants={cursorVariants}
          initial='initial'
          animate='blink'
        />
      )}
    </motion.div>
  )
}

export default TypewriterQuote

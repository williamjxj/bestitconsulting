/**
 * Typewriter effect for headlines
 * Creates animated typing effect for text
 */

'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface TypewriterHeadlineProps {
  text: string
  speed?: number
  delay?: number
  cursor?: boolean
  cursorBlink?: boolean
  className?: string
  onComplete?: () => void
  respectReducedMotion?: boolean
}

export const TypewriterHeadline: React.FC<TypewriterHeadlineProps> = ({
  text,
  speed = 100,
  delay = 0,
  cursor = true,
  cursorBlink = true,
  className = '',
  onComplete,
  respectReducedMotion = true,
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { prefersReducedMotion } = useAccessibility()

  // Typewriter effect
  useEffect(() => {
    if (respectReducedMotion && prefersReducedMotion) {
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
    prefersReducedMotion,
  ])

  // Cursor blink effect
  useEffect(() => {
    if (
      !cursor ||
      !cursorBlink ||
      (respectReducedMotion && prefersReducedMotion)
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
  }, [cursor, cursorBlink, respectReducedMotion, prefersReducedMotion])

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

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      {cursor && showCursor && (
        <motion.span
          className='inline-block w-0.5 h-full bg-current ml-1'
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.span>
  )
}

export default TypewriterHeadline

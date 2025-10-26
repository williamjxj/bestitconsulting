'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'

interface AnimatedHeadlineProps {
  text: string
  className?: string
}

/**
 * Animated headline component with character-by-character stagger animation
 * Each word is wrapped in a div with overflow:hidden for smooth reveal effect
 */
export const AnimatedHeadline = ({
  text,
  className,
}: AnimatedHeadlineProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  useEffect(() => {
    if (!shouldAnimate || !containerRef.current) return

    const words = text.split(' ')
    const chars = words.map(word => word.split(''))

    // Create GSAP timeline
    const tl = gsap.timeline()

    // Animate each character
    chars.forEach((wordChars, wordIndex) => {
      wordChars.forEach((char, charIndex) => {
        const charElement = containerRef.current?.querySelector(
          `[data-char="${wordIndex}-${charIndex}"]`
        )
        if (charElement) {
          tl.fromTo(
            charElement,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
            wordIndex * 0.1 + charIndex * 0.05
          )
        }
      })
    })
  }, [shouldAnimate, text])

  if (!shouldAnimate) {
    return <div className={className}>{text}</div>
  }

  return (
    <div className={className} ref={containerRef}>
      {text.split(' ').map((word, wordIndex) => (
        <div key={wordIndex} className='inline-block overflow-hidden mr-2'>
          {word.split('').map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              data-char={`${wordIndex}-${charIndex}`}
              className={`inline-block ${
                wordIndex === 0
                  ? 'text-white'
                  : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400 bg-[length:200%_100%] animate-text-shimmer'
              }`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

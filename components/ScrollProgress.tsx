'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ScrollProgressProps {
  className?: string
  color?: string
  height?: number
  show?: boolean
}

/**
 * ScrollProgress Component
 *
 * A scroll progress indicator that shows reading progress
 * Implements smooth animations with accessibility support
 */
export function ScrollProgress({
  className = '',
  color = 'var(--primary-500)',
  height = 4,
  show = true,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight

      // Show progress bar when user has scrolled 10% of the page
      setIsVisible(scrollPercent > 0.1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show || !isVisible) return null

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{ height: `${height}px` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='w-full origin-left'
        style={{
          scaleX,
          backgroundColor: color,
          height: '100%',
        }}
      />
    </motion.div>
  )
}

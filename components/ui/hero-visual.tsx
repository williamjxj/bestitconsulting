'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { cn } from '@/lib/utils'

interface HeroVisualProps {
  className?: string
  variant?: 'tech' | 'business' | 'creative' | 'minimal'
  animated?: boolean
  particles?: boolean
  gradient?: boolean
}

const techPatterns = [
  { x: 10, y: 20, size: 4, delay: 0 },
  { x: 80, y: 30, size: 6, delay: 0.5 },
  { x: 60, y: 70, size: 3, delay: 1 },
  { x: 30, y: 80, size: 5, delay: 1.5 },
  { x: 90, y: 60, size: 4, delay: 2 },
]

export function HeroVisual({
  className,
  variant = 'tech',
  animated = true,
  particles = true,
  gradient = true,
}: HeroVisualProps) {
  const [mounted, setMounted] = useState(false)
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Disable animations for reduced motion or mobile if needed
  const shouldAnimate =
    animated && !reducedMotion && (deviceType !== 'mobile' || true)

  if (!mounted) {
    return (
      <div
        className={cn('w-full h-full bg-gray-100 animate-pulse', className)}
      />
    )
  }

  const renderTechPattern = () => (
    <div className='absolute inset-0 overflow-hidden'>
      {techPatterns.map((pattern, index) => (
        <motion.div
          key={index}
          className='absolute bg-blue-500/20 rounded-full'
          style={{
            left: `${pattern.x}%`,
            top: `${pattern.y}%`,
            width: `${pattern.size * 4}px`,
            height: `${pattern.size * 4}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            shouldAnimate
              ? {
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }
              : { opacity: 0.3, scale: 1 }
          }
          transition={{
            duration: 3,
            delay: pattern.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  )

  const renderBusinessPattern = () => (
    <div className='absolute inset-0'>
      <svg
        className='w-full h-full'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
      >
        <defs>
          <linearGradient
            id='businessGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#3B82F6' stopOpacity='0.1' />
            <stop offset='100%' stopColor='#1E40AF' stopOpacity='0.3' />
          </linearGradient>
        </defs>
        <motion.path
          d='M0,50 Q25,20 50,50 T100,50'
          stroke='url(#businessGradient)'
          strokeWidth='0.5'
          fill='none'
          initial={{ pathLength: 0 }}
          animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.path
          d='M0,30 Q25,60 50,30 T100,30'
          stroke='url(#businessGradient)'
          strokeWidth='0.3'
          fill='none'
          initial={{ pathLength: 0 }}
          animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
        />
      </svg>
    </div>
  )

  const renderCreativePattern = () => (
    <div className='absolute inset-0'>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            shouldAnimate
              ? {
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }
              : { opacity: 0.2, scale: 1 }
          }
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )

  const renderMinimalPattern = () => (
    <div className='absolute inset-0 flex items-center justify-center'>
      <motion.div
        className='w-32 h-32 border-2 border-gray-300 rounded-full'
        initial={{ scale: 0, opacity: 0 }}
        animate={
          shouldAnimate
            ? {
                scale: [0, 1, 0.8, 1],
                opacity: [0, 0.5, 0.3, 0.5],
              }
            : { scale: 1, opacity: 0.3 }
        }
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.div
        className='absolute w-16 h-16 border border-gray-400 rounded-full'
        initial={{ scale: 0, opacity: 0 }}
        animate={
          shouldAnimate
            ? {
                scale: [0, 1, 0.9, 1],
                opacity: [0, 0.7, 0.5, 0.7],
              }
            : { scale: 1, opacity: 0.5 }
        }
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
      />
    </div>
  )

  const renderPattern = () => {
    switch (variant) {
      case 'tech':
        return renderTechPattern()
      case 'business':
        return renderBusinessPattern()
      case 'creative':
        return renderCreativePattern()
      case 'minimal':
        return renderMinimalPattern()
      default:
        return renderTechPattern()
    }
  }

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {gradient && (
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' />
      )}

      {particles && renderPattern()}

      {/* Floating elements */}
      {shouldAnimate && (
        <motion.div
          className='absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full'
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {shouldAnimate && (
        <motion.div
          className='absolute top-3/4 right-1/4 w-6 h-6 bg-purple-400/20 rounded-full'
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      )}
    </div>
  )
}

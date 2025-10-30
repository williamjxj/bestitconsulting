'use client'

import React from 'react'
import { motion, MotionStyle, Transition } from 'motion/react'
import { cn } from '@/lib/utils'

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: Transition
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
  borderWidth?: number
  children?: React.ReactNode
}

export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
  children,
}: BorderBeamProps) {
  return (
    <div className={cn('relative rounded-2xl', className)}>
      {/* animated beam border */}
      <div
        className='pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-composite:intersect] [mask-clip:padding-box,border-box]'
        style={
          { '--border-beam-width': `${borderWidth}px` } as React.CSSProperties
        }
        aria-hidden
      >
        <motion.div
          className={cn(
            'absolute aspect-square',
            'bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent'
          )}
          style={
            {
              width: size,
              offsetPath: `rect(0 auto auto 0 round ${size}px)`,
              '--color-from': colorFrom,
              '--color-to': colorTo,
              ...style,
            } as MotionStyle
          }
          initial={{ offsetDistance: `${initialOffset}%` }}
          animate={{
            offsetDistance: reverse
              ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
              : [`${initialOffset}%`, `${100 + initialOffset}%`],
          }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration,
            delay: -delay,
            ...transition,
          }}
        />
      </div>
      {/* content */}
      {children ? (
        <div className='relative rounded-[inherit]'>{children}</div>
      ) : null}
    </div>
  )
}

export default BorderBeam

'use client'

import Image from 'next/image'
import React from 'react'

interface IconCloudProps {
  images: string[]
  size?: number // container size in px
  radius?: number // ring radius in px
}

/**
 * Lightweight IconCloud compatible with MagicUI API surface.
 * Renders icons arranged on a circular ring that spins slowly.
 */
export function IconCloud({ images, size = 360, radius = 120 }: IconCloudProps) {
  const itemCount = images.length
  const center = size / 2

  return (
    <div
      className='relative select-none'
      style={{ width: size, height: size }}
      aria-label='Technology icon cloud'
      role='img'
    >
      {/* spinning layer */}
      <div
        className='absolute inset-0 animate-spin'
        style={{ animationDuration: '28s' }}
      >
        {images.map((src, index) => {
          const angle = (index / itemCount) * Math.PI * 2
          const x = center + radius * Math.cos(angle)
          const y = center + radius * Math.sin(angle)
          return (
            <div
              key={index}
              className='absolute'
              style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
            >
              <div className='rounded-xl bg-white/80 backdrop-blur border border-gray-200 shadow-md p-2 hover:shadow-lg transition-shadow'>
                {/* Use next/image for optimization; fall back gracefully if remote domain blocked */}
                <Image
                  src={src}
                  alt='tech icon'
                  width={28}
                  height={28}
                  className='object-contain'
                />
              </div>
            </div>
          )
        })}
      </div>
      {/* subtle center glow */}
      <div className='pointer-events-none absolute inset-0 rounded-full bg-gradient-radial from-blue-500/5 to-transparent' />
    </div>
  )
}

export default IconCloud



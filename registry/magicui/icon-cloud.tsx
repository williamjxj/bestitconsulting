'use client'
import React, { useEffect, useMemo, useRef } from 'react'

interface IconCloudProps {
  images: string[]
  size?: number // container size in px
  radius?: number // sphere radius in px
}

function generateSpherePoints(count: number): Array<{ x: number; y: number; z: number }> {
  const points: Array<{ x: number; y: number; z: number }> = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    points.push({ x, y, z })
  }
  return points
}

/**
 * Lightweight IconCloud compatible with MagicUI API surface.
 * Renders icons arranged on a circular ring that spins slowly.
 */
export function IconCloud({ images, size = 420, radius = 140 }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLDivElement[]>([])
  const requestRef = useRef<number | null>(null)

  const points = useMemo(() => generateSpherePoints(images.length), [images.length])

  const yawRef = useRef(0)
  const pitchRef = useRef(0)
  const targetYawRef = useRef(0)
  const targetPitchRef = useRef(0)
  const spinSpeedRef = useRef(0.02) // increase for a more noticeable auto-rotation

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      // gentle constant spin
      yawRef.current += spinSpeedRef.current
      // ease toward cursor target
      yawRef.current = lerp(yawRef.current, targetYawRef.current, 0.06)
      pitchRef.current = lerp(pitchRef.current, targetPitchRef.current, 0.06)

      const yaw = yawRef.current
      const pitch = pitchRef.current
      const sinY = Math.sin(yaw)
      const cosY = Math.cos(yaw)
      const sinP = Math.sin(pitch)
      const cosP = Math.cos(pitch)
      const center = size / 2

      for (let i = 0; i < points.length; i++) {
        const el = itemRefs.current[i]
        if (!el) continue
        const p = points[i]
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY
        const y1 = p.y
        const y2 = y1 * cosP - z1 * sinP
        const z2 = y1 * sinP + z1 * cosP
        const x2 = x1

        const depth = (z2 + 1) / 2
        const scale = 0.6 + depth * 0.7
        const opacity = 0.4 + depth * 0.6
        const tx = center + x2 * radius
        const ty = center + y2 * radius

        el.style.transform = `translate3d(${tx - 16}px, ${ty - 16}px, 0) scale(${scale})`
        el.style.opacity = String(opacity)
        el.style.zIndex = String(1 + Math.round(depth * 100))
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      targetYawRef.current = (x - 0.5) * Math.PI
      targetPitchRef.current = (0.5 - y) * (Math.PI / 3)
    }

    const onMouseLeave = () => {
      targetYawRef.current = 0
      targetPitchRef.current = 0
    }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [points, size, radius])

  return (
    <div
      ref={containerRef}
      className='relative select-none'
      style={{ width: size, height: size, perspective: '800px' }}
      aria-label='Technology icon cloud'
      role='img'
    >
      {images.map((src, index) => (
        <div
          key={index}
          ref={el => {
            if (el) itemRefs.current[index] = el
          }}
          className='absolute will-change-transform transition-transform duration-75 ease-out'
          style={{ left: 0, top: 0, width: 32, height: 32, transform: 'translate3d(0,0,0)' }}
        >
          <img
            src={src}
            alt='tech icon'
            width={28}
            height={28}
            className='object-contain'
            loading='lazy'
            decoding='async'
            onError={e => {
              const el = e.currentTarget as HTMLImageElement
              el.style.display = 'none'
            }}
          />
        </div>
      ))}
      <div className='pointer-events-none absolute inset-0 rounded-full bg-gradient-radial from-blue-500/5 to-transparent' />
    </div>
  )
}

export default IconCloud



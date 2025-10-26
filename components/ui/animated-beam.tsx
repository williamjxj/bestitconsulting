'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedBeamProps {
  className?: string
  containerRef: React.RefObject<HTMLDivElement>
  fromRef: React.RefObject<HTMLDivElement>
  toRef: React.RefObject<HTMLDivElement>
  curvature?: number
  reverse?: boolean
  duration?: number
  delay?: number
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = 'gray',
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = '#ffaa40',
  gradientStopColor = '#9c40ff',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  // Create stable IDs based on component props to avoid hydration mismatches
  const gradientId = `gradient-${gradientStartColor.replace('#', '')}-${gradientStopColor.replace('#', '')}-${curvature}`
  const pathId = `path-${gradientId}`

  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const updatePath = () => {
      if (
        !containerRef.current ||
        !fromRef.current ||
        !toRef.current ||
        !pathRef.current ||
        !svgRef.current
      ) {
        return
      }

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      const fromX =
        fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset
      const fromY =
        fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset
      const toX =
        toRect.left - containerRect.left + toRect.width / 2 + endXOffset
      const toY =
        toRect.top - containerRect.top + toRect.height / 2 + endYOffset

      const midX = (fromX + toX) / 2
      const midY = (fromY + toY) / 2

      const controlX = midX + curvature
      const controlY = midY

      const pathData = `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`

      pathRef.current.setAttribute('d', pathData)

      // Update SVG dimensions
      const svgWidth = Math.max(fromX, toX) + 50
      const svgHeight = Math.max(fromY, toY) + 50

      svgRef.current.setAttribute('width', svgWidth.toString())
      svgRef.current.setAttribute('height', svgHeight.toString())
      svgRef.current.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
    }

    updatePath()

    const handleResize = () => updatePath()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      ref={svgRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor={gradientStartColor} stopOpacity='0' />
          <stop offset='50%' stopColor={gradientStartColor} stopOpacity='1' />
          <stop offset='100%' stopColor={gradientStopColor} stopOpacity='1' />
        </linearGradient>
      </defs>

      {/* Background path */}
      <path
        ref={pathRef}
        d=''
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        fill='none'
        strokeLinecap='round'
      />

      {/* Animated beam */}
      <path
        d=''
        stroke={`url(#${gradientId})`}
        strokeWidth={pathWidth + 1}
        fill='none'
        strokeLinecap='round'
        strokeDasharray='1000'
        strokeDashoffset='1000'
        style={{
          animation: `beam ${duration}s ease-in-out ${delay}s infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      />

      <style jsx>{`
        @keyframes beam {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  )
}

/**
 * Image zoom component
 * Provides zoom and pan functionality for portfolio images
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface ImageZoomProps {
  src: string
  alt: string
  maxZoom?: number
  minZoom?: number
  zoomStep?: number
  className?: string
  respectReducedMotion?: boolean
  onZoomChange?: (zoom: number) => void
}

export const ImageZoom: React.FC<ImageZoomProps> = ({
  src,
  alt,
  maxZoom = 3,
  minZoom = 1,
  zoomStep = 0.2,
  className = '',
  respectReducedMotion = true,
  onZoomChange,
}) => {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Handle zoom
  const handleZoom = useCallback(
    (delta: number) => {
      if (respectReducedMotion && preferences.reducedMotion) return

      setZoom(prev => {
        const newZoom = Math.max(minZoom, Math.min(maxZoom, prev + delta))
        onZoomChange?.(newZoom)
        return newZoom
      })
    },
    [
      maxZoom,
      minZoom,
      onZoomChange,
      respectReducedMotion,
      preferences.reducedMotion,
    ]
  )

  // Handle wheel zoom
  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      event.preventDefault()
      const delta = event.deltaY > 0 ? -zoomStep : zoomStep
      handleZoom(delta)
    },
    [zoomStep, handleZoom]
  )

  // Handle mouse drag
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (zoom <= 1) return

      setIsDragging(true)
      setDragStart({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      })
    },
    [zoom, position]
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isDragging || zoom <= 1) return

      setPosition({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y,
      })
    },
    [isDragging, dragStart, zoom]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Handle touch events
  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (zoom <= 1) return

      const touch = event.touches[0]
      setIsDragging(true)
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      })
    },
    [zoom, position]
  )

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!isDragging || zoom <= 1) return

      const touch = event.touches[0]
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      })
    },
    [isDragging, dragStart, zoom]
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Reset zoom and position
  const resetZoom = useCallback(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    onZoomChange?.(1)
  }, [onZoomChange])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        resetZoom()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [resetZoom])

  // Image variants
  const imageVariants = {
    initial: { scale: 1, x: 0, y: 0 },
    zoomed: { scale: zoom, x: position.x, y: position.y },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className='w-full h-full object-contain'
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        className='w-full h-full object-contain cursor-grab active:cursor-grabbing'
        variants={imageVariants}
        initial='initial'
        animate='zoomed'
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          transformOrigin: 'center center',
        }}
      />

      {/* Zoom controls */}
      <div className='absolute top-4 right-4 flex space-x-2'>
        <motion.button
          onClick={() => handleZoom(-zoomStep)}
          className='w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-black'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          −
        </motion.button>

        <motion.button
          onClick={() => handleZoom(zoomStep)}
          className='w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-black'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          +
        </motion.button>

        <motion.button
          onClick={resetZoom}
          className='w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-black'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ⌂
        </motion.button>
      </div>

      {/* Zoom indicator */}
      <div className='absolute bottom-4 left-4 bg-white/80 rounded px-2 py-1 text-sm'>
        {Math.round(zoom * 100)}%
      </div>
    </div>
  )
}

export default ImageZoom

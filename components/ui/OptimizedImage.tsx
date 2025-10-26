'use client'

import React from 'react'
import Image from 'next/image'
import { VisualAsset } from '../../lib/types'
import { useDevicePerformance } from '../../hooks/usePerformance'
import { useReducedMotion } from '../../hooks/useAccessibility'

interface OptimizedImageProps {
  asset: VisualAsset
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  asset,
  priority = false,
  className,
  sizes,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
}) => {
  const { deviceTier } = useDevicePerformance()
  const prefersReducedMotion = useReducedMotion()

  // Adjust quality based on device performance
  const adjustedQuality = deviceTier === 'low' ? Math.min(quality, 60) : quality

  // Get optimized image props
  const imageProps = {
    src: asset.src,
    alt: asset.alt,
    width: asset.width,
    height: asset.height,
  }

  // Generate blur placeholder if not provided
  const generateBlurDataURL = () => {
    if (blurDataURL) return blurDataURL

    // Create a simple blur placeholder
    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, 10, 10)
    }
    return canvas.toDataURL()
  }

  // Handle loading states
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  // Fallback for error state
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
      >
        <div className='text-gray-500 text-sm'>Failed to load image</div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className='absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center'>
          <div className='w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin' />
        </div>
      )}

      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        priority={priority}
        quality={adjustedQuality}
        sizes={
          sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        }
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? generateBlurDataURL() : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </div>
  )
}

// Hero image component with enhanced features
interface HeroImageProps extends OptimizedImageProps {
  overlay?: boolean
  overlayOpacity?: number
  overlayGradient?: string
  children?: React.ReactNode
}

export const HeroImage: React.FC<HeroImageProps> = ({
  asset,
  overlay = true,
  overlayOpacity = 0.4,
  overlayGradient = 'from-black/40 to-transparent',
  children,
  className,
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        asset={asset}
        className='w-full h-full'
        priority={true}
        {...props}
      />

      {overlay && (
        <div
          className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {children && (
        <div className='absolute inset-0 flex items-center justify-center'>
          {children}
        </div>
      )}
    </div>
  )
}

// Gallery image component
interface GalleryImageProps extends OptimizedImageProps {
  index: number
  total: number
  onImageClick?: (index: number) => void
  showOverlay?: boolean
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  asset,
  index,
  total,
  onImageClick,
  showOverlay = true,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      className={`relative group cursor-pointer ${className}`}
      onClick={() => onImageClick?.(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <OptimizedImage
        asset={asset}
        className='w-full h-full transition-transform duration-300 group-hover:scale-105'
        {...props}
      />

      {showOverlay && (
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-white text-center'>
              <div className='text-2xl font-bold'>{index + 1}</div>
              <div className='text-sm opacity-80'>of {total}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Responsive image grid
interface ResponsiveImageGridProps {
  images: VisualAsset[]
  columns?: number
  gap?: number
  onImageClick?: (index: number) => void
  className?: string
}

export const ResponsiveImageGrid: React.FC<ResponsiveImageGridProps> = ({
  images,
  columns = 3,
  gap = 4,
  onImageClick,
  className,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div
      className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-${gap} ${className}`}
    >
      {images.map((image, index) => (
        <GalleryImage
          key={image.id}
          asset={image}
          index={index}
          total={images.length}
          onImageClick={onImageClick}
          className='aspect-square'
        />
      ))}
    </div>
  )
}

export default OptimizedImage

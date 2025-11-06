'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  getOptimizedImageUrl,
  getBestSupportedFormat,
  generatePlaceholder,
} from '@/lib/r2-media'

interface R2ImageProps {
  assetId?: string
  src?: string
  alt: string
  width?: number
  height?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  quality?: number
  sizes?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
  fill?: boolean
  category?: string
}

export default function R2Image({
  assetId,
  src,
  alt,
  width,
  height,
  format,
  quality = 80,
  sizes,
  priority = false,
  loading = 'lazy',
  placeholder = 'blur',
  blurDataURL,
  className,
  style,
  onLoad,
  onError,
  fill,
  category,
}: R2ImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Get the best supported format if not specified
  const imageFormat = format || getBestSupportedFormat()

  // Generate optimized image URL
  const imageUrl =
    src ||
    (assetId
      ? getOptimizedImageUrl(assetId, {
          width,
          height,
          format: imageFormat as any,
          quality,
        })
      : null)

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // If no valid URL, return placeholder
  if (!imageUrl) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <span className='text-gray-500 text-sm'>Image unavailable</span>
      </div>
    )
  }

  // Generate placeholder if not provided (only on client side after hydration)
  const placeholderUrl =
    blurDataURL ||
    (placeholder === 'blur' && width && height && isClient
      ? generatePlaceholder(width, height)
      : undefined)

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <span className='text-gray-500 text-sm'>Image unavailable</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && isClient && placeholderUrl && (
        <Image
          src={placeholderUrl}
          alt=''
          width={width}
          height={height}
          className='absolute inset-0 object-cover blur-sm'
          priority={priority}
        />
      )}
      <Image
        src={imageUrl}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        loading={loading}
        placeholder={
          isClient && placeholder === 'blur' && placeholderUrl
            ? 'blur'
            : 'empty'
        }
        blurDataURL={isClient ? placeholderUrl : undefined}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => {
          setIsLoading(false)
          onLoad?.()
        }}
        onError={() => {
          setImageError(true)
          onError?.()
        }}
      />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { ScaleIn } from '@/components/animations/ScaleIn'

interface R2ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  fill?: boolean
  sizes?: string
  animation?: 'fade' | 'slide' | 'scale' | 'none'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  hover?: boolean
  overlay?: boolean
  overlayContent?: React.ReactNode
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

export function R2Image({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  quality = 90,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  animation = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  hover = true,
  overlay = false,
  overlayContent,
  aspectRatio = 'auto',
  objectFit = 'cover',
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
}: R2ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: '',
  }

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  const imageElement = (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg',
        aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {hasError ? (
        <div className='flex items-center justify-center bg-gray-100 text-gray-500 w-full h-full min-h-[200px]'>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
            <p className='text-sm'>Image not available</p>
          </div>
        </div>
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            className={cn(
              'transition-all duration-500',
              objectFitClasses[objectFit],
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
              hover && 'group-hover:scale-105'
            )}
            priority={priority}
            quality={quality}
            sizes={sizes}
            loading={loading}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            onLoad={handleLoad}
            onError={handleError}
          />

          {/* Loading skeleton */}
          {!isLoaded && !hasError && (
            <div className='absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse'>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer'></div>
            </div>
          )}

          {/* Overlay */}
          {overlay && overlayContent && (
            <div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              {overlayContent}
            </div>
          )}
        </>
      )}
    </div>
  )

  // Apply animations based on type
  switch (animation) {
    case 'fade':
      return (
        <FadeIn delay={delay} duration={duration}>
          {imageElement}
        </FadeIn>
      )
    case 'slide':
      return (
        <SlideIn direction={direction} delay={delay} duration={duration}>
          {imageElement}
        </SlideIn>
      )
    case 'scale':
      return (
        <ScaleIn delay={delay} duration={duration}>
          {imageElement}
        </ScaleIn>
      )
    case 'none':
    default:
      return imageElement
  }
}

// Specialized components for common use cases
export function R2HeroImage(props: Omit<R2ImageProps, 'priority' | 'sizes'>) {
  return (
    <R2Image
      {...props}
      priority={true}
      sizes='100vw'
      quality={95}
      className={cn('w-full h-full', props.className)}
    />
  )
}

export function R2CardImage(
  props: Omit<R2ImageProps, 'sizes' | 'aspectRatio' | 'fill'>
) {
  return (
    <R2Image
      {...props}
      fill={true}
      aspectRatio='video'
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      className={cn('w-full', props.className)}
    />
  )
}

export function R2ProfileImage(
  props: Omit<R2ImageProps, 'aspectRatio' | 'sizes'>
) {
  return (
    <R2Image
      {...props}
      aspectRatio='square'
      sizes='(max-width: 768px) 150px, 200px'
      className={cn('w-32 h-32 md:w-40 md:h-40', props.className)}
    />
  )
}

export function R2GalleryImage(props: Omit<R2ImageProps, 'sizes'>) {
  return (
    <R2Image
      {...props}
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
      hover={true}
      overlay={true}
      overlayContent={
        <div className='text-white text-center'>
          <svg
            className='w-8 h-8 mx-auto mb-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
            />
          </svg>
          <p className='text-sm font-medium'>View Details</p>
        </div>
      }
    />
  )
}

// Video component for R2 videos
interface R2VideoProps {
  src: string
  poster?: string
  className?: string
  controls?: boolean
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  animation?: 'fade' | 'slide' | 'scale' | 'none'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
}

export function R2Video({
  src,
  poster,
  className,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  animation = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: R2VideoProps) {
  const videoElement = (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      <video
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        className='w-full h-full object-cover'
      />
    </div>
  )

  // Apply animations based on type
  switch (animation) {
    case 'fade':
      return (
        <FadeIn delay={delay} duration={duration}>
          {videoElement}
        </FadeIn>
      )
    case 'slide':
      return (
        <SlideIn direction={direction} delay={delay} duration={duration}>
          {videoElement}
        </SlideIn>
      )
    case 'scale':
      return (
        <ScaleIn delay={delay} duration={duration}>
          {videoElement}
        </ScaleIn>
      )
    case 'none':
    default:
      return videoElement
  }
}

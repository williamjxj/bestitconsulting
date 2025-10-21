/**
 * Skeleton Loading Components
 *
 * Provides skeleton loading states for media components
 * with smooth animations and responsive design.
 */

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  children?: React.ReactNode
}

/**
 * Base skeleton component with pulse animation
 */
export function Skeleton({
  className,
  children,
  ...props
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Image skeleton with aspect ratio
 */
interface ImageSkeletonProps extends SkeletonProps {
  width?: number
  height?: number
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait'
}

export function ImageSkeleton({
  width = 300,
  height = 200,
  aspectRatio,
  className,
  ...props
}: ImageSkeletonProps) {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/9]',
    portrait: 'aspect-[3/4]',
  }

  return (
    <Skeleton
      className={cn(
        'w-full',
        aspectRatio ? aspectClasses[aspectRatio] : '',
        className
      )}
      style={{ width, height }}
      {...props}
    />
  )
}

/**
 * Gallery skeleton for multiple images
 */
interface GallerySkeletonProps extends SkeletonProps {
  itemCount?: number
  columns?: number
  itemHeight?: number
}

export function GallerySkeleton({
  itemCount = 6,
  columns = 3,
  itemHeight = 200,
  className,
  ...props
}: GallerySkeletonProps) {
  return (
    <div
      className={cn('grid gap-4', `grid-cols-${columns}`, className)}
      {...props}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <ImageSkeleton key={index} height={itemHeight} aspectRatio='square' />
      ))}
    </div>
  )
}

/**
 * Text skeleton for loading text content
 */
interface TextSkeletonProps extends SkeletonProps {
  lines?: number
  width?: string
}

export function TextSkeleton({
  lines = 1,
  width = '100%',
  className,
  ...props
}: TextSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn('h-4', index === lines - 1 ? 'w-3/4' : 'w-full')}
          style={{ width: index === lines - 1 ? '75%' : width }}
        />
      ))}
    </div>
  )
}

/**
 * Card skeleton for media cards
 */
interface CardSkeletonProps extends SkeletonProps {
  showText?: boolean
  showImage?: boolean
}

export function CardSkeleton({
  showText = true,
  showImage = true,
  className,
  ...props
}: CardSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {showImage && <ImageSkeleton aspectRatio='square' />}
      {showText && (
        <div className='space-y-2'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-3 w-1/2' />
        </div>
      )}
    </div>
  )
}

/**
 * Media gallery skeleton with responsive grid
 */
interface MediaGallerySkeletonProps extends SkeletonProps {
  itemCount?: number
  layout?: 'grid' | 'carousel' | 'masonry'
}

export function MediaGallerySkeleton({
  itemCount = 8,
  layout = 'grid',
  className,
  ...props
}: MediaGallerySkeletonProps) {
  const gridClasses = {
    grid: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
    carousel: 'grid-cols-1',
    masonry: 'columns-2 md:columns-3 lg:columns-4',
  }

  return (
    <div
      className={cn('grid gap-4', gridClasses[layout], className)}
      {...props}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}

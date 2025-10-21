'use client'

import { useState, useEffect } from 'react'
import R2Image from './R2Image'
import { MediaAsset, getMediaAssets } from '@/lib/r2-media'
import { getGridColumns } from '@/lib/media-config'
import { MediaGallerySkeleton } from '@/components/ui/skeleton'

interface MediaGalleryProps {
  category: 'team' | 'company'
  title: string
  description?: string
  layout?: 'grid' | 'carousel' | 'masonry'
  maxItems?: number
  showTitles?: boolean
  enableLazyLoading?: boolean
  className?: string
}

export default function MediaGallery({
  category,
  title,
  description,
  layout = 'grid',
  maxItems = 12,
  showTitles = true,
  enableLazyLoading = true,
  className = '',
}: MediaGalleryProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const mediaAssets = getMediaAssets(category)
        const displayAssets = mediaAssets.slice(0, maxItems)

        setAssets(displayAssets)
      } catch (err) {
        setError('Failed to load media assets')
        console.error('Error loading media assets:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadAssets()
  }, [category, maxItems])

  const getGridClasses = () => {
    const baseClasses = 'grid gap-4'

    switch (layout) {
      case 'grid':
        return `${baseClasses} grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6`
      case 'carousel':
        return `${baseClasses} grid-cols-1`
      case 'masonry':
        return `${baseClasses} columns-2 md:columns-3 lg:columns-4`
      default:
        return `${baseClasses} grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
    }
  }

  if (isLoading) {
    return (
      <section className={`py-8 ${className}`}>
        {showTitles && (
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h2>
            {description && <p className='text-gray-600'>{description}</p>}
          </div>
        )}
        <MediaGallerySkeleton itemCount={maxItems} layout={layout} />
      </section>
    )
  }

  if (error) {
    return (
      <section className={`py-8 ${className}`}>
        {showTitles && (
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h2>
            {description && <p className='text-gray-600'>{description}</p>}
          </div>
        )}
        <div className='text-center py-8'>
          <div className='text-gray-500 dark:text-gray-400'>
            <svg
              className='w-12 h-12 mx-auto mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
            <p className='text-lg font-medium mb-2'>Unable to load media</p>
            <p className='text-sm'>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (assets.length === 0) {
    return (
      <section className={`py-8 ${className}`}>
        {showTitles && (
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h2>
            {description && <p className='text-gray-600'>{description}</p>}
          </div>
        )}
        <div className='text-center py-8'>
          <div className='text-gray-500 dark:text-gray-400'>
            <svg
              className='w-12 h-12 mx-auto mb-4'
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
            <p className='text-lg font-medium mb-2'>No media available</p>
            <p className='text-sm'>Check back later for new content</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-8 ${className}`}>
      {showTitles && (
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h2>
          {description && <p className='text-gray-600'>{description}</p>}
        </div>
      )}

      <div className={getGridClasses()}>
        {assets.map((asset, index) => (
          <div
            key={asset.id}
            className='group cursor-pointer'
            style={{
              animationDelay: enableLazyLoading ? `${index * 0.1}s` : '0s',
            }}
          >
            <div className='relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105'>
              <R2Image
                src={asset.filename}
                alt={asset.alt}
                width={asset.width || 300}
                height={asset.height || 200}
                category={asset.category}
                className='w-full h-full object-cover'
                priority={index < 4} // Prioritize first 4 images
              />

              {/* Overlay on hover */}
              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <svg
                    className='w-8 h-8 text-white'
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

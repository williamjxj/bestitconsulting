'use client'

import Image from 'next/image'
import { Cloud } from 'lucide-react'
import { useState } from 'react'

interface R2ImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export default function R2Image({ src, alt, width, height }: R2ImageProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className='relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100'>
      {!imageError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          onError={() => {
            console.warn('R2 image failed to load:', src)
            setImageError(true)
          }}
          className='object-cover w-full h-full'
        />
      )}
      {/* Fallback content when image fails */}
      {imageError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
          <div className='text-center p-8'>
            <Cloud className='h-16 w-16 text-blue-400 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              R2 Image Not Found
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              Expected:{' '}
              <code className='bg-gray-100 px-2 py-1 rounded text-xs'>
                {src}
              </code>
            </p>
            <p className='text-xs text-gray-500'>
              Upload <code>jimeng-1.png</code> to your R2 bucket or update the
              image key in the code.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

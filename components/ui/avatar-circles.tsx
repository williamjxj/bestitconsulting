'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface Avatar {
  imageUrl: string
  profileUrl?: string
}
interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: Avatar[]
}

// Helper function to get initials from a name (fallback)
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

// Individual avatar component to handle state properly
const AvatarItem = ({
  imageUrl,
  index,
}: {
  imageUrl: string
  index: number
}) => {
  const [imageError, setImageError] = React.useState(false)
  const showFallback = !imageUrl || imageError

  return (
    <div
      className='h-10 w-10 rounded-full border-[1px] overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center'
      style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      {showFallback ? (
        <span className='text-xs font-semibold text-white'>
          {getInitials(`User ${index + 1}`)}
        </span>
      ) : (
        <img
          className='h-full w-full object-cover rounded-full'
          src={imageUrl}
          width={40}
          height={40}
          alt={`Professional ${index + 1}`}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  )
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn('z-10 flex -space-x-4 rtl:space-x-reverse', className)}>
      {avatarUrls.map((url, index) => (
        <AvatarItem key={index} imageUrl={url.imageUrl} index={index} />
      ))}
      {(numPeople ?? 0) > 0 && (
        <div
          className='flex h-10 w-10 items-center justify-center rounded-full border-[1px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-center text-xs font-medium text-white'
          style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
        >
          +{numPeople}
        </div>
      )}
    </div>
  )
}

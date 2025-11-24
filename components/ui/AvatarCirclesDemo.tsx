'use client'

import { AvatarCircles } from '@/components/ui/avatar-circles'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
  featured?: boolean
  keyResults: string[]
  industry: string
  year: string
}

interface AvatarCirclesDemoProps {
  testimonials?: Testimonial[]
  numPeople?: number
}

export function AvatarCirclesDemo({
  testimonials = [],
  numPeople = 99,
}: AvatarCirclesDemoProps) {
  // Use actual avatar photos from testimonials, fallback to first 6 if available
  const avatars = testimonials
    .filter(t => t.avatar) // Only include testimonials with avatar photos
    .slice(0, 6) // Take first 6 with photos
    .map(t => ({
      imageUrl: t.avatar!,
    }))

  // If no testimonials provided or no avatars, use default fallback
  if (avatars.length === 0) {
    return (
      <div className='flex w-full items-center justify-center'>
        <AvatarCircles numPeople={numPeople} avatarUrls={[]} />
      </div>
    )
  }

  return (
    <div className='flex w-full items-center justify-center'>
      <AvatarCircles numPeople={numPeople} avatarUrls={avatars} />
    </div>
  )
}

export default AvatarCirclesDemo

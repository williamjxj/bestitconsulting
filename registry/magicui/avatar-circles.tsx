'use client'

import Image from 'next/image'

interface AvatarItem {
  imageUrl: string
  profileUrl?: string
}

interface AvatarCirclesProps {
  avatarUrls: AvatarItem[]
  numPeople?: number
  size?: number // container size in px
  radius?: number // ring radius in px
}

/**
 * MagicUI-compatible AvatarCircles.
 * Renders a circular ring of avatars with a subtle spin and a "+N" indicator in the center.
 */
export function AvatarCircles({
  avatarUrls,
  numPeople = 99,
  size = 220,
  radius = 76,
}: AvatarCirclesProps) {
  const center = size / 2
  const count = avatarUrls.length

  return (
    <div
      className='relative select-none'
      style={{ width: size, height: size }}
      aria-label='Client avatars'
    >
      {/* ring background */}
      <div className='absolute inset-0 rounded-full bg-white/50 backdrop-blur-md border border-gray-200 shadow-inner' />
      {/* spinning avatars */}
      <div className='absolute inset-0 animate-spin-slow' style={{ animationDuration: '36s' }}>
        {avatarUrls.map((item, i) => {
          const angle = (i / count) * Math.PI * 2
          const x = center + radius * Math.cos(angle)
          const y = center + radius * Math.sin(angle)
          const avatar = (
            <div
              key={i}
              className='absolute'
              style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
            >
              <div className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-md'>
                <Image
                  src={item.imageUrl}
                  alt='avatar'
                  width={40}
                  height={40}
                  className='object-cover'
                />
              </div>
            </div>
          )
          return item.profileUrl ? (
            <a key={i} href={item.profileUrl} target='_blank' rel='noreferrer'>
              {avatar}
            </a>
          ) : (
            avatar
          )
        })}
      </div>
      {/* center count */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-medium shadow'>
          +{numPeople}
        </div>
      </div>
    </div>
  )
}

export default AvatarCircles

// utility: slow spin animation
declare global {
  interface HTMLElementTagNameMap {}
}



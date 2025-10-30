"use client"

import Image from "next/image"
import React from "react"

/**
 * AvatarCircles renders a decorative ring of avatars positioned around a circle.
 * Defaults closely match Magic UI's Avatar Circles size and spacing.
 */
export interface AvatarCirclesProps {
  /** Array of image URLs to render as avatars around the circle */
  images: string[]
  /** Outer diameter in pixels of the avatar ring container */
  size?: number
  /** Diameter in pixels of each small avatar */
  avatarSize?: number
  /** Optional className for the outer wrapper */
  className?: string
  /** Optional aria-label; decorative by default */
  ariaLabel?: string
}

export const AvatarCircles: React.FC<AvatarCirclesProps> = ({
  images,
  size = 320,
  avatarSize = 44,
  className = "",
  ariaLabel = "Decorative avatar circle",
}) => {
  const radius = size / 2
  const innerRadius = radius - avatarSize / 2 - 6 // small inward offset for spacing

  // Clamp to at most 12 avatars for visual clarity similar to Magic UI
  const items = images.slice(0, Math.min(images.length, 12))
  const count = items.length

  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
    >
      {/* subtle glow ring */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-2xl"
        aria-hidden
      />

      {/* center soft dot */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/30" aria-hidden />

      {/* avatars placed around circle */}
      {items.map((src, index) => {
        const angle = (index / count) * 2 * Math.PI - Math.PI / 2 // start at top
        const x = radius + innerRadius * Math.cos(angle)
        const y = radius + innerRadius * Math.sin(angle)

        const half = avatarSize / 2
        const left = x - half
        const top = y - half

        // soft shadow and ring to match look
        const avatarClass =
          "rounded-full ring-2 ring-white shadow-[0_2px_10px_rgba(0,0,0,0.12)]"

        return (
          <div
            key={`${src}-${index}`}
            className="absolute"
            style={{ left, top, width: avatarSize, height: avatarSize }}
            aria-hidden
          >
            <Image
              src={src}
              alt=""
              width={avatarSize}
              height={avatarSize}
              className={avatarClass}
            />
          </div>
        )
      })}

      {/* tiny orbit dots for flair */}
      {[0, 1, 2].map(i => {
        const angle = (i / 3) * 2 * Math.PI + Math.PI / 6
        const x = radius + (innerRadius - 16) * Math.cos(angle)
        const y = radius + (innerRadius - 16) * Math.sin(angle)
        return (
          <div
            key={`dot-${i}`}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
            style={{ left: x - 1, top: y - 1 }}
            aria-hidden
          />
        )
      })}
    </div>
  )
}

export default AvatarCircles

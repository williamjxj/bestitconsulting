/**
 * MarqueeStyles component
 * Injects marquee animation styles that Tailwind v4 may not include in compiled CSS
 */

'use client'

import { useEffect } from 'react'

export function MarqueeStyles() {
  useEffect(() => {
    const styleId = 'marquee-animation-styles'

    // Check if styles already exist
    if (document.getElementById(styleId)) {
      return
    }

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes marquee {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(calc(-100% - var(--gap, 1rem)));
        }
      }

      @keyframes marquee-reverse {
        from {
          transform: translateX(calc(-100% - var(--gap, 1rem)));
        }
        to {
          transform: translateX(0);
        }
      }

      @keyframes marquee-vertical {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(calc(-100% - var(--gap, 1rem)));
        }
      }

      @keyframes marquee-vertical-reverse {
        from {
          transform: translateY(calc(-100% - var(--gap, 1rem)));
        }
        to {
          transform: translateY(0);
        }
      }

      .animate-marquee {
        animation: marquee var(--duration, 40s) infinite linear;
      }

      .animate-marquee-reverse {
        animation: marquee-reverse var(--duration, 40s) infinite linear;
      }

      .animate-marquee-vertical {
        animation: marquee-vertical var(--duration, 40s) linear infinite;
      }

      .animate-marquee-vertical-reverse {
        animation: marquee-vertical-reverse var(--duration, 40s) linear infinite;
      }
    `
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  return null
}

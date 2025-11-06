# Quickstart Guide: UI Animation Consolidation

**Date**: 2025-01-27
**Feature**: UI Animation Consolidation
**Purpose**: Get started quickly with implementing enhanced animations, design consolidation, and R2 media integration

## Prerequisites

- Node.js 18+ and npm/yarn
- Next.js 15.2.4+ project setup
- Framer Motion library installed
- Cloudflare R2 bucket configured
- TypeScript 5+ with strict mode

## Installation

### 1. Install Required Dependencies

```bash
# Core animation library
npm install framer-motion

# Development dependencies
npm install -D @types/node @types/react @types/react-dom
```

### 2. Verify R2 Configuration

Ensure your environment variables are set:

```bash
# .env.local
NEXT_PUBLIC_R2_BASE_URL=https://your-bucket.r2.cloudflarestorage.com
NEXT_PUBLIC_R2_MORE_URL=https://your-media-bucket.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name
```

## Quick Implementation

### 1. Create Animated Components

Create the base animated components in `components/`:

```typescript
// components/ScrollReveal.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  threshold?: number
  duration?: number
  easing?: string
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.2,
  duration = 0.8,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  className
}: ScrollRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

```typescript
// components/AnimatedButton.tsx
'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface AnimatedButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  hover?: {
    scale?: number
    rotate?: number
  }
  click?: {
    scale?: number
    duration?: number
  }
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
  hover = { scale: 1.05 },
  click = { scale: 0.95, duration: 0.1 }
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={!disabled ? hover : undefined}
      whileTap={!disabled ? click : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button
        variant={variant}
        size={size}
        disabled={disabled || loading}
        onClick={onClick}
        className={className}
      >
        {loading ? 'Loading...' : children}
      </Button>
    </motion.div>
  )
}
```

### 2. Create Animation Utilities

```typescript
// lib/animations.ts
export const animationPresets = {
  fadeInUp: {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  fadeInDown: {
    initial: { y: -60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  slideInLeft: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  slideInRight: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}
```

### 3. Implement R2 Media Components

```typescript
// components/R2Image.tsx
'use client'
import Image from 'next/image'
import { useState } from 'react'

interface R2ImageProps {
  assetId: string
  alt: string
  width?: number
  height?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  quality?: number
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export default function R2Image({
  assetId,
  alt,
  width,
  height,
  format = 'webp',
  quality = 80,
  className,
  onLoad,
  onError
}: R2ImageProps) {
  const [imageError, setImageError] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL
  const imageUrl = `${baseUrl}/media/${assetId}?format=${format}&quality=${quality}`

  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Image unavailable</span>
      </div>
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onLoad={onLoad}
      onError={() => {
        setImageError(true)
        onError?.()
      }}
      loading="lazy"
      quality={quality}
    />
  )
}
```

### 4. Update Page Components

Apply animations to existing pages:

```typescript
// app/page.tsx
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedButton from '@/components/AnimatedButton'
import R2Image from '@/components/R2Image'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Animation */}
      <section className="relative min-h-screen flex items-center">
        <ScrollReveal>
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to BestIT Consulting
            </h1>
            <p className="text-xl mb-8">
              Transform your business with our expert IT consulting services.
            </p>
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/contact'}
            >
              Get Started
            </AnimatedButton>
          </div>
        </ScrollReveal>
      </section>

      {/* Features Section with Staggered Animation */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">
              Our Services
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <R2Image
                    assetId={feature.imageId}
                    alt={feature.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

## Testing

### 1. Component Testing

```typescript
// tests/components/ScrollReveal.test.tsx
import { render, screen } from '@testing-library/react'
import ScrollReveal from '@/components/ScrollReveal'

describe('ScrollReveal', () => {
  it('renders children correctly', () => {
    render(
      <ScrollReveal>
        <div>Test content</div>
      </ScrollReveal>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
```

### 2. Performance Testing

```typescript
// tests/performance/animations.test.ts
import { testPerformance } from '@/lib/performance'

describe('Animation Performance', () => {
  it('maintains 60fps during animations', async () => {
    const performance = await testPerformance(() => {
      // Trigger animations
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.dispatchEvent(new Event('scroll'))
      })
    })

    expect(performance.fps).toBeGreaterThanOrEqual(60)
  })
})
```

### 3. Accessibility Testing

```typescript
// tests/accessibility/animations.test.ts
import { testAccessibility } from '@/lib/accessibility'

describe('Animation Accessibility', () => {
  it('respects reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
      })),
    })

    const accessibility = testAccessibility()
    expect(accessibility.reducedMotion).toBe(true)
  })
})
```

## Performance Optimization

### 1. Lazy Loading

```typescript
// lib/lazy-loading.ts
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-lazy]')
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.lazy!
        img.classList.remove('lazy')
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach(img => imageObserver.observe(img))
}
```

### 2. Animation Performance

```typescript
// lib/performance.ts
export const optimizeAnimations = () => {
  // Use CSS transforms for GPU acceleration
  const animatedElements = document.querySelectorAll('[data-animate]')
  animatedElements.forEach(el => {
    el.style.willChange = 'transform, opacity'
  })

  // Clean up after animations
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.style.willChange = 'auto'
    })
  }, 1000)
}
```

## Troubleshooting

### Common Issues

1. **Animations not triggering**: Check that elements are in viewport and threshold is correct
2. **Performance issues**: Ensure animations use CSS transforms, not layout properties
3. **R2 images not loading**: Verify environment variables and bucket permissions
4. **Accessibility issues**: Test with screen readers and reduced motion preferences

### Debug Tools

```typescript
// lib/debug.ts
export const debugAnimations = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Animation Debug Info:', {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches,
      performance: performance.now(),
      animations: document.querySelectorAll('[data-animate]').length,
    })
  }
}
```

## Next Steps

1. **Implement remaining components**: AnimatedCard, AnimatedSection, AnimatedText
2. **Add more animation presets**: Custom animations for specific use cases
3. **Optimize performance**: Monitor and optimize animation performance
4. **Test across browsers**: Ensure compatibility with all target browsers
5. **Document components**: Add JSDoc comments and usage examples

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Best Practices](https://web.dev/performance/)

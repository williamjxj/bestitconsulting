# Quickstart: Visual Enhancements

**Feature**: 003-visual-enhancements  
**Date**: 2024-12-19  
**Purpose**: Quick start guide for implementing visual enhancements

## Prerequisites

- Next.js 15.2.4+ with React 19
- TypeScript 5+
- Tailwind CSS v4
- Framer Motion 12.23.24+
- GSAP 3.13.0+

## Installation

### 1. Install Dependencies

```bash
npm install framer-motion@12.23.24 gsap@3.13.0
npm install -D @types/gsap
```

### 2. Install shadcn/ui Components

```bash
npx shadcn-ui@latest add button card badge
npx shadcn-ui@latest add avatar card dialog
```

### 3. Configure Tailwind CSS

Add to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
}
```

## Basic Implementation

### 1. Create Animation Components

Create `components/animations/FadeIn.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className 
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration, 
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 2. Create Visual Effect Components

Create `components/visual-effects/ParallaxScroll.tsx`:

```typescript
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export function ParallaxScroll({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className 
}: ParallaxScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? ['0%', '-50%'] : ['0%', '50%']
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 3. Create Interactive Components

Create `components/interactive/ImageGallery.tsx`:

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedIndex(index)}
          className="cursor-pointer overflow-hidden rounded-lg"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-4xl"
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={images[selectedIndex].width}
                height={images[selectedIndex].height}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

## Advanced Features

### 1. Performance Optimization

Create `lib/performance.ts`:

```typescript
export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    function measureFPS() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    }

    measureFPS();
  }, []);

  return { fps, memoryUsage };
}
```

### 2. Accessibility Support

Create `lib/accessibility.ts`:

```typescript
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
```

### 3. Animation Hooks

Create `hooks/useAnimations.ts`:

```typescript
import { useReducedMotion } from '@/lib/accessibility';

export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion();

  return {
    duration: prefersReducedMotion ? 0 : 0.5,
    ease: 'easeOut',
    reducedMotion: prefersReducedMotion,
  };
}
```

## Usage Examples

### 1. Page Transitions

```typescript
import { FadeIn } from '@/components/animations/FadeIn';

export default function HomePage() {
  return (
    <FadeIn>
      <h1>Welcome to Our Site</h1>
      <p>This content will fade in smoothly.</p>
    </FadeIn>
  );
}
```

### 2. Scroll Animations

```typescript
import { ParallaxScroll } from '@/components/visual-effects/ParallaxScroll';

export default function HeroSection() {
  return (
    <ParallaxScroll speed={0.5} direction="up">
      <div className="h-screen bg-gradient-to-b from-blue-500 to-purple-600">
        <h1>Hero Content</h1>
      </div>
    </ParallaxScroll>
  );
}
```

### 3. Interactive Elements

```typescript
import { ImageGallery } from '@/components/interactive/ImageGallery';

export default function Portfolio() {
  const images = [
    { src: '/portfolio/1.jpg', alt: 'Project 1', width: 800, height: 600 },
    { src: '/portfolio/2.jpg', alt: 'Project 2', width: 800, height: 600 },
  ];

  return (
    <div>
      <h2>Our Portfolio</h2>
      <ImageGallery images={images} />
    </div>
  );
}
```

## Testing

### 1. Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { FadeIn } from '@/components/animations/FadeIn';

test('FadeIn component renders children', () => {
  render(
    <FadeIn>
      <div>Test content</div>
    </FadeIn>
  );
  
  expect(screen.getByText('Test content')).toBeInTheDocument();
});
```

### 2. Performance Tests

```typescript
import { performance } from 'perf_hooks';

test('Animation performance', () => {
  const start = performance.now();
  
  // Render component with animation
  render(<FadeIn><div>Test</div></FadeIn>);
  
  const end = performance.now();
  expect(end - start).toBeLessThan(100); // Should render in < 100ms
});
```

## Best Practices

1. **Performance**: Always use `transform` and `opacity` for animations
2. **Accessibility**: Respect `prefers-reduced-motion` preferences
3. **Mobile**: Test on actual mobile devices, not just browser dev tools
4. **Memory**: Clean up animation listeners and timers
5. **Testing**: Test animations with different performance budgets

## Troubleshooting

### Common Issues

1. **Animations not working**: Check if Framer Motion is properly installed
2. **Performance issues**: Use React DevTools Profiler to identify bottlenecks
3. **Accessibility issues**: Test with screen readers and keyboard navigation
4. **Mobile issues**: Test on actual devices, not just browser dev tools

### Debug Tools

```typescript
// Add to your component for debugging
console.log('Animation state:', { isAnimating, progress });
```

## Next Steps

1. Implement more complex animations
2. Add performance monitoring
3. Create animation presets
4. Add accessibility features
5. Optimize for mobile devices

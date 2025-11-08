# Carousel API Contract

## Overview
The contact page hero carousel uses shadcn/ui Carousel component with Embla Carousel. This document defines the component interface and usage.

## Component Interface

### Carousel Props
```typescript
interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  className?: string
  children: React.ReactNode
}
```

### Carousel Options
```typescript
interface CarouselOptions {
  align?: "start" | "center" | "end"
  loop?: boolean
  skipSnaps?: boolean
  dragFree?: boolean
  containScroll?: string
  duration?: number
  startIndex?: number
  slidesToScroll?: number
}
```

## Usage Contract

### Basic Carousel Structure
```typescript
<Carousel opts={{ loop: true }}>
  <CarouselContent>
    <CarouselItem>
      {/* Slide content */}
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Autoplay Plugin Contract

**Plugin:** `embla-carousel-autoplay`

**Options:**
```typescript
interface AutoplayOptions {
  delay?: number // Milliseconds between slides (default: 4000)
  stopOnInteraction?: boolean // Pause on user interaction (default: true)
  stopOnMouseEnter?: boolean // Pause on hover (default: true)
  stopOnFocusIn?: boolean // Pause on focus (default: true)
  rootNode?: HTMLElement // Root element for visibility detection
}
```

**Usage:**
```typescript
import Autoplay from "embla-carousel-autoplay"

<Carousel
  plugins={[
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
    }),
  ]}
>
```

## Contact Page Carousel Contract

### Slide Data Structure
```typescript
interface CarouselSlide {
  id: number
  content: string
  order: number
}
```

### Slide Content
```typescript
const slides = [
  {
    id: 1,
    content: "We offer complimentary technical consulting sessions to help businesses explore innovative software and AI solutions. Case studies or tailored solution details can be provided upon request.",
    order: 1
  },
  {
    id: 2,
    content: "Free Technical Consulting: Get expert guidance from our senior engineers — at no cost. We help startups and enterprises solve real-world challenges through modern software architecture, AI integration, and system optimization.",
    order: 2
  },
  {
    id: 3,
    content: "Tell us your goals, and we'll provide tailored insights or a case study relevant to your project. Let's explore how the right technology can move your business forward.",
    order: 3
  }
]
```

### Component Implementation Contract
```typescript
interface ContactHeroCarouselProps {
  slides: CarouselSlide[]
  autoplayDelay?: number
  className?: string
}
```

## Accessibility Contract

### ARIA Attributes
- `role="region"` on Carousel container
- `aria-roledescription="carousel"` on Carousel container
- `role="group"` on CarouselItem
- `aria-roledescription="slide"` on CarouselItem
- `aria-label` on navigation buttons

### Keyboard Navigation
- **Arrow Left:** Previous slide
- **Arrow Right:** Next slide
- **Tab:** Navigate to carousel controls
- **Enter/Space:** Activate button

### Screen Reader Support
- Announce slide changes
- Describe carousel controls
- Indicate current slide position

## Performance Contract

### Autoplay Behavior
- Pauses when tab is not visible (Page Visibility API)
- Pauses on user interaction (click, touch, keyboard)
- Pauses on hover (desktop)
- Resumes when tab becomes visible

### Animation Performance
- 60fps transitions
- GPU-accelerated transforms
- Respects `prefers-reduced-motion`

## Error Handling

### No Slides
- Don't render carousel
- Show fallback content or empty state

### Slide Load Error
- Skip to next slide
- Log error in development

### Animation Error
- Fallback to instant transition
- Continue carousel functionality

## Styling Contract

### Tailwind CSS Classes
- Use existing hero section gradient background
- Match existing typography styles
- Maintain responsive design
- Support dark mode if applicable

### Custom Styles
```typescript
const carouselStyles = {
  container: "relative w-full",
  content: "flex",
  item: "min-w-0 shrink-0 grow-0 basis-full",
  navigation: "absolute top-1/2 -translate-y-1/2",
  previous: "left-4",
  next: "right-4"
}
```

## Integration Contract

### With Translation System
```typescript
const { t } = useI18n()

const slides = [
  {
    id: 1,
    content: t('carousel.slide1', 'contact'),
    order: 1
  },
  // ...
]
```

### With Framer Motion
```typescript
import { motion } from 'framer-motion'

<CarouselItem>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {slide.content}
  </motion.div>
</CarouselItem>
```

## Testing Contract

### Unit Tests
- Carousel renders with slides
- Navigation buttons work
- Autoplay advances slides
- Loop functionality works

### Integration Tests
- Keyboard navigation
- Touch gestures (mobile)
- Autoplay pause/resume
- Translation integration

### Accessibility Tests
- Screen reader compatibility
- Keyboard navigation
- Focus management
- ARIA attributes


# AnimatedSection Component

A flexible and performant animated section component built with Framer Motion that provides scroll-triggered animations and accessibility features.

## Features

- **Scroll-triggered animations**: Animations trigger when elements come into view
- **Accessibility support**: Respects `prefers-reduced-motion` setting
- **Mobile optimization**: Optimized animations for mobile devices
- **Performance focused**: Uses GPU acceleration and efficient rendering
- **Flexible API**: Supports multiple animation types and custom configurations

## Usage

### Basic Usage

```tsx
import { AnimatedSection } from '@/components/AnimatedSection'

function MyComponent() {
  return (
    <AnimatedSection>
      <h2>Animated Content</h2>
      <p>This content will animate when it comes into view.</p>
    </AnimatedSection>
  )
}
```

### With Animation Type

```tsx
<AnimatedSection animation='fadeInUp'>
  <h2>Fade In Up Animation</h2>
  <p>This section will fade in from below.</p>
</AnimatedSection>
```

### With Custom Delay

```tsx
<AnimatedSection animation='slideInLeft' delay={0.5}>
  <h2>Delayed Animation</h2>
  <p>This animation will start after a 0.5s delay.</p>
</AnimatedSection>
```

### With Custom Styling

```tsx
<AnimatedSection animation='scaleIn' className='bg-blue-50 p-8 rounded-lg'>
  <h2>Custom Styled Section</h2>
  <p>This section has custom styling applied.</p>
</AnimatedSection>
```

## Props

| Prop        | Type                                                        | Default      | Description                                |
| ----------- | ----------------------------------------------------------- | ------------ | ------------------------------------------ |
| `children`  | `ReactNode`                                                 | -            | Content to be animated                     |
| `animation` | `'fadeInUp' \| 'slideInLeft' \| 'scaleIn' \| 'staggerFade'` | `'fadeInUp'` | Animation type to apply                    |
| `delay`     | `number`                                                    | `0`          | Delay before animation starts (in seconds) |
| `className` | `string`                                                    | `''`         | Additional CSS classes                     |
| `as`        | `keyof JSX.IntrinsicElements`                               | `'section'`  | HTML element to render                     |
| `...rest`   | `HTMLAttributes`                                            | -            | Additional HTML attributes                 |

## Animation Types

### fadeInUp

Elements fade in from below with a subtle upward movement.

```tsx
<AnimatedSection animation='fadeInUp'>
  <h2>Fade In Up</h2>
</AnimatedSection>
```

### slideInLeft

Elements slide in from the left side of the screen.

```tsx
<AnimatedSection animation='slideInLeft'>
  <h2>Slide In Left</h2>
</AnimatedSection>
```

### scaleIn

Elements scale in from the center with a zoom effect.

```tsx
<AnimatedSection animation='scaleIn'>
  <h2>Scale In</h2>
</AnimatedSection>
```

### staggerFade

Multiple child elements fade in with a staggered delay.

```tsx
<AnimatedSection animation='staggerFade'>
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</AnimatedSection>
```

## Accessibility

The component automatically respects the user's motion preferences:

- **Reduced motion**: Animations are disabled when `prefers-reduced-motion: reduce` is set
- **Keyboard navigation**: Maintains focus management during animations
- **Screen readers**: Provides appropriate ARIA attributes

## Performance

### Mobile Optimization

- Reduced animation complexity on mobile devices
- Optimized viewport detection
- Efficient memory usage

### GPU Acceleration

- Uses `transform` and `opacity` for smooth animations
- Leverages hardware acceleration
- Minimizes layout thrashing

### Intersection Observer

- Efficient scroll detection
- Automatic cleanup
- Minimal performance impact

## Examples

### Hero Section

```tsx
<AnimatedSection animation='fadeInUp' className='hero-section'>
  <h1>Welcome to BestIT Consulting</h1>
  <p>Transform your business with our innovative IT solutions.</p>
  <button>Get Started</button>
</AnimatedSection>
```

### Feature Grid

```tsx
<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
  <AnimatedSection animation='fadeInUp' delay={0.1}>
    <div className='feature-card'>
      <h3>Feature 1</h3>
      <p>Description of feature 1</p>
    </div>
  </AnimatedSection>

  <AnimatedSection animation='fadeInUp' delay={0.2}>
    <div className='feature-card'>
      <h3>Feature 2</h3>
      <p>Description of feature 2</p>
    </div>
  </AnimatedSection>

  <AnimatedSection animation='fadeInUp' delay={0.3}>
    <div className='feature-card'>
      <h3>Feature 3</h3>
      <p>Description of feature 3</p>
    </div>
  </AnimatedSection>
</div>
```

### Testimonial Section

```tsx
<AnimatedSection animation='slideInLeft' className='testimonial'>
  <blockquote>
    "BestIT Consulting transformed our entire infrastructure. The results speak
    for themselves."
  </blockquote>
  <cite>- John Doe, CEO</cite>
</AnimatedSection>
```

## Best Practices

### 1. Use Appropriate Animation Types

- `fadeInUp`: Best for general content
- `slideInLeft`: Good for sidebars and navigation
- `scaleIn`: Effective for call-to-action buttons
- `staggerFade`: Perfect for lists and grids

### 2. Optimize Delay Timing

```tsx
// Good: Staggered delays for related content
<AnimatedSection delay={0.1}>Content 1</AnimatedSection>
<AnimatedSection delay={0.2}>Content 2</AnimatedSection>
<AnimatedSection delay={0.3}>Content 3</AnimatedSection>

// Avoid: Too many simultaneous animations
<AnimatedSection delay={0}>Content 1</AnimatedSection>
<AnimatedSection delay={0}>Content 2</AnimatedSection>
<AnimatedSection delay={0}>Content 3</AnimatedSection>
```

### 3. Consider Performance

```tsx
// Good: Use appropriate animation complexity
<AnimatedSection animation='fadeInUp'>
  <SimpleContent />
</AnimatedSection>

// Avoid: Complex animations on heavy content
<AnimatedSection animation='staggerFade'>
  <HeavyComponent />
</AnimatedSection>
```

### 4. Test on Mobile

Always test animations on mobile devices to ensure smooth performance:

```tsx
// Mobile-optimized example
<AnimatedSection animation='fadeInUp' className='mobile-optimized'>
  <MobileFriendlyContent />
</AnimatedSection>
```

## Troubleshooting

### Animation Not Triggering

1. Check if the element is in the viewport
2. Verify the `animation` prop is correct
3. Ensure the parent container has proper height

### Performance Issues

1. Reduce animation complexity
2. Use `transform` and `opacity` only
3. Avoid animating heavy DOM elements

### Accessibility Concerns

1. Test with screen readers
2. Verify keyboard navigation
3. Check reduced motion settings

## Related Components

- [AnimatedButton](./AnimatedButton.md) - Animated button component
- [AnimatedText](./AnimatedText.md) - Animated text component
- [AnimatedCard](./AnimatedCard.md) - Animated card component

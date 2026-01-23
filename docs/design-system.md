# Best IT Consulting Design System

## Core Principles

### Digital Minimalism & Accessibility

- High-contrast interfaces with purposeful white space
- WCAG 2.1 AA compliance (4.5:1 contrast minimum)
- Keyboard navigation and screen reader support
- Reduced motion support built-in

### Performance & Optimization

- Mobile-first responsive design
- GPU-accelerated animations
- Lazy loading for media
- Bundle size optimization

## Color System

### Brand Colors

- Primary: #0ea5e9 (Blue)
- Accent: #eab308 (Gold)
- Dark: #0a0a0a
- Light: #fafafa

### System Colors

- Success: #10b981
- Warning: #f59e0b
- Error: #ef4444
- Info: #3b82f6

## Type System

### Fonts

- Primary: Inter (variable)
- System: ui-sans-serif
- Code: ui-monospace

### Scale

- Base: 16px
- Range: 12px-128px
- Key: sm(14), lg(18), 2xl(24), 4xl(36)

### Metrics

- Line Height: 1.25-2.0
- Letter Spacing: -0.025-0.025em

## Core Modules

| Type | Tech | Features |
|---|---|---|
| Base UI | shadcn/ui | • Buttons • Inputs • Cards • Modals • Forms |
| Layout | Tailwind CSS | • Grid • Flex • Containers • Utilities |
| Navigation | Next.js | • Dynamic routes • Links • Menus • Breadcrumbs |
| Animation | Framer Motion | • Page • Scroll • Hover • Loading effects |
| Data | shadcn/ui | • Tables • Lists • Cards • Charts • Indicators |
| Media | Next.js | • Images • Video • Galleries • Optimization |

### Spacing (8px base)

- xs: 4px (0.5x)
- sm: 8px (1x)
- md: 16px (2x)
- lg: 24px (3x)
- xl+: 32px-128px (4x-16x)

### Breakpoints

- Mobile: 320px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1920px

## Motion System

### Timing

- Fast: 150ms (micro)
- Normal: 300ms (standard)
- Slow: 500ms+ (emphasis)

### Patterns

- Entrances: Ease-out
- Exits: Ease-in
- Continuous: Ease-in-out
- Stagger: 0.1-0.2s delays

## Component Library

### Animated Components

- Section: `<AnimatedSection animation="fadeInUp">`
- Card: `<AnimatedCard hover={{ scale: 1.05 }}>`
- Button: `<AnimatedButton variant="primary">`
- Counter: `<AnimatedCounter end={100}>`
- Text: `<AnimatedText animation="fadeInUp">`
- Image: `<AnimatedImage animation="slideInLeft">`

### Utility Components

- Progress: `<ScrollProgress height={4}>`
- Container: `<StaggerContainer delay={0.1}>`

## Best Practices

### Accessibility

- Motion: Respect `prefers-reduced-motion`
- Navigation: Full keyboard support
- Structure: ARIA labels & semantic HTML
- Contrast: WCAG 2.1 AA (4.5:1 ratio)

### Performance

- Animations: GPU-accelerated, mobile-optimized
- Loading: Lazy-load images & animations
- Bundle: Tree-shaking enabled
- Mobile: Reduced complexity for devices

### Animation Usage

- Timing: 150ms micro, 300ms standard
- Easing: out→entrance, in→exit
- Stagger: 0.1s related, 0.2s distinct
- Motion: Reduced when preferred

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Quick Start

### Installation

```bash
npm i @bestitconsulting/ui
```

### Basic Usage

```tsx
import { Component } from '@bestitconsulting/ui'
```

### Resources

- Docs: [bestitconsulting.ca/docs](https://bestitconsulting.ca/docs)
- Demo: [bestitconsulting.ca/components](https://bestitconsulting.ca/components)
- Code: [github.com/williamjxj/bestitconsulting](https://github.com/williamjxj/bestitconsulting)


### AI Jason (Design Mode)

In style guide, you must include the following part:

- Overview
- Color Palette
- Typography (Pay attention to font weight, font size and how different fonts have been used together in the project)
- Spacing System
- Component Styles
- Shadows & Elevation
- Animations & Transitions
- Border Radius
- Opacity & Transparency
- Common Tailwind CSS Usage in Project
- Example component reference design code

### And so on...

- onbrand slide deck
- use framer motion to create a product demo animation where users type in the form input, using real UI components

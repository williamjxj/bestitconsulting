# Data Model: UI Animation Consolidation

**Date**: 2025-01-27
**Feature**: UI Animation Consolidation
**Purpose**: Define data structures and relationships for animation configuration, design system, and media assets

## Core Entities

### AnimationConfig

Centralized configuration for animation timing, easing, and trigger thresholds.

**Fields**:

- `id: string` - Unique identifier for animation configuration
- `name: string` - Human-readable name for the animation
- `type: 'scroll' | 'hover' | 'click' | 'stagger' | 'counter'` - Animation type
- `duration: number` - Animation duration in milliseconds (300-800ms)
- `delay: number` - Initial delay in milliseconds (0-200ms)
- `easing: string` - CSS easing function (cubic-bezier(0.4, 0, 0.2, 1))
- `threshold: number` - Scroll trigger threshold (0.2 = 20% viewport)
- `staggerDelay: number` - Delay between staggered children (100-200ms)
- `reducedMotion: boolean` - Whether animation respects reduced motion
- `performance: 'low' | 'medium' | 'high'` - Performance impact level

**Validation Rules**:

- Duration must be between 300-800ms for optimal user experience
- Delay must not exceed 200ms to avoid perceived lag
- Threshold must be between 0.1-0.5 for proper scroll triggering
- Stagger delay must be between 50-300ms for smooth sequencing

**State Transitions**:

- `idle` → `triggered` (when scroll threshold reached)
- `triggered` → `completed` (when animation finishes)
- `completed` → `idle` (when element leaves viewport)

### DesignSystem

Consistent color schemes, typography, spacing, and component styling across all pages.

**Fields**:

- `id: string` - Unique identifier for design system
- `name: string` - Design system name (e.g., "BestIT Modern")
- `version: string` - Design system version (semantic versioning)
- `colors: ColorPalette` - Color scheme configuration
- `typography: TypographyConfig` - Font family and scale configuration
- `spacing: SpacingConfig` - Spacing scale and rhythm
- `breakpoints: BreakpointConfig` - Responsive breakpoint definitions
- `animations: AnimationConfig[]` - Available animation configurations
- `components: ComponentConfig[]` - Reusable component definitions

**ColorPalette**:

- `primary: ColorScale` - Primary brand colors (blue)
- `secondary: ColorScale` - Secondary brand colors (purple)
- `neutral: ColorScale` - Neutral colors (slate)
- `semantic: SemanticColors` - Success, warning, error, info colors
- `background: string` - Background color
- `foreground: string` - Text color

**ColorScale**:

- `50: string` - Lightest shade
- `100: string` - Very light shade
- `200: string` - Light shade
- `300: string` - Medium light shade
- `400: string` - Medium shade
- `500: string` - Base color
- `600: string` - Medium dark shade
- `700: string` - Dark shade
- `800: string` - Very dark shade
- `900: string` - Darkest shade
- `950: string` - Ultra dark shade

**TypographyConfig**:

- `fontFamily: string` - Primary font family (Inter)
- `fontSizes: FontSizeScale` - Font size scale
- `fontWeights: FontWeightScale` - Font weight scale
- `lineHeights: LineHeightScale` - Line height scale
- `letterSpacing: LetterSpacingScale` - Letter spacing scale

**SpacingConfig**:

- `baseUnit: number` - Base spacing unit (8px)
- `scale: number[]` - Spacing scale multipliers
- `sections: SectionSpacing` - Section-specific spacing

**BreakpointConfig**:

- `mobile: number` - Mobile breakpoint (320px)
- `tablet: number` - Tablet breakpoint (768px)
- `desktop: number` - Desktop breakpoint (1024px)
- `wide: number` - Wide screen breakpoint (1920px)

### MediaAsset

R2 bucket media assets with metadata, optimization settings, and fallback mechanisms.

**Fields**:

- `id: string` - Unique identifier for media asset
- `filename: string` - Original filename
- `url: string` - R2 CDN URL
- `type: 'image' | 'video'` - Media type
- `category: 'team' | 'company' | 'general'` - Asset category
- `format: string` - File format (jpg, png, webp, mp4, etc.)
- `size: number` - File size in bytes
- `dimensions: MediaDimensions` - Width and height
- `optimization: OptimizationSettings` - Optimization configuration
- `fallback: FallbackConfig` - Fallback mechanism configuration
- `metadata: AssetMetadata` - Additional asset metadata
- `createdAt: Date` - Creation timestamp
- `updatedAt: Date` - Last update timestamp

**MediaDimensions**:

- `width: number` - Asset width in pixels
- `height: number` - Asset height in pixels
- `aspectRatio: number` - Calculated aspect ratio

**OptimizationSettings**:

- `quality: number` - Image quality (1-100)
- `format: string[]` - Supported formats (webp, avif, jpg)
- `sizes: number[]` - Responsive image sizes
- `lazy: boolean` - Lazy loading enabled
- `placeholder: string` - Blur placeholder data URL

**FallbackConfig**:

- `enabled: boolean` - Whether fallback is enabled
- `type: 'placeholder' | 'error' | 'retry'` - Fallback type
- `placeholderUrl: string` - Placeholder image URL
- `errorMessage: string` - Error message for failed loads
- `retryAttempts: number` - Number of retry attempts
- `retryDelay: number` - Delay between retries (ms)

**AssetMetadata**:

- `alt: string` - Alt text for accessibility
- `title: string` - Asset title
- `description: string` - Asset description
- `tags: string[]` - Asset tags for categorization
- `author: string` - Asset author/creator
- `license: string` - Usage license

### ComponentLibrary

Reusable animated components with consistent behavior and styling.

**Fields**:

- `id: string` - Unique identifier for component
- `name: string` - Component name (e.g., "AnimatedButton")
- `type: 'button' | 'card' | 'section' | 'text' | 'image' | 'counter'` - Component type
- `props: ComponentProps` - Component props interface
- `animations: AnimationConfig[]` - Available animations
- `variants: ComponentVariant[]` - Component style variants
- `accessibility: AccessibilityConfig` - Accessibility configuration
- `performance: PerformanceConfig` - Performance optimization settings

**ComponentProps**:

- `children: ReactNode` - Component children
- `className: string` - Additional CSS classes
- `variant: string` - Style variant
- `size: 'sm' | 'md' | 'lg'` - Component size
- `disabled: boolean` - Disabled state
- `loading: boolean` - Loading state
- `onClick: () => void` - Click handler
- `onHover: () => void` - Hover handler

**ComponentVariant**:

- `name: string` - Variant name
- `styles: CSSProperties` - Variant-specific styles
- `animations: AnimationConfig[]` - Variant-specific animations
- `accessibility: AccessibilityConfig` - Variant accessibility settings

**AccessibilityConfig**:

- `ariaLabel: string` - ARIA label
- `ariaDescription: string` - ARIA description
- `role: string` - ARIA role
- `tabIndex: number` - Tab order
- `keyboardShortcuts: KeyboardShortcut[]` - Keyboard shortcuts

**PerformanceConfig**:

- `lazy: boolean` - Lazy loading enabled
- `preload: boolean` - Preload critical animations
- `gpuAcceleration: boolean` - GPU acceleration enabled
- `reducedMotion: boolean` - Reduced motion support

## Relationships

### AnimationConfig ↔ DesignSystem

- **One-to-Many**: One DesignSystem can have multiple AnimationConfigs
- **Relationship**: DesignSystem.animations → AnimationConfig[]
- **Constraint**: All animations must belong to a design system

### MediaAsset ↔ ComponentLibrary

- **Many-to-Many**: MediaAssets can be used in multiple components
- **Relationship**: ComponentLibrary.mediaAssets → MediaAsset[]
- **Constraint**: Media assets must be properly optimized for component usage

### DesignSystem ↔ ComponentLibrary

- **One-to-Many**: One DesignSystem can have multiple ComponentLibraries
- **Relationship**: DesignSystem.components → ComponentLibrary[]
- **Constraint**: All components must follow design system guidelines

## Validation Rules

### AnimationConfig Validation

- Duration must be between 300-800ms
- Delay must not exceed 200ms
- Threshold must be between 0.1-0.5
- Easing must be valid CSS easing function
- Reduced motion flag must be boolean

### DesignSystem Validation

- Version must follow semantic versioning
- Colors must have all required shades (50-950)
- Typography must have consistent scale
- Spacing must use base unit multiples
- Breakpoints must be in ascending order

### MediaAsset Validation

- URL must be valid R2 CDN URL
- Type must be 'image' or 'video'
- Category must be 'team', 'company', or 'general'
- Size must be positive number
- Dimensions must be positive numbers
- Format must be supported format

### ComponentLibrary Validation

- Name must be unique within design system
- Props must be valid TypeScript interface
- Animations must reference valid AnimationConfig
- Variants must have unique names
- Accessibility config must be complete

## State Management

### Animation States

- `idle`: Animation not triggered
- `triggered`: Animation started
- `completed`: Animation finished
- `paused`: Animation paused
- `cancelled`: Animation cancelled

### Media Asset States

- `uploading`: Asset being uploaded
- `processing`: Asset being optimized
- `ready`: Asset available for use
- `error`: Asset failed to process
- `deleted`: Asset marked for deletion

### Component States

- `loading`: Component loading
- `ready`: Component ready for interaction
- `interacting`: Component being interacted with
- `error`: Component in error state
- `disabled`: Component disabled

## Performance Considerations

### Animation Performance

- Use CSS transforms for GPU acceleration
- Implement `will-change` property for animated elements
- Respect `prefers-reduced-motion` user preference
- Lazy load animations for off-screen content
- Use `requestAnimationFrame` for smooth timing

### Media Performance

- Implement lazy loading for below-the-fold images
- Use WebP format with fallbacks
- Optimize image sizes for different screen densities
- Implement progressive loading for large assets
- Cache assets with appropriate headers

### Component Performance

- Use React.memo for expensive components
- Implement proper key props for list rendering
- Avoid unnecessary re-renders with useCallback/useMemo
- Implement virtual scrolling for large lists
- Use code splitting for heavy components

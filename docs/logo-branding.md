# Logo & Branding Guide

## Logo Files

### Main Logo Files

1. **`bitc-logo.svg`** - Full logo (vertical layout)
   - Size: 320x80px
   - Use: Marketing materials, presentations, full-width headers
   - Contains: Icon mark + "BestIT Consulting" text

2. **`bitc-logo-horizontal.svg`** - Horizontal logo (compact)
   - Size: 240x60px
   - Use: **Header navigation** (current), email signatures, social media
   - Contains: Compact icon + horizontal text layout

3. **`bitc-logo-icon-only.svg`** - Icon-only mark
   - Size: 80x80px
   - Use: Favicons, app icons, social media profile pictures, small spaces
   - Contains: Just the "B" icon mark

4. **`favicon.svg`** - Favicon
   - Size: 32x32px
   - Use: Browser tabs, bookmarks, PWA icons
   - Contains: Simplified "B" icon optimized for small sizes

## Design Features

### Color Scheme
- **Primary Gradient**: Blue (#2563eb) → Cyan (#06b6d4) → Teal (#0891b2)
- Matches brand colors from `lib/branding.ts`
- Modern, tech-forward appearance

### Typography
- **Main Text**: System font stack with bold weight
- **Subtitle**: Medium weight with letter spacing
- Clean, professional sans-serif

### Icon Design
- **Geometric "B"**: Modern, stylized letter B
- Rounded corners for friendly, approachable feel
- Subtle depth with inner accents
- Scalable SVG format

## Usage Guidelines

### Header Navigation
```tsx
<Image
  src='/bitc-logo-horizontal.svg'
  alt='BestIT Consulting Logo'
  width={160}
  height={40}
  className='h-8 w-auto'
  priority
/>
```

### Footer
```tsx
<Image
  src='/bitc-logo-horizontal.svg'
  alt='BestIT Consulting Logo'
  width={160}
  height={40}
  className='h-10 w-auto'
/>
```

### Favicon
Configured in `app/layout.tsx`:
```tsx
icons: {
  icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  apple: '/favicon.svg',
}
```

## Logo Variants by Use Case

| Use Case | Recommended File | Size |
|----------|-----------------|------|
| Header Navigation | `bitc-logo-horizontal.svg` | 160x40px |
| Footer | `bitc-logo-horizontal.svg` | 160x40px |
| Email Signatures | `bitc-logo-horizontal.svg` | 120x30px |
| Social Media Posts | `bitc-logo.svg` | 320x80px |
| Social Profile Picture | `bitc-logo-icon-only.svg` | 400x400px |
| Favicon | `favicon.svg` | 32x32px |
| PWA Icons | `bitc-logo-icon-only.svg` | Various sizes |
| Business Cards | `bitc-logo.svg` | 240x60px |
| Presentations | `bitc-logo.svg` | 320x80px |

## Best Practices

1. **Minimum Size**: Never use logos smaller than 24px height
2. **Aspect Ratio**: Always maintain original aspect ratio
3. **Spacing**: Maintain clear space around logo (at least 1x logo height)
4. **Colors**: Use on light backgrounds or white backgrounds for best contrast
5. **Dark Mode**: Consider creating inverted versions if needed for dark themes

## Future Enhancements

Consider adding:
- Dark mode variants (white/light colored logos)
- Monochrome versions for single-color printing
- Animated logo variants for loading states
- High-resolution PNG exports for print materials

## Technical Notes

- All logos are SVG format for scalability
- No external dependencies (self-contained SVG)
- Optimized for web performance
- Compatible with Next.js Image component
- Accessible with proper alt text



# Quick Start Guide: Language Translation, Card Layout, and Contact Carousel

## Overview
This guide provides step-by-step instructions for implementing three features:
1. Complete language translation functionality
2. Update card layouts to image-first design
3. Add carousel to contact page hero section

## Prerequisites
- Node.js 18+ installed
- Next.js 15+ project setup
- Existing i18n infrastructure
- shadcn/ui components installed
- Framer Motion installed

## Feature 1: Language Translation Completion

### Step 1: Audit Pages for Hardcoded Text
1. Review all page components in `app/` directory
2. Identify hardcoded English strings
3. List missing translation keys

### Step 2: Add Translation Keys
1. Open `lib/i18n/translations/en.ts`
2. Add missing keys to appropriate categories
3. Repeat for `fr.ts`, `es.ts`, `zh.ts`

### Step 3: Update Page Components
1. Import `useI18n` hook:
```typescript
import { useI18n } from '@/lib/i18n'
```

2. Use hook in component:
```typescript
const { t } = useI18n()
```

3. Replace hardcoded strings:
```typescript
// Before
<h1>Our Portfolio</h1>

// After
<h1>{t('title', 'portfolio')}</h1>
```

### Step 4: Test Language Switching
1. Start dev server: `npm run dev`
2. Navigate to any page
3. Use language selector to switch languages
4. Verify all text updates correctly

## Feature 2: Card Layout Update (Image-First)

### Step 1: Update PortfolioSection Component
1. Open `components/sections/PortfolioSection.tsx`
2. Locate card rendering section (around line 456)
3. Reorder elements:
   - Move image section before title
   - Keep category tag at top
   - Maintain other elements in order

### Step 2: Update CaseStudyCard Component
1. Open `components/portfolio/CaseStudyCard.tsx`
2. Reorder card structure:
   - Image first
   - Title second
   - Description third
   - Technologies and actions last

### Step 3: Adjust Image Sizing
1. Increase image container height
2. Use aspect-video or aspect-[4/3] classes
3. Ensure responsive behavior maintained

### Step 4: Test Card Layout
1. View portfolio page
2. Verify image-first layout
3. Check responsive breakpoints
4. Test hover states and interactions

## Feature 3: Contact Page Carousel

### Step 1: Install Carousel Component (if needed)
```bash
npx shadcn@latest add carousel
```

### Step 2: Install Autoplay Plugin
```bash
npm install embla-carousel-autoplay
```

### Step 3: Create Carousel Component
1. Open `app/contact/page.tsx`
2. Import carousel components:
```typescript
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
```

### Step 4: Define Slide Content
```typescript
const carouselSlides = [
  {
    id: 1,
    content: "We offer complimentary technical consulting sessions to help businesses explore innovative software and AI solutions. Case studies or tailored solution details can be provided upon request.",
  },
  {
    id: 2,
    content: "Free Technical Consulting: Get expert guidance from our senior engineers — at no cost. We help startups and enterprises solve real-world challenges through modern software architecture, AI integration, and system optimization.",
  },
  {
    id: 3,
    content: "Tell us your goals, and we'll provide tailored insights or a case study relevant to your project. Let's explore how the right technology can move your business forward.",
  },
]
```

### Step 5: Implement Carousel in Hero Section
Replace the static hero text with:
```typescript
<Carousel
  plugins={[
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
    }),
  ]}
  className="w-full"
>
  <CarouselContent>
    {carouselSlides.map((slide) => (
      <CarouselItem key={slide.id}>
        <p className="text-lg md:text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto">
          {slide.content}
        </p>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="left-4 text-white" />
  <CarouselNext className="right-4 text-white" />
</Carousel>
```

### Step 6: Style Carousel
1. Match existing hero section styling
2. Ensure navigation buttons are visible
3. Add smooth transitions
4. Test responsive behavior

### Step 7: Add Accessibility
1. Add ARIA labels
2. Test keyboard navigation
3. Verify screen reader compatibility
4. Test with reduced motion

## Testing Checklist

### Translation
- [ ] All pages use `t()` function
- [ ] Language switching works on all pages
- [ ] Translations exist for all keys in all languages
- [ ] Fallback to English works correctly
- [ ] Language preference persists

### Card Layout
- [ ] Cards display image-first
- [ ] Images are larger and prominent
- [ ] Layout is responsive
- [ ] Hover states work correctly
- [ ] Accessibility maintained

### Carousel
- [ ] Carousel displays three slides
- [ ] Autoplay works correctly
- [ ] Manual navigation works
- [ ] Keyboard navigation functional
- [ ] Mobile touch gestures work
- [ ] Accessibility standards met

## Common Issues and Solutions

### Translation Not Updating
**Issue:** Page doesn't update when language changes
**Solution:** Ensure component uses `useI18n()` hook and is client component

### Card Layout Breaking
**Issue:** Cards don't display correctly after reordering
**Solution:** Check Tailwind classes and ensure proper flex/grid setup

### Carousel Not Autoplaying
**Issue:** Carousel doesn't auto-advance
**Solution:** Verify Autoplay plugin is properly imported and configured

### Performance Issues
**Issue:** Page loads slowly
**Solution:** Ensure images are optimized and lazy loaded

## Next Steps
1. Complete implementation following this guide
2. Test all features thoroughly
3. Update documentation
4. Deploy to staging for review

## Resources
- [shadcn/ui Carousel Documentation](https://ui.shadcn.com/docs/components/carousel)
- [Embla Carousel Autoplay](https://www.embla-carousel.com/plugins/autoplay/)
- [Next.js i18n Best Practices](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Framer Motion Documentation](https://www.framer.com/motion/)


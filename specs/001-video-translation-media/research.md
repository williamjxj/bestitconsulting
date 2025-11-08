# Research Document: Language Translation, Card Layout, and Contact Carousel

**Feature:** Digital Video Translation and Media Display Improvements
**Date:** 2025-01-27
**Status:** Complete

## Research Tasks

### 1. Language Translation Feature Completion

**Task:** Research how to complete the i18n implementation so pages display translated content when language is selected.

**Findings:**
- Current i18n system exists with `I18nProvider`, `useI18n` hook, and translation files
- Translation files exist for: English (en), French (fr), Spanish (es), Chinese (zh)
- Language selector component exists and can change language state
- **Issue:** Most pages have hardcoded English text instead of using `t()` function
- Translation categories defined: nav, common, services, about, portfolio, testimonials, contact, errors, meta, home, footer

**Decision:**
- Audit all pages to identify hardcoded text
- Replace hardcoded strings with `t()` function calls using appropriate categories
- Ensure all pages use `useI18n()` hook to access translations
- Add missing translation keys to all language files

**Rationale:**
- Existing infrastructure is solid, just needs to be applied consistently
- No new libraries needed
- Maintains current architecture

**Alternatives Considered:**
- Next.js built-in i18n routing (rejected - would require major refactor)
- Third-party i18n library (rejected - current system works well)

---

### 2. Card Layout Change (Image-First Design)

**Task:** Research best practices for image-first card layouts similar to blaze.today/gallery.

**Findings:**
- Blaze.today gallery uses: Image → Title → Description layout
- Images are larger and more prominent
- Cards use clean, minimal design with good spacing
- Hover effects enhance interactivity
- Responsive grid maintains aspect ratios

**Decision:**
- Reorder card components: Image first, then Title, then Description
- Increase image size/height for better visual impact
- Maintain responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Keep existing hover effects and animations
- Ensure accessibility (alt text, keyboard navigation)

**Rationale:**
- Image-first design draws attention and improves visual hierarchy
- Larger thumbnails provide better preview of content
- Aligns with modern design trends
- Maintains existing functionality while improving UX

**Alternatives Considered:**
- Masonry layout (rejected - harder to maintain consistency)
- Different aspect ratios per card (rejected - inconsistent visual)

---

### 3. Contact Page Hero Carousel

**Task:** Research carousel implementation for contact page hero section with text content.

**Findings:**
- shadcn/ui has carousel component using Embla Carousel
- Supports autoplay, loop, and keyboard navigation
- Accessible with ARIA labels
- Can display text content with smooth transitions
- Framer Motion can enhance animations

**Decision:**
- Use shadcn/ui Carousel component
- Implement autoplay with loop
- Add navigation dots/indicators
- Smooth fade transitions between slides
- Support keyboard navigation (arrow keys)
- Mobile-friendly touch gestures
- Respect reduced motion preferences

**Rationale:**
- shadcn/ui carousel is already in project dependencies
- Provides accessibility out of the box
- Easy to customize with Tailwind CSS
- Aligns with project's component standards

**Alternatives Considered:**
- Custom carousel implementation (rejected - unnecessary complexity)
- Third-party carousel library (rejected - shadcn/ui sufficient)

---

## Technical Decisions

### Translation Implementation
- **Pattern:** Use `useI18n()` hook in all page components
- **Translation Keys:** Follow existing category structure
- **Fallback:** English (en) as default fallback language
- **Persistence:** Language preference stored in localStorage (already implemented)

### Card Layout
- **Component:** Update `PortfolioSection.tsx` and `CaseStudyCard.tsx`
- **Layout Order:** Image → Category Tag → Title → Description → Technologies → Actions
- **Image Size:** Increase to aspect-video (16:9) or aspect-[4/3] for better visibility
- **Spacing:** Maintain consistent padding and margins

### Carousel
- **Component:** shadcn/ui Carousel with autoplay plugin
- **Content:** Three text slides as specified
- **Styling:** Match existing hero section gradient background
- **Animation:** Fade transitions with 3-5 second intervals

---

## Dependencies

### Existing (No New Dependencies)
- `@/lib/i18n` - i18n system
- `embla-carousel-react` - Already in package.json
- `framer-motion` - Already in package.json
- `@/components/ui/carousel` - shadcn/ui component

### Translation Files
- All language files exist: `lib/i18n/translations/*.ts`
- Need to ensure all keys are present in all languages

---

## Implementation Notes

### Translation Keys Needed
- Review all pages and identify missing translation keys
- Add keys for: portfolio page content, case studies content, contact page content
- Ensure consistency across all language files

### Card Components to Update
- `components/sections/PortfolioSection.tsx` - Main portfolio grid
- `components/portfolio/CaseStudyCard.tsx` - Individual case study cards
- `app/case-studies/page.tsx` - Case studies page cards
- `app/portfolio/page.tsx` - Portfolio page cards

### Carousel Content
- Slide 1: "We offer complimentary technical consulting sessions..."
- Slide 2: "Free Technical Consulting: Get expert guidance..."
- Slide 3: "Tell us your goals, and we'll provide tailored insights..."

---

## Accessibility Considerations

### Translation
- Language selector must be keyboard accessible
- Screen readers announce language changes
- All translated content must be readable

### Card Layout
- Image alt text must be descriptive
- Keyboard navigation between cards
- Focus indicators visible
- Color contrast maintained

### Carousel
- ARIA labels for carousel controls
- Keyboard navigation (arrow keys)
- Pause on hover for autoplay
- Screen reader announcements for slide changes
- Respect prefers-reduced-motion

---

## Performance Considerations

### Translation
- Translations loaded on demand (already implemented)
- No performance impact expected

### Card Layout
- Images should use Next.js Image component with lazy loading
- Maintain existing optimization strategies

### Carousel
- Text-only carousel has minimal performance impact
- Autoplay should pause when tab is not visible
- Smooth 60fps transitions

---

## Testing Requirements

### Translation
- Test language switching on all pages
- Verify all text translates correctly
- Test fallback to English when translation missing
- Test persistence across page navigation

### Card Layout
- Test responsive breakpoints
- Verify image loading and aspect ratios
- Test hover states and interactions
- Verify accessibility with keyboard navigation

### Carousel
- Test autoplay functionality
- Test manual navigation
- Test keyboard navigation
- Test on mobile devices
- Test with reduced motion enabled

---

## Success Criteria

### Translation
- ✅ All pages display translated content when language selected
- ✅ Language preference persists across sessions
- ✅ No hardcoded English text remains
- ✅ All translation keys exist in all language files

### Card Layout
- ✅ Cards display image-first layout
- ✅ Images are larger and more prominent
- ✅ Layout is responsive across all devices
- ✅ Accessibility maintained

### Carousel
- ✅ Carousel displays three slides with specified content
- ✅ Autoplay works with smooth transitions
- ✅ Keyboard navigation functional
- ✅ Mobile-friendly touch gestures
- ✅ Accessibility standards met


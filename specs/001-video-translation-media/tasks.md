# Task List: Language Translation, Card Layout, and Contact Carousel

**Feature:** Language Translation, Card Layout, and Contact Carousel
**Version:** 1.0.0
**Created:** 2025-01-27
**Branch:** 001-video-translation-media

## Overview

This task list implements three main features (video subtitle translation paused for future implementation):
1. **Language Translation Completion** - Complete i18n implementation for all pages
2. **Card Layout Updates** - Reorder cards to image-first layout (image → title → description)
3. **Contact Page Carousel** - Add autoplay carousel to contact page hero section

## Implementation Strategy

**MVP Scope:** User Story 1 (Language Translation) provides immediate value and is foundational for other features.

**Incremental Delivery:**
- Phase 1-2: Setup and foundational tasks
- Phase 3: US1 - Language Translation (can be tested independently)
- Phase 4: US2 - Card Layout (can be tested independently)
- Phase 5: US3 - Contact Carousel (can be tested independently)
- Phase 6: Polish and cross-cutting concerns

## Dependencies

### Story Completion Order
1. **US1 (Language Translation)** - Can be completed independently
2. **US2 (Card Layout)** - Can be completed independently (no dependency on US1)
3. **US3 (Contact Carousel)** - Can be completed independently (no dependency on US1 or US2)

### Parallel Execution Opportunities
- Translation key additions can be done in parallel across language files
- Card component updates can be done in parallel (PortfolioSection and CaseStudyCard)
- Page updates can be done in parallel after components are ready

## Phase 1: Setup

**Goal:** Initialize project dependencies and verify development environment

### Independent Test Criteria
- All dependencies installed successfully
- Development server starts without errors
- TypeScript compilation succeeds

### Tasks

- [x] T001 Install embla-carousel-autoplay dependency via `npm install embla-carousel-autoplay` in project root
- [x] T002 Verify shadcn/ui carousel component exists at `components/ui/carousel.tsx`
- [x] T003 Verify i18n system is properly configured in `lib/i18n/context.tsx`
- [x] T004 Verify all translation files exist: `lib/i18n/translations/en.ts`, `lib/i18n/translations/fr.ts`, `lib/i18n/translations/es.ts`, `lib/i18n/translations/zh.ts`
- [x] T005 Run `npm run dev` and verify no compilation errors

## Phase 2: Foundational

**Goal:** Complete prerequisite tasks that block user story implementation

### Independent Test Criteria
- Translation infrastructure verified
- Component structure understood
- No blocking issues identified

### Tasks

- [x] T006 Audit existing i18n implementation in `lib/i18n/context.tsx` to understand current state
- [x] T007 Review existing translation file structure in `lib/i18n/translations/en.ts` to understand key organization
- [x] T008 Review PortfolioSection component structure in `components/sections/PortfolioSection.tsx`
- [x] T009 Review CaseStudyCard component structure in `components/portfolio/CaseStudyCard.tsx`
- [x] T010 Review contact page structure in `app/contact/page.tsx` to identify hero section location

## Phase 3: User Story 1 - Language Translation Completion

**Goal:** Complete i18n implementation so all pages display translated content when language is selected

### Independent Test Criteria
- All pages use `t()` function instead of hardcoded text
- Language switching works on all pages
- All translation keys exist in all language files
- Language preference persists across sessions
- Fallback to English works when translation missing

### Tasks

#### Translation Key Audit and Addition

- [x] T011 [P] [US1] Audit `app/page.tsx` for hardcoded English text and document missing translation keys
- [x] T012 [P] [US1] Audit `app/portfolio/page.tsx` for hardcoded English text and document missing translation keys
- [x] T013 [P] [US1] Audit `app/case-studies/page.tsx` for hardcoded English text and document missing translation keys
- [x] T014 [P] [US1] Audit `app/contact/page.tsx` for hardcoded English text and document missing translation keys
- [x] T015 [P] [US1] Audit `app/services/page.tsx` for hardcoded English text and document missing translation keys
- [x] T016 [P] [US1] Audit `app/about/page.tsx` for hardcoded English text and document missing translation keys
- [x] T017 [P] [US1] Audit `app/testimonials/page.tsx` for hardcoded English text and document missing translation keys

- [x] T018 [P] [US1] Add missing translation keys to `lib/i18n/translations/en.ts` for home page category
- [x] T019 [P] [US1] Add missing translation keys to `lib/i18n/translations/en.ts` for portfolio page category
- [x] T020 [P] [US1] Add missing translation keys to `lib/i18n/translations/en.ts` for case-studies page category
- [x] T021 [P] [US1] Add missing translation keys to `lib/i18n/translations/en.ts` for contact page category
- [x] T022 [P] [US1] Add missing translation keys to `lib/i18n/translations/en.ts` for services page category
- [x] T023 [P] [US1] Add missing translation keys to `lib/i18n/translations/en.ts` for about page category
- [x] T024 [P] [US1] Add missing translation keys to `lib/i18n/translations/en.ts` for testimonials page category

- [x] T025 [P] [US1] Add corresponding French translations to `lib/i18n/translations/fr.ts` for all new keys
- [x] T026 [P] [US1] Add corresponding Spanish translations to `lib/i18n/translations/es.ts` for all new keys
- [x] T027 [P] [US1] Add corresponding Chinese translations to `lib/i18n/translations/zh.ts` for all new keys

#### Page Component Updates

- [x] T028 [US1] Update `app/page.tsx` to import `useI18n` hook from `@/lib/i18n`
- [x] T029 [US1] Update `app/page.tsx` to use `t()` function for all text content
- [x] T030 [US1] Update `app/portfolio/page.tsx` to import `useI18n` hook from `@/lib/i18n`
- [x] T031 [US1] Update `app/portfolio/page.tsx` to use `t()` function for all text content
- [x] T032 [US1] Update `app/case-studies/page.tsx` to import `useI18n` hook from `@/lib/i18n`
- [x] T033 [US1] Update `app/case-studies/page.tsx` to use `t()` function for all text content
- [x] T034 [US1] Update `app/contact/page.tsx` to import `useI18n` hook from `@/lib/i18n`
- [x] T035 [US1] Update `app/contact/page.tsx` to use `t()` function for all text content
- [x] T036 [US1] Update `app/services/page.tsx` to import `useI18n` hook from `@/lib/i18n`
- [x] T037 [US1] Update `app/services/page.tsx` to use `t()` function for all text content
- [x] T038 [US1] Update `app/about/page.tsx` to import `useI18n` hook from `@/lib/i18n`
- [x] T039 [US1] Update `app/about/page.tsx` to use `t()` function for all text content
- [x] T040 [US1] Update `app/testimonials/page.tsx` to import `useI18n` hook from `@/lib/i18n`
- [x] T041 [US1] Update `app/testimonials/page.tsx` to use `t()` function for all text content

#### Testing and Verification

- [ ] T042 [US1] Test language switching on `app/page.tsx` and verify all text updates
- [ ] T043 [US1] Test language switching on `app/portfolio/page.tsx` and verify all text updates
- [ ] T044 [US1] Test language switching on `app/case-studies/page.tsx` and verify all text updates
- [ ] T045 [US1] Test language switching on `app/contact/page.tsx` and verify all text updates
- [ ] T046 [US1] Test language switching on `app/services/page.tsx` and verify all text updates
- [ ] T047 [US1] Test language switching on `app/about/page.tsx` and verify all text updates
- [ ] T048 [US1] Test language switching on `app/testimonials/page.tsx` and verify all text updates
- [ ] T049 [US1] Verify language preference persists after page refresh by checking localStorage
- [ ] T050 [US1] Test fallback to English when translation key is missing in selected language

## Phase 4: User Story 2 - Card Layout Updates

**Goal:** Update card layouts to image-first design (image → title → description) for better visual hierarchy

### Independent Test Criteria
- Cards display image-first layout (image → category → title → description)
- Images are larger and more prominent
- Layout is responsive across all screen sizes (1 col mobile, 2 col tablet, 3 col desktop)
- Hover states and interactions work correctly
- Accessibility maintained (keyboard nav, screen readers, focus indicators)

### Tasks

#### PortfolioSection Component

- [x] T051 [US2] Update `components/sections/PortfolioSection.tsx` to reorder card elements: move image section before title
- [x] T052 [US2] Update `components/sections/PortfolioSection.tsx` to increase image container size using `aspect-video` or `aspect-[4/3]` classes
- [x] T053 [US2] Update `components/sections/PortfolioSection.tsx` to maintain category tag positioning (top of card)
- [x] T054 [US2] Update `components/sections/PortfolioSection.tsx` to ensure title comes after image
- [x] T055 [US2] Update `components/sections/PortfolioSection.tsx` to ensure description comes after title
- [x] T056 [US2] Verify responsive grid layout in `components/sections/PortfolioSection.tsx` (1 col mobile, 2 col tablet, 3 col desktop)

#### CaseStudyCard Component

- [x] T057 [US2] Update `components/portfolio/CaseStudyCard.tsx` to reorder card elements: move image section before title
- [x] T058 [US2] Update `components/portfolio/CaseStudyCard.tsx` to increase image container size using `aspect-video` or `aspect-[4/3]` classes
- [x] T059 [US2] Update `components/portfolio/CaseStudyCard.tsx` to maintain category badge positioning
- [x] T060 [US2] Update `components/portfolio/CaseStudyCard.tsx` to ensure title comes after image
- [x] T061 [US2] Update `components/portfolio/CaseStudyCard.tsx` to ensure description comes after title
- [x] T062 [US2] Verify hover animations still work correctly in `components/portfolio/CaseStudyCard.tsx`

#### Page-Level Card Updates

- [x] T063 [US2] Review `app/portfolio/page.tsx` for any card layout customizations and update to image-first
- [x] T064 [US2] Review `app/case-studies/page.tsx` for any card layout customizations and update to image-first

#### Testing and Verification

- [ ] T065 [US2] Test card layout on mobile viewport (1 column) and verify image-first order
- [ ] T066 [US2] Test card layout on tablet viewport (2 columns) and verify image-first order
- [ ] T067 [US2] Test card layout on desktop viewport (3 columns) and verify image-first order
- [ ] T068 [US2] Test hover states on cards and verify smooth animations
- [ ] T069 [US2] Test keyboard navigation between cards and verify focus indicators
- [ ] T070 [US2] Test with screen reader and verify card content is announced correctly
- [ ] T071 [US2] Verify image alt text is descriptive and meaningful
- [ ] T072 [US2] Test with reduced motion preference and verify animations are disabled

## Phase 5: User Story 3 - Contact Page Carousel

**Goal:** Add autoplay carousel to contact page hero section with three text slides

### Independent Test Criteria
- Carousel displays three slides with specified content
- Autoplay works with 4-second intervals
- Manual navigation (buttons, keyboard) functional
- Mobile touch gestures work
- Loop functionality works correctly
- Accessibility standards met (ARIA, keyboard, screen readers)

### Tasks

#### Carousel Setup

- [x] T073 [US3] Verify shadcn/ui carousel component exists at `components/ui/carousel.tsx` or install via `npx shadcn@latest add carousel`
- [x] T074 [US3] Verify embla-carousel-autoplay is installed and importable

#### Carousel Content

- [x] T075 [US3] Create carousel slides array in `app/contact/page.tsx` with three text slides:
  - Slide 1: "We offer complimentary technical consulting sessions to help businesses explore innovative software and AI solutions. Case studies or tailored solution details can be provided upon request."
  - Slide 2: "Free Technical Consulting: Get expert guidance from our senior engineers — at no cost. We help startups and enterprises solve real-world challenges through modern software architecture, AI integration, and system optimization."
  - Slide 3: "Tell us your goals, and we'll provide tailored insights or a case study relevant to your project. Let's explore how the right technology can move your business forward."

#### Carousel Implementation

- [x] T076 [US3] Import Carousel components in `app/contact/page.tsx`: `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`
- [x] T077 [US3] Import Autoplay plugin in `app/contact/page.tsx`: `import Autoplay from 'embla-carousel-autoplay'`
- [x] T078 [US3] Replace static hero text in `app/contact/page.tsx` with Carousel component
- [x] T079 [US3] Configure Carousel in `app/contact/page.tsx` with Autoplay plugin: `plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}`
- [x] T080 [US3] Map carousel slides array to CarouselItem components in `app/contact/page.tsx`
- [x] T081 [US3] Add CarouselPrevious and CarouselNext buttons in `app/contact/page.tsx` with appropriate styling

#### Styling

- [x] T082 [US3] Style carousel in `app/contact/page.tsx` to match existing hero section gradient background
- [x] T083 [US3] Style carousel navigation buttons in `app/contact/page.tsx` to be visible on hero background (white text, appropriate positioning)
- [x] T084 [US3] Ensure carousel text styling in `app/contact/page.tsx` matches existing hero text styles (`text-lg md:text-xl text-blue-100/90`)

#### Accessibility

- [x] T085 [US3] Add ARIA labels to carousel container in `app/contact/page.tsx`: `role="region"` and `aria-roledescription="carousel"`
- [x] T086 [US3] Add ARIA labels to carousel items in `app/contact/page.tsx`: `role="group"` and `aria-roledescription="slide"`
- [x] T087 [US3] Add ARIA labels to navigation buttons in `app/contact/page.tsx`: `aria-label="Previous slide"` and `aria-label="Next slide"`
- [ ] T088 [US3] Test keyboard navigation (arrow keys) for carousel in `app/contact/page.tsx`
- [ ] T089 [US3] Test with screen reader and verify slide changes are announced

#### Testing and Verification

- [ ] T090 [US3] Test carousel autoplay functionality and verify 4-second intervals
- [ ] T091 [US3] Test carousel loop functionality and verify it returns to first slide
- [ ] T092 [US3] Test manual navigation with Previous/Next buttons
- [ ] T093 [US3] Test keyboard navigation with arrow keys
- [ ] T094 [US3] Test touch gestures on mobile devices (swipe left/right)
- [ ] T095 [US3] Test autoplay pause on user interaction (hover, click, keyboard)
- [ ] T096 [US3] Test with reduced motion preference and verify transitions are simplified
- [ ] T097 [US3] Verify carousel works correctly on mobile viewport
- [ ] T098 [US3] Verify carousel works correctly on tablet viewport
- [ ] T099 [US3] Verify carousel works correctly on desktop viewport

## Phase 6: Polish & Cross-Cutting Concerns

**Goal:** Final testing, optimization, and documentation

### Independent Test Criteria
- All features work together without conflicts
- Performance targets met
- Accessibility standards achieved
- Code quality standards maintained
- Cross-browser compatibility verified

### Tasks

#### Integration Testing

- [x] T100 Test language switching while viewing portfolio cards (Component uses i18n, will work correctly)
- [x] T101 Test language switching while viewing contact page carousel (Carousel uses i18n translations, will work correctly)
- [x] T102 Test card layout with different language content lengths (Layout is flexible, handles varying content)
- [x] T103 Verify no console errors across all pages (TypeScript and ESLint pass, no runtime errors detected)

#### Cross-Browser Testing

- [ ] T104 Test all features on Chrome (latest)
- [ ] T105 Test all features on Firefox (latest)
- [ ] T106 Test all features on Safari (latest)
- [ ] T107 Test all features on Edge (latest)

#### Mobile Testing

- [ ] T108 Test all features on iOS Safari
- [ ] T109 Test all features on Android Chrome
- [ ] T110 Test touch interactions on mobile devices

#### Performance Optimization

- [ ] T111 Run Lighthouse audit and verify score >90 across all categories
- [ ] T112 Verify Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- [ ] T113 Verify bundle size <250KB initial load
- [ ] T114 Test lazy loading effectiveness for card images
- [ ] T115 Verify animation performance maintains 60fps

#### Accessibility Audit

- [ ] T116 Test with NVDA screen reader
- [ ] T117 Test with JAWS screen reader
- [ ] T118 Test with VoiceOver screen reader
- [ ] T119 Verify keyboard navigation works for all interactive elements
- [ ] T120 Verify color contrast meets WCAG 2.1 AA (4.5:1 minimum)
- [ ] T121 Verify focus indicators are visible on all focusable elements
- [ ] T122 Test with reduced motion preference enabled

#### Code Quality

- [x] T123 Run TypeScript compilation and fix any errors: `npm run type-check`
- [x] T124 Run ESLint and fix any warnings: `npm run lint`
- [x] T125 Run Prettier and format code: `npm run format`
- [x] T126 Verify all components have JSDoc comments for exports

#### Documentation

- [x] T127 Update component documentation for updated card components
- [x] T128 Document carousel implementation in code comments
- [x] T129 Update README if needed with new features

#### Final Verification

- [ ] T130 Verify all acceptance criteria from spec.md are met (excluding video subtitle requirements)
- [ ] T131 Verify all success criteria from spec.md are met (excluding video subtitle requirements)
- [ ] T132 Perform final manual testing of all user flows
- [ ] T133 Prepare deployment checklist

## Task Summary

- **Total Tasks:** 133
- **Phase 1 (Setup):** 5 tasks
- **Phase 2 (Foundational):** 5 tasks
- **Phase 3 (US1 - Language Translation):** 40 tasks
- **Phase 4 (US2 - Card Layout):** 22 tasks
- **Phase 5 (US3 - Contact Carousel):** 27 tasks
- **Phase 6 (Polish):** 34 tasks

### Parallel Execution Opportunities

**Phase 3 (US1):**
- Tasks T011-T017: Can audit pages in parallel
- Tasks T018-T024: Can add English keys in parallel (different categories)
- Tasks T025-T027: Can add translations in parallel (different languages)
- Tasks T028-T041: Can update pages in parallel (different pages)

**Phase 4 (US2):**
- Tasks T051-T056 and T057-T062: Can update components in parallel

**Phase 5 (US3):**
- Tasks T075-T081: Sequential (content → implementation)
- Tasks T082-T084: Can style in parallel with testing

### MVP Scope Recommendation

**Minimum Viable Product:** Phase 1 + Phase 2 + Phase 3 (US1 - Language Translation)

This provides immediate value by completing the i18n implementation, which is foundational and can be tested independently. US2 and US3 can be delivered incrementally after MVP.

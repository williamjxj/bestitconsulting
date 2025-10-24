<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0
Modified principles: Added Animation & Visual Effects, Enhanced Accessibility & Mobile Optimization
Added sections: Animation Standards, Visual Effects Guidelines, Mobile Optimization Requirements
Removed sections: None
Templates requiring updates: ✅ plan-template.md (Constitution Check section), ✅ spec-template.md (accessibility requirements), ✅ tasks-template.md (animation task categories)
Follow-up TODOs: None
-->

# BestIT Consulting Constitution

## Core Principles

### I. Modern Web Stack (NON-NEGOTIABLE)

All development MUST use Next.js 15.2.4, React 19, and TypeScript 5. The stack provides server-side rendering, client-side interactivity, and type safety. No alternative frameworks without explicit justification and approval.

### II. Component-First Architecture

All UI elements MUST be built as reusable React components using functional syntax and TypeScript. Prefer shadcn/ui components over custom implementations. Components must be self-contained, independently testable, and properly documented with JSDoc comments.

### III. Internationalization (NON-NEGOTIABLE)

All user-facing content MUST support multiple languages through the established i18n framework. Default language is English with fallback support. All new features must include translation keys and support for at least English, French, Spanish, and Chinese.

### IV. Quality Standards (NON-NEGOTIABLE)

All code MUST pass ESLint 9, Prettier formatting, and TypeScript strict mode checks. No exceptions for "quick fixes" or "temporary code." Pre-commit hooks enforce quality gates. Code reviews must verify compliance before merge.

### V. Performance & Accessibility (NON-NEGOTIABLE)

All components MUST be accessible with proper ARIA attributes and semantic HTML. Use Tailwind CSS v4 for styling with mobile-first responsive design. Performance budgets must be maintained with Core Web Vitals compliance. All animations MUST respect prefers-reduced-motion and provide fallbacks for motion-sensitive users.

### VI. Animation & Visual Effects (NON-NEGOTIABLE)

All animations MUST use Framer Motion with GSAP for complex timelines. Animations must be performance-optimized, accessible, and respect user motion preferences. Visual effects must enhance user experience without compromising performance or accessibility. All animated elements MUST have proper ARIA labels and keyboard navigation support.

### VII. Mobile Optimization (NON-NEGOTIABLE)

All components MUST be optimized for mobile devices with responsive design, touch-friendly interactions, and performance considerations. Mobile-specific optimizations must be implemented for animations, images, and user interactions. Connection quality and device capabilities must be considered for optimal user experience.

### VIII. Developer Experience

Development environment MUST use Turbopack for fast builds and hot reload. All tooling must be configured for optimal developer productivity. Comprehensive scripts for linting, formatting, type checking, and quality assurance.

## Technology Stack Requirements

**Frontend**: Next.js 15.2.4, React 19, TypeScript 5, Tailwind CSS v4
**UI Components**: shadcn/ui, Radix UI primitives, Lucide React icons
**Animation**: Framer Motion 12.23.24, GSAP 3.13.0, tw-animate-css 1.3.2
**Internationalization**: Custom i18n framework with support for 4+ languages
**Development**: Turbopack, ESLint 9, Prettier, TypeScript strict mode
**Deployment**: Vercel-compatible build settings, environment variable management

## Animation Standards

**Performance**: All animations MUST maintain 60fps and respect prefers-reduced-motion
**Accessibility**: Animated elements MUST have proper ARIA labels and keyboard navigation
**Mobile Optimization**: Animations MUST be optimized for mobile devices with reduced complexity
**Library Usage**: Framer Motion for React components, GSAP for complex timeline animations
**Fallbacks**: All animations MUST provide reduced-motion alternatives

## Visual Effects Guidelines

**Professional Impact**: Visual effects MUST demonstrate technical expertise and build credibility
**Performance Budget**: Effects MUST not impact Core Web Vitals or page load performance
**Accessibility**: All visual effects MUST be accessible to users with different abilities
**Consistency**: Visual effects MUST follow established design patterns and brand guidelines

## Mobile Optimization Requirements

**Responsive Design**: All components MUST work seamlessly across mobile, tablet, and desktop
**Touch Interactions**: Mobile-specific touch gestures and interactions MUST be implemented
**Performance**: Mobile components MUST be optimized for slower connections and limited resources
**Accessibility**: Mobile accessibility features MUST be properly implemented and tested

## Development Workflow

**Code Quality**: All PRs must pass automated quality checks (lint, format, type-check)
**Component Standards**: New components must follow established patterns and include proper TypeScript types
**Animation Standards**: All animations must be tested for accessibility and performance
**Mobile Testing**: All components must be tested on mobile devices and different screen sizes
**Internationalization**: All new features must include translation keys and support multiple languages
**Testing**: Components must be independently testable with clear interfaces
**Documentation**: All exported functions and components must include JSDoc comments

## Governance

This constitution supersedes all other development practices. Amendments require documentation of impact, approval from technical lead, and migration plan for existing code. All PRs and reviews must verify compliance with these principles. Complexity must be justified with clear business value. Use established patterns and avoid reinventing solutions.

**Version**: 1.1.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27

<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0
Modified principles: None (initial constitution)
Added sections: CDN Integration, Client-Server Architecture, Error Handling
Removed sections: None
Templates requiring updates: ✅ updated
- .specify/templates/plan-template.md - Updated constitution check
- .specify/templates/spec-template.md - Updated scope alignment
- .specify/templates/tasks-template.md - Updated task categorization
Follow-up TODOs: None
-->

# BestIT Consulting Constitution

## Core Principles

### I. Next.js App Router Architecture

All pages and components MUST follow Next.js 15 App Router patterns. Server Components are the default; Client Components require explicit 'use client' directive. API routes MUST be in app/api/ directory with proper HTTP method handlers. Static generation preferred over server-side rendering where possible.

### II. TypeScript-First Development

All code MUST be written in TypeScript with strict type checking enabled. No 'any' types allowed without explicit justification. Interfaces MUST be defined for all props, API responses, and data structures. Type safety is NON-NEGOTIABLE for maintainability and developer experience.

### III. Tailwind CSS Utility-First Styling

All styling MUST use Tailwind CSS utility classes. Custom CSS is prohibited unless absolutely necessary. Component variants MUST use class-variance-authority (CVA) for type-safe styling. Responsive design MUST be mobile-first with proper breakpoint usage.

### IV. CDN-Optimized Asset Delivery

All images and videos MUST be served via Cloudflare R2 CDN with proper optimization. Images MUST use Next.js Image component with appropriate sizing and lazy loading. Video content MUST include poster images and proper error handling. CDN configuration MUST be environment-driven with fallback mechanisms.

### V. Client-Server Component Separation

Interactive components with event handlers MUST be Client Components. Server Components MUST handle data fetching and static content. Event handlers, useState, useEffect, and browser APIs MUST be isolated to Client Components. Clear boundaries MUST be maintained between server and client code.

### VI. Error Handling & Resilience

All external dependencies (CDN, APIs, databases) MUST have graceful fallback mechanisms. User-facing errors MUST be informative and actionable. Console errors MUST be logged for debugging. Network failures MUST not break the user experience.

## Technology Standards

### Required Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS v4 with utility classes
- **UI Components**: shadcn/ui with Radix UI primitives
- **CDN**: Cloudflare R2 for asset delivery
- **Deployment**: Vercel-compatible build configuration

### Code Quality Gates

- ESLint MUST pass with zero warnings
- Prettier formatting MUST be enforced
- TypeScript compilation MUST succeed
- Markdown linting MUST pass for documentation
- All components MUST have proper accessibility attributes

## Development Workflow

### Component Architecture

- Server Components for data fetching and static content
- Client Components for interactivity and browser APIs
- Shared utilities in lib/ directory
- UI components in components/ui/ directory
- Feature-specific components co-located with pages

### CDN Integration Requirements

- Environment variables MUST use NEXT*PUBLIC* prefix for client access
- R2 URLs MUST be constructed using helper utilities
- Image optimization MUST use Next.js Image component
- Video content MUST include proper poster and error handling
- Health check endpoints MUST be available for monitoring

### Quality Assurance

- All features MUST be manually tested before deployment
- CDN integration MUST be verified with actual assets
- Error scenarios MUST be tested and handled gracefully
- Performance MUST be monitored for CDN delivery
- Accessibility MUST be validated for all user interactions

## Governance

This constitution supersedes all other development practices. Amendments require documentation of the change rationale, impact assessment, and migration plan for existing code. All pull requests MUST verify compliance with these principles. Complexity beyond these standards MUST be justified with clear business value.

**Version**: 1.1.0 | **Ratified**: 2025-01-20 | **Last Amended**: 2025-01-20

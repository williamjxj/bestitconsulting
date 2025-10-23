<!--
Sync Impact Report:
Version change: Template → 1.0.0
Modified principles: All principles derived from current implementation
Added sections: Technology Stack Requirements, Development Workflow
Removed sections: None (template was empty)
Templates requiring updates: ✅ plan-template.md (Constitution Check section)
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

### V. Performance & Accessibility

All components MUST be accessible with proper ARIA attributes and semantic HTML. Use Tailwind CSS v4 for styling with mobile-first responsive design. Performance budgets must be maintained with Core Web Vitals compliance.

### VI. Developer Experience

Development environment MUST use Turbopack for fast builds and hot reload. All tooling must be configured for optimal developer productivity. Comprehensive scripts for linting, formatting, type checking, and quality assurance.

## Technology Stack Requirements

**Frontend**: Next.js 15.2.4, React 19, TypeScript 5, Tailwind CSS v4
**UI Components**: shadcn/ui, Radix UI primitives, Lucide React icons
**Internationalization**: Custom i18n framework with support for 4+ languages
**Development**: Turbopack, ESLint 9, Prettier, TypeScript strict mode
**Deployment**: Vercel-compatible build settings, environment variable management

## Development Workflow

**Code Quality**: All PRs must pass automated quality checks (lint, format, type-check)
**Component Standards**: New components must follow established patterns and include proper TypeScript types
**Internationalization**: All new features must include translation keys and support multiple languages
**Testing**: Components must be independently testable with clear interfaces
**Documentation**: All exported functions and components must include JSDoc comments

## Governance

This constitution supersedes all other development practices. Amendments require documentation of impact, approval from technical lead, and migration plan for existing code. All PRs and reviews must verify compliance with these principles. Complexity must be justified with clear business value. Use established patterns and avoid reinventing solutions.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27

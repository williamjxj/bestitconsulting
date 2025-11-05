# Research & Technical Decisions

## Overview
This document consolidates research findings and technical decisions for the Contact Form Improvement feature.

## Research Areas

### 1. URL Parameter Handling in Next.js App Router

**Decision:** Use `useSearchParams` hook for client components and `searchParams` prop for server components.

**Rationale:**
- Next.js 15 App Router provides built-in support for URL search parameters
- `useSearchParams` is the recommended approach for client-side components
- Server components can access `searchParams` directly from page props
- No additional dependencies required

**Implementation:**
- Client component: `const searchParams = useSearchParams()` then `searchParams.get('title')`
- Server component: `export default function Page({ searchParams }: { searchParams: { title?: string } })`
- URL decoding: Next.js automatically handles URL encoding/decoding

**Alternatives Considered:**
- `next/navigation` `useRouter` - More complex, requires manual parsing
- Custom URL parsing - Unnecessary overhead, reinventing the wheel

**References:**
- Next.js 15 App Router documentation
- Next.js searchParams API

### 2. shadcn/ui Form Components

**Decision:** Use shadcn/ui form, input, select, and textarea components with React Hook Form integration.

**Rationale:**
- shadcn/ui components are already available in the project
- Built-in accessibility support (ARIA labels, keyboard navigation)
- Consistent design system
- TypeScript support
- React Hook Form integration for validation

**Implementation:**
- Use `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` from shadcn/ui
- Integrate with React Hook Form for validation
- Maintain existing Framer Motion animations where appropriate

**Alternatives Considered:**
- Custom form components - Would require more development time
- Headless UI - Less styled, more configuration needed
- Radix UI directly - More low-level, shadcn/ui provides better abstraction

**References:**
- shadcn/ui form component documentation
- React Hook Form documentation

### 3. Multiselect Dropdown Implementation

**Decision:** Enhance existing multiselect checkbox implementation with shadcn/ui Select component for better UX.

**Rationale:**
- Current implementation uses checkboxes in a grid - works but can be improved
- shadcn/ui Select component provides better accessibility
- Can create a custom multiselect using shadcn/ui Popover + Checkbox components
- Maintains existing checkbox-based selection for visual clarity

**Implementation:**
- Keep existing checkbox grid for Service Interest (proven UX pattern)
- Enhance with shadcn/ui styling and accessibility improvements
- Add visual indicators for selected items

**Alternatives Considered:**
- Native HTML select multiple - Poor UX on mobile
- Third-party multiselect library - Additional dependency
- Custom dropdown - More development time

**References:**
- shadcn/ui select component
- WAI-ARIA multiselect patterns

### 4. Supabase Table Cloning

**Decision:** Use SQL CREATE TABLE AS SELECT to clone table structure and data (optional).

**Rationale:**
- PostgreSQL provides efficient table cloning
- Maintains exact structure including defaults and constraints
- Can clone without data if needed (CREATE TABLE LIKE)
- Supabase supports direct SQL execution

**Implementation:**
```sql
CREATE TABLE bestitconsulting_contacts AS
SELECT * FROM bestitconsultants_contacts WHERE 1=0;
```
This creates empty table with same structure.

**Alternatives Considered:**
- Manual table creation - More error-prone
- Migration tools - Overkill for single table
- Supabase dashboard - Manual process, less reproducible

**References:**
- PostgreSQL CREATE TABLE documentation
- Supabase SQL editor

### 5. CTA URL Parameter Format

**Decision:** Use format `/contact?title=Start%20Your%20Project#contact-form`

**Rationale:**
- Query parameter `title` for auto-fill value
- Hash fragment `#contact-form` for smooth scrolling to form
- URL encoding for spaces (`%20`)
- Standard web convention

**Implementation:**
- Update all CTA links to include `?title=...` parameter
- Use Next.js `Link` component with proper encoding
- Client component reads URL parameter and auto-fills title field

**Alternatives Considered:**
- Separate route per CTA - Would create too many routes
- Session storage - More complex, less shareable
- Local storage - Not accessible across sessions

**References:**
- Next.js Link component documentation
- URL encoding standards

### 6. Form State Management

**Decision:** Continue using React useState with local form state, enhanced with URL parameter initialization.

**Rationale:**
- Current implementation already uses useState effectively
- Adding URL parameter reading is straightforward
- No need for complex state management library
- Maintains component simplicity

**Implementation:**
- Read URL parameters on component mount
- Initialize form state with title from URL
- Preserve existing form state management patterns

**Alternatives Considered:**
- React Hook Form - Would require refactoring existing form
- Zustand/Redux - Overkill for form state
- Context API - Unnecessary complexity

**References:**
- React useState documentation
- Next.js useSearchParams hook

### 7. Performance Optimization

**Decision:** Use debouncing for validation, lazy loading for form components, optimize animations.

**Rationale:**
- Debouncing prevents excessive validation calls
- Lazy loading reduces initial bundle size
- Optimized animations maintain 60fps performance
- GPU acceleration for transforms

**Implementation:**
- Debounce validation with 300ms delay
- Use React.lazy for form component if needed
- Use `will-change` CSS property for animations
- Respect `prefers-reduced-motion` media query

**Alternatives Considered:**
- No debouncing - Poor performance with rapid typing
- Eager loading - Larger initial bundle
- No animation optimization - May cause jank

**References:**
- React performance optimization
- Web.dev performance guides
- CSS will-change property

## Summary

All technical decisions align with:
- Next.js 15 App Router best practices
- shadcn/ui component patterns
- Accessibility standards (WCAG 2.1 AA)
- Performance optimization principles
- Existing codebase architecture

No major blockers or unknowns remain. Implementation can proceed with confidence.


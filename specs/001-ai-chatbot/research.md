# Research: AI Chatbot Feature Migration

**Date**: 2024-12-19
**Reference Implementation**: https://images-hub-pim.vercel.app/
**Source Repository**: https://github.com/williamjxj/images-hub

## Overview

This document consolidates research findings from analyzing the reference AI chatbot implementation in the images-hub repository. The goal is to migrate the exact same chatbot feature to the Best IT Consulting website while adapting it to the existing architecture and requirements.

## Reference Implementation Analysis

### Architecture Overview

The reference implementation uses:
- **Next.js 16** with App Router
- **Vercel AI SDK** (`@ai-sdk/react`, `ai`) for chat functionality
- **DeepSeek LLM** via Vercel AI Gateway (production) or direct API (local)
- **Framer Motion** for animations
- **shadcn/ui** components for UI
- **localStorage** for conversation persistence
- **Clerk** for authentication (NOTE: This app does NOT require authentication)

### Component Structure

#### 1. ChatWidget (Main Component)
- **Location**: `components/chat-widget/chat-widget.tsx`
- **Purpose**: Main orchestrator component that manages open/close state
- **Key Features**:
  - Toggles between icon and panel views
  - Only one visible at a time
  - Simple state management

#### 2. ChatWidgetIcon (Floating Button)
- **Location**: `components/chat-widget/chat-widget-icon.tsx`
- **Purpose**: Floating button in bottom-right corner
- **Key Features**:
  - Fixed position: `bottom-6 right-6`
  - Z-index: `9999`
  - Uses `angel.webp` image (80x80px, rounded-full)
  - Framer Motion scale animation
  - Backdrop blur and border styling
  - Keyboard accessible (Enter/Space)

#### 3. ChatWidgetPanel (Chat Interface)
- **Location**: `components/chat-widget/chat-widget-panel.tsx`
- **Purpose**: Full chat interface panel
- **Key Features**:
  - Fixed position: `bottom-4 right-4`
  - Size: `max-w-md md:w-[450px]`, `h-[calc(100vh-2rem)] max-h-[700px]`
  - Z-index: `9999`
  - Uses `useChat` hook from `@ai-sdk/react`
  - Message persistence via `useChatWidget` hook
  - Auto-scroll to bottom
  - Copy message functionality
  - Timestamp display
  - Error handling with retry
  - Feedback integration
  - Escape key to close

### API Route Implementation

#### Chat API Route
- **Location**: `app/api/chat/route.ts`
- **Runtime**: Edge runtime
- **Key Features**:
  - Uses `streamText` from Vercel AI SDK
  - Environment-aware model selection:
    - Production (Vercel): Uses `"deepseek/deepseek-chat"` string (routes via AI Gateway)
    - Local: Uses `createDeepSeek({ apiKey })` provider directly
  - Authentication check (Clerk) - **NOTE: We'll remove this for public access**
  - Permission check - **NOTE: We'll remove this**
  - 60-second timeout
  - 8000 token limit per message
  - Comprehensive error handling:
    - Authentication errors
    - Validation errors
    - Timeout errors
    - Rate limit errors
    - Service errors

### State Management

#### useChatWidget Hook
- **Location**: `lib/hooks/use-chat-widget.ts`
- **Purpose**: Manages conversation persistence in localStorage
- **Key Features**:
  - Stores messages array
  - Provides `addMessage`, `clearMessages` functions
  - Syncs with `useChat` hook from AI SDK

### Visual Design

#### Icon Button
- Position: Fixed bottom-right (24px from edges)
- Size: 80x80px
- Image: `angel.webp` (already in public folder)
- Styling:
  - Rounded full
  - Backdrop blur
  - Border with opacity
  - Shadow effects
  - Hover effects

#### Chat Panel
- Card-based design using shadcn/ui Card
- Header with title "AI Assistant" and angel.webp icon (24x24px)
- ScrollArea for messages
- Message bubbles:
  - User: Primary color, right-aligned
  - Assistant: Muted background, left-aligned
  - Max width: 80%
  - Timestamp and copy button per message
- Input area at bottom with Send button
- Loading indicator ("Thinking...")
- Error display with retry button

### Animations

- **Icon**: Scale animation on open/close (0.9 to 1.0)
- **Panel**: Fade and slide up animation (opacity 0→1, y: 20→0)
- **Duration**: 0.2-0.3 seconds
- **Library**: Framer Motion with AnimatePresence

## Key Decisions

### Decision 1: Authentication Approach
**Decision**: Remove authentication requirement
**Rationale**:
- Best IT Consulting website is public-facing
- Chatbot should be accessible to all visitors
- No user accounts needed for basic chat functionality
- Aligns with specification requirement for public access

**Alternatives Considered**:
- Keep Clerk authentication (rejected - adds unnecessary complexity)
- Add optional authentication (rejected - not in spec)

### Decision 2: AI Provider Configuration
**Decision**: Use Vercel AI Gateway with DeepSeek in production, direct API in local
**Rationale**:
- User already has `AI_GATEWAY_API_KEY` and `DEEPSEEK_API_KEY` configured
- Vercel AI Gateway provides rate limiting, caching, and monitoring
- Free tier includes $5/month credits
- Seamless production deployment on Vercel

**Alternatives Considered**:
- Direct DeepSeek API only (rejected - loses Gateway benefits)
- OpenAI (rejected - user specified DeepSeek)

### Decision 3: Conversation Persistence
**Decision**: Use localStorage for session persistence
**Rationale**:
- Simple, no backend required
- Persists across page navigation
- No server costs
- Matches reference implementation

**Alternatives Considered**:
- Server-side storage (rejected - adds complexity, not in spec)
- Session storage (rejected - doesn't persist across tabs)

### Decision 4: Component Structure
**Decision**: Mirror reference implementation structure exactly
**Rationale**:
- User explicitly requested "exactly the same as looks"
- Proven architecture from reference
- Maintains consistency with reference design

**Alternatives Considered**:
- Different component organization (rejected - user requirement)

### Decision 5: Styling Approach
**Decision**: Use exact same Tailwind classes and shadcn/ui components
**Rationale**:
- Matches reference visual appearance
- Uses existing design system
- Maintains brand consistency

**Alternatives Considered**:
- Custom styling (rejected - user requirement)

### Decision 6: Error Handling
**Decision**: Implement comprehensive error handling from reference
**Rationale**:
- Robust error handling improves UX
- Handles edge cases gracefully
- Provides retry mechanisms

**Alternatives Considered**:
- Simplified error handling (rejected - reduces reliability)

### Decision 7: Internationalization
**Decision**: Integrate with existing i18n system
**Rationale**:
- Website already supports 4 languages
- Chatbot should match user's language preference
- Maintains consistency with site-wide i18n

**Alternatives Considered**:
- English only (rejected - violates spec requirement)

### Decision 8: Lead Capture Integration
**Decision**: Integrate with existing contact form system
**Rationale**:
- Spec requires lead capture
- Existing contact form API already handles email notifications
- No need for separate CRM integration (per spec clarification)

**Alternatives Considered**:
- Separate lead capture system (rejected - adds complexity)

## Technical Adaptations Required

### 1. Remove Authentication
- Remove Clerk auth checks from API route
- Remove `@clerk/nextjs/server` dependency
- Remove permission checks
- Make route publicly accessible

### 2. Integrate with Existing i18n
- Use existing `useI18n` hook
- Add chatbot translations to translation files
- Detect user language preference
- Translate chatbot messages

### 3. Integrate Lead Capture
- Detect when user expresses interest
- Capture contact information in conversation
- Submit to existing `/api/contact` endpoint
- Maintain conversation context

### 4. Knowledge Base Integration
- Extract FAQ content from existing FAQ page
- Extract service information from services page
- Create knowledge base for AI context
- Provide system prompt with company information

### 5. Layout Integration
- Add ChatWidget to root layout
- Ensure it appears on all pages
- Maintain z-index hierarchy
- Ensure mobile responsiveness

## Dependencies

### Required Packages
- `ai` - Vercel AI SDK core
- `@ai-sdk/react` - React hooks for AI SDK
- `@ai-sdk/deepseek` - DeepSeek provider
- `framer-motion` - Already installed
- `lucide-react` - Already installed (for icons)

### Environment Variables
- `AI_GATEWAY_API_KEY` - Already configured
- `DEEPSEEK_API_KEY` - Already configured
- `VERCEL` - Auto-set by Vercel (for environment detection)

## Implementation Notes

### File Structure
```
components/
  chat-widget/
    chat-widget.tsx
    chat-widget-icon.tsx
    chat-widget-panel.tsx
app/
  api/
    chat/
      route.ts
lib/
  hooks/
    use-chat-widget.ts
types/
  chat-widget.ts
```

### Key Differences from Reference
1. **No Authentication**: Public access, no Clerk
2. **i18n Integration**: Uses existing translation system
3. **Lead Capture**: Integrates with contact form
4. **Knowledge Base**: Uses website content as context
5. **No Feedback System**: Can add later if needed

## Success Criteria

- [ ] Chatbot appears on all pages (bottom-right)
- [ ] Exact visual match with reference implementation
- [ ] Streaming responses work correctly
- [ ] Conversation persists across navigation
- [ ] Error handling works properly
- [ ] Mobile responsive
- [ ] Accessible (keyboard, screen reader)
- [ ] Multi-language support
- [ ] Lead capture integration
- [ ] Performance meets targets (<1s load, <3s response)

## Next Steps

1. Create component files based on reference
2. Create API route adapted for public access
3. Create hook for state management
4. Add translations for all languages
5. Integrate with contact form
6. Test all scenarios
7. Optimize performance


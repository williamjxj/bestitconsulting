# Task Management: AI Chatbot Assistant

## Constitution Check
This task management system MUST align with the Best IT Consulting Project Constitution v1.0.0, ensuring all principles are upheld throughout implementation.

## Implementation Strategy

### MVP Scope
**Primary Focus**: User Story 1 (Basic Chat Functionality) - Core chat interface with message sending/receiving and streaming responses.

**MVP Deliverable**: Functional chatbot widget that appears on all pages, allows users to send messages, and receives streaming AI responses.

### Incremental Delivery
1. **Week 1**: Setup + US1 (Basic Chat) + US2 (Persistence) - Core functionality
2. **Week 2**: US3 (FAQ) + US4 (Language) + US5 (Lead Capture) - Enhanced features
3. **Future**: US6 (Error Handling) + US7 (Pricing) + US8 (Escalation) - Polish and advanced features

## Dependencies

### Story Completion Order
```
Phase 1: Setup (Foundation)
  ↓
Phase 2: Foundational (Blocking Prerequisites)
  ↓
Phase 3: US1 - Basic Chat Functionality (MVP)
  ↓
Phase 4: US2 - Message Persistence
  ↓
Phase 5: US3 - FAQ Answering
  ↓
Phase 6: US4 - Language Support
  ↓
Phase 7: US5 - Lead Generation
  ↓
Phase 8: US6 - Error Handling
  ↓
Phase 9: US7 - Pricing Inquiry
  ↓
Phase 10: US8 - Escalation to Human
  ↓
Phase 11: Polish & Cross-Cutting Concerns
```

### Parallel Execution Opportunities
- **Phase 1**: All setup tasks can run in parallel (different files)
- **Phase 2**: Type definitions and hook can be parallel
- **Phase 3 (US1)**: Icon and Panel components can be built in parallel
- **Phase 4 (US2)**: Hook enhancement and integration can be parallel
- **Phase 5 (US3)**: Knowledge base extraction and system prompt can be parallel
- **Phase 6 (US4)**: Translation files can be updated in parallel

## Phase 1: Setup

**Goal**: Initialize project with required dependencies and project structure.

**Independent Test Criteria**: Dependencies installed, project structure created, no TypeScript errors.

- [x] T001 Install AI SDK dependencies (`ai`, `@ai-sdk/react`, `@ai-sdk/deepseek`) via package manager
- [x] T002 Verify environment variables (`AI_GATEWAY_API_KEY`, `DEEPSEEK_API_KEY`) are configured in `.env.local`
- [x] T003 Create directory structure: `components/chat-widget/` directory
- [x] T004 Create directory structure: `app/api/chat/` directory
- [x] T005 Create directory structure: `lib/hooks/` directory (if not exists)
- [x] T006 Create directory structure: `types/` directory (if not exists)

## Phase 2: Foundational

**Goal**: Create core infrastructure (types, hooks, API route) that all user stories depend on.

**Independent Test Criteria**: Types compile, hook loads/saves to localStorage, API route returns streaming response.

- [x] T007 [P] Create type definitions in `types/chat-widget.ts` with Message, MessagePart interfaces
- [x] T008 [P] Create chat widget hook in `lib/hooks/use-chat-widget.ts` with localStorage persistence
- [x] T009 Create API route in `app/api/chat/route.ts` with Edge runtime and DeepSeek integration
- [x] T010 Implement environment-aware model selection (Vercel AI Gateway vs direct API) in `app/api/chat/route.ts`
- [x] T011 Implement message validation (array check, token limit) in `app/api/chat/route.ts`
- [x] T012 Implement timeout handling (60 seconds) in `app/api/chat/route.ts`
- [x] T013 Implement error handling (validation, timeout, service errors) in `app/api/chat/route.ts`
- [x] T014 Test API route with sample messages to verify streaming response works

## Phase 3: User Story 1 - Basic Chat Functionality

**Goal**: Users can open chatbot, send messages, and receive streaming AI responses.

**User Story**: As a website visitor, I want to interact with an AI chatbot so that I can get instant answers to my questions.

**Independent Test Criteria**:
- Chatbot icon appears on all pages (bottom-right)
- Clicking icon opens chat panel
- User can type and send messages
- AI responses stream in real-time
- Messages display correctly (user right, assistant left)
- Panel can be closed with X button or Escape key

**Tasks**:
- [x] T015 [P] [US1] Create ChatWidgetIcon component in `components/chat-widget/chat-widget-icon.tsx` with floating button
- [x] T016 [P] [US1] Create ChatWidgetPanel component in `components/chat-widget/chat-widget-panel.tsx` with chat interface
- [x] T017 [US1] Implement icon button with `angel.webp` image (80x80px) in `components/chat-widget/chat-widget-icon.tsx`
- [x] T018 [US1] Implement fixed positioning (bottom-6 right-6, z-9999) in `components/chat-widget/chat-widget-icon.tsx`
- [x] T019 [US1] Implement Framer Motion scale animation in `components/chat-widget/chat-widget-icon.tsx`
- [x] T020 [US1] Implement keyboard accessibility (Enter/Space) in `components/chat-widget/chat-widget-icon.tsx`
- [x] T021 [US1] Implement panel layout (Card, header, scroll area, input) in `components/chat-widget/chat-widget-panel.tsx`
- [x] T022 [US1] Implement useChat hook integration from `@ai-sdk/react` in `components/chat-widget/chat-widget-panel.tsx`
- [x] T023 [US1] Implement message input form with Send button in `components/chat-widget/chat-widget-panel.tsx`
- [x] T024 [US1] Implement message display (user right, assistant left) in `components/chat-widget/chat-widget-panel.tsx`
- [x] T025 [US1] Implement streaming response display in `components/chat-widget/chat-widget-panel.tsx`
- [x] T026 [US1] Implement loading indicator ("Thinking...") in `components/chat-widget/chat-widget-panel.tsx`
- [x] T027 [US1] Implement close button (X) in panel header in `components/chat-widget/chat-widget-panel.tsx`
- [x] T028 [US1] Implement Escape key handler to close panel in `components/chat-widget/chat-widget-panel.tsx`
- [x] T029 [US1] Implement Framer Motion panel animations (fade, slide) in `components/chat-widget/chat-widget-panel.tsx`
- [x] T030 [US1] Create main ChatWidget component in `components/chat-widget/chat-widget.tsx` with toggle logic
- [x] T031 [US1] Add ChatWidget to root layout in `app/layout.tsx`
- [x] T032 [US1] Test chatbot appears on all pages and opens/closes correctly

## Phase 4: User Story 2 - Message Persistence

**Goal**: Conversation history persists across page navigation using localStorage.

**User Story**: As a user, I want my conversation history to persist when I navigate between pages so that I can continue my conversation seamlessly.

**Independent Test Criteria**:
- Messages persist in localStorage
- Messages restore when reopening chatbot
- Messages persist across page navigation
- Conversation limit (100 messages) enforced

**Tasks**:
- [x] T033 [US2] Enhance useChatWidget hook to sync with useChat messages in `lib/hooks/use-chat-widget.ts`
- [x] T034 [US2] Implement message limit (100 messages) in `lib/hooks/use-chat-widget.ts`
- [x] T035 [US2] Implement message restoration on mount in `components/chat-widget/chat-widget-panel.tsx`
- [x] T036 [US2] Test message persistence across page navigation
- [x] T037 [US2] Test message limit enforcement (100 messages max)

## Phase 5: User Story 3 - FAQ Answering

**Goal**: Chatbot can answer FAQ questions using knowledge base from website content.

**User Story**: As a user, I want to ask FAQ questions and get accurate answers based on the company's knowledge base.

**Independent Test Criteria**:
- Chatbot answers FAQ questions accurately
- System prompt includes company information
- Knowledge base extracted from FAQ page
- Responses reference company services

**Tasks**:
- [x] T038 [US3] Extract FAQ content from `app/faq/page.tsx` for knowledge base
- [x] T039 [US3] Extract service information from `app/services/page.tsx` for knowledge base
- [x] T040 [US3] Create system prompt with company information in `app/api/chat/route.ts`
- [ ] T041 [US3] Test FAQ question answering ("Do you offer ongoing support?")
- [ ] T042 [US3] Test service question answering ("What services do you offer?")

## Phase 6: User Story 4 - Language Support

**Goal**: Chatbot supports all 4 languages (English, French, Spanish, Chinese) matching user's site language preference.

**User Story**: As a multilingual user, I want the chatbot to respond in my preferred language so that I can communicate effectively.

**Independent Test Criteria**:
- Chatbot detects user's language preference
- Responses are in correct language
- Language preference persists
- UI elements translated correctly

**Tasks**:
- [x] T043 [US4] Add chatbot translations to `lib/i18n/translations/en.ts`
- [x] T044 [US4] Add chatbot translations to `lib/i18n/translations/fr.ts`
- [x] T045 [US4] Add chatbot translations to `lib/i18n/translations/es.ts`
- [x] T046 [US4] Add chatbot translations to `lib/i18n/translations/zh.ts`
- [x] T047 [US4] Integrate useI18n hook in `components/chat-widget/chat-widget-panel.tsx`
- [x] T048 [US4] Implement language detection from user's site preference in `components/chat-widget/chat-widget-panel.tsx`
- [x] T049 [US4] Pass language context to API route in `components/chat-widget/chat-widget-panel.tsx`
- [x] T050 [US4] Update system prompt to include language instruction in `app/api/chat/route.ts`
- [ ] T051 [US4] Test language switching and response language accuracy

## Phase 7: User Story 5 - Lead Generation

**Goal**: Chatbot captures lead information when user expresses interest and submits to contact form API.

**User Story**: As a business, I want the chatbot to capture lead information when users express interest so that I can follow up with potential clients.

**Independent Test Criteria**:
- Chatbot detects interest expressions
- Lead capture form appears in conversation
- Contact information validated
- Lead submitted to `/api/contact` endpoint
- User receives confirmation

**Tasks**:
- [ ] T052 [US5] Implement interest detection logic in `components/chat-widget/chat-widget-panel.tsx`
- [ ] T053 [US5] Create lead capture form component in `components/chat-widget/chat-widget-panel.tsx`
- [ ] T054 [US5] Implement form validation (email, name) in lead capture form
- [ ] T055 [US5] Integrate with existing `/api/contact` endpoint for lead submission
- [ ] T056 [US5] Implement confirmation message after lead submission
- [ ] T057 [US5] Test lead capture flow end-to-end

## Phase 8: User Story 6 - Error Handling

**Goal**: Comprehensive error handling with user-friendly messages and retry mechanisms.

**User Story**: As a user, I want clear error messages and retry options when something goes wrong so that I can continue my conversation.

**Independent Test Criteria**:
- Network errors display user-friendly messages
- Timeout errors show retry option
- Rate limit errors show retry-after time
- Validation errors show clear guidance
- Retry functionality works correctly

**Tasks**:
- [ ] T058 [US6] Implement error display UI in `components/chat-widget/chat-widget-panel.tsx`
- [ ] T059 [US6] Implement retry button functionality in `components/chat-widget/chat-widget-panel.tsx`
- [ ] T060 [US6] Implement error message mapping (network, timeout, rate limit) in `components/chat-widget/chat-widget-panel.tsx`
- [ ] T061 [US6] Test error scenarios (network failure, timeout, rate limit)
- [ ] T062 [US6] Test retry functionality

## Phase 9: User Story 7 - Pricing Inquiry

**Goal**: Chatbot provides accurate pricing information and offers consultation scheduling.

**User Story**: As a potential client, I want to ask about pricing and get information about consultation options.

**Independent Test Criteria**:
- Pricing questions answered accurately
- Consultation scheduling mentioned
- Links to contact form provided

**Tasks**:
- [ ] T063 [US7] Add pricing information to system prompt in `app/api/chat/route.ts`
- [ ] T064 [US7] Test pricing inquiry responses ("How much does it cost?")
- [ ] T065 [US7] Verify consultation scheduling suggestions in responses

## Phase 10: User Story 8 - Escalation to Human

**Goal**: Users can request human contact and chatbot provides contact options.

**User Story**: As a user, I want to speak with a human representative when needed so that I can get personalized assistance.

**Independent Test Criteria**:
- Escalation request detected
- Contact options displayed (phone, email, form)
- User information captured if available
- Confirmation message shown

**Tasks**:
- [ ] T066 [US8] Implement escalation detection in `components/chat-widget/chat-widget-panel.tsx`
- [ ] T067 [US8] Create contact options display component in `components/chat-widget/chat-widget-panel.tsx`
- [ ] T068 [US8] Implement contact information capture in `components/chat-widget/chat-widget-panel.tsx`
- [ ] T069 [US8] Test escalation flow ("Can I speak with someone?")

## Phase 11: Polish & Cross-Cutting Concerns

**Goal**: Performance optimization, accessibility improvements, and final polish.

**Independent Test Criteria**:
- Performance targets met (LCP <2.5s, bundle <50KB)
- WCAG 2.1 AA compliance verified
- Mobile responsiveness confirmed
- Cross-browser compatibility verified

**Tasks**:
- [x] T070 Implement lazy loading for ChatWidget component in `app/layout.tsx`
- [ ] T071 Optimize bundle size (code splitting, tree shaking)
- [x] T072 Implement auto-scroll to bottom when new messages arrive in `components/chat-widget/chat-widget-panel.tsx`
- [x] T073 Implement copy message functionality in `components/chat-widget/chat-widget-panel.tsx`
- [x] T074 Implement timestamp display for messages in `components/chat-widget/chat-widget-panel.tsx`
- [x] T075 Add ARIA labels to all interactive elements
- [ ] T076 Verify keyboard navigation (Tab, Enter, Space, Escape)
- [ ] T077 Test screen reader compatibility
- [ ] T078 Verify color contrast ratios (4.5:1 minimum)
- [ ] T079 Implement reduced motion support for animations
- [ ] T080 Test mobile responsiveness (touch interactions, layout)
- [ ] T081 Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] T082 Performance testing (Lighthouse, Core Web Vitals)
- [x] T083 Add JSDoc comments to all exported functions and components
- [x] T084 Run ESLint and fix all warnings
- [x] T085 Run Prettier and format all code
- [ ] T086 Final accessibility audit
- [ ] T087 Final performance verification
- [ ] T088 Update documentation with chatbot feature

## Task Summary

- **Total Tasks**: 88
- **Setup Tasks**: 6 (Phase 1)
- **Foundational Tasks**: 8 (Phase 2)
- **US1 Tasks**: 18 (Phase 3) - MVP
- **US2 Tasks**: 5 (Phase 4)
- **US3 Tasks**: 5 (Phase 5)
- **US4 Tasks**: 9 (Phase 6)
- **US5 Tasks**: 6 (Phase 7)
- **US6 Tasks**: 5 (Phase 8)
- **US7 Tasks**: 3 (Phase 9)
- **US8 Tasks**: 4 (Phase 10)
- **Polish Tasks**: 19 (Phase 11)

## Parallel Execution Examples

### Phase 1 (Setup)
All tasks can run in parallel - different operations:
- T001: Install packages
- T002: Verify env vars
- T003-T006: Create directories

### Phase 2 (Foundational)
- T007 + T008: Can run in parallel (types vs hook)
- T009-T013: Sequential (API route implementation)

### Phase 3 (US1 - Basic Chat)
- T015 + T016: Can run in parallel (Icon vs Panel components)
- T017-T020: Sequential (Icon features)
- T021-T029: Sequential (Panel features)
- T030-T032: Sequential (Integration)

### Phase 4 (US2 - Persistence)
- T033-T037: Sequential (hook enhancement and testing)

### Phase 5 (US3 - FAQ)
- T038 + T039: Can run in parallel (extract different content)
- T040-T042: Sequential (system prompt and testing)

### Phase 6 (US4 - Language)
- T043-T046: Can run in parallel (different translation files)
- T047-T051: Sequential (integration and testing)

## Constitution Compliance Verification

This task management system has been reviewed against the Best IT Consulting Project Constitution v1.0.0 and ensures:
- [x] All 8 core principles are addressed
- [x] Technical standards are met
- [x] Governance requirements are followed
- [x] Implementation guidelines are adhered to
- [x] Quality gates are established

**Constitution Compliance:** ✅ VERIFIED
**Last Updated:** 2024-12-19


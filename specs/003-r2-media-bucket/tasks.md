# Tasks: R2 Media Bucket Integration

**Input**: Design documents from `/specs/003-r2-media-bucket/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test tasks included as not explicitly requested in feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: Next.js App Router structure with components/, lib/, app/ directories
- Paths based on existing Next.js project structure from plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create placeholder images directory structure in public/placeholders/
- [x] T002 [P] Create lib/r2-media.ts utility file for R2 media operations
- [x] T003 [P] Create lib/media-config.ts configuration file for media constants
- [x] T004 [P] Create components/ui/skeleton.tsx for loading skeleton components

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Setup environment variable validation for NEXT_PUBLIC_R2_MORE_URL in lib/r2-media.ts
- [x] T006 [P] Create R2Image component with loading states in components/R2Image.tsx
- [x] T007 [P] Create R2Video component with loading states in components/R2Video.tsx
- [x] T008 Create MediaAsset interface and types in lib/r2-media.ts
- [x] T009 Create R2BucketConfig interface and validation in lib/r2-media.ts
- [x] T010 [P] Add placeholder images (team-placeholder.jpg, company-placeholder.jpg) in public/placeholders/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Media Content Delivery (Priority: P1) 🎯 MVP

**Goal**: Enable access to rich media content (images and videos) stored in R2 bucket with proper loading states and fallbacks

**Independent Test**: Upload media files to R2 bucket and verify they load successfully in the application with proper error handling

### Implementation for User Story 1

- [x] T011 [P] [US1] Implement URL construction utilities in lib/r2-media.ts
- [x] T012 [P] [US1] Add error handling and retry logic to R2Image component in components/R2Image.tsx
- [x] T013 [P] [US1] Add error handling and retry logic to R2Video component in components/R2Video.tsx
- [x] T014 [US1] Create MediaGallery component for displaying media collections in components/MediaGallery.tsx
- [x] T015 [US1] Create CompanyImages component for company media display in components/CompanyImages.tsx
- [x] T016 [US1] Implement fallback behavior for unavailable media content
- [x] T017 [US1] Add performance optimization (lazy loading, image optimization) to media components

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Environment Configuration (Priority: P2)

**Goal**: Configure R2 bucket access through environment variables for different deployment environments

**Independent Test**: Set NEXT_PUBLIC_R2_MORE_URL environment variable and verify application reads and uses the bucket URL correctly

### Implementation for User Story 2

- [x] T018 [P] [US2] Enhance environment variable validation in lib/r2-media.ts
- [x] T019 [P] [US2] Create environment-specific configuration handling in lib/media-config.ts
- [x] T020 [US2] Implement R2 bucket health check endpoint in app/api/r2/health/route.ts
- [x] T021 [US2] Add configuration validation on application startup
- [x] T022 [US2] Create error handling for misconfigured environment variables
- [x] T023 [US2] Add logging for configuration status and bucket accessibility

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Media Asset Management (Priority: P3)

**Goal**: Enable upload and organization of media assets in the dedicated R2 bucket for website content

**Independent Test**: Upload various media types to R2 bucket and verify they are accessible and properly organized

### Implementation for User Story 3

- [x] T024 [P] [US3] Create MediaGallery interface and validation in lib/r2-media.ts
- [x] T025 [P] [US3] Implement media asset categorization (team, company, general) in components
- [x] T026 [US3] Add media asset organization utilities in lib/r2-media.ts
- [x] T027 [US3] Create media asset management API endpoints in app/api/r2/media/route.ts
- [x] T028 [US3] Implement media asset filtering and search capabilities
- [x] T029 [US3] Add media asset metadata management (alt text, categories, etc.)
- [x] T030 [US3] Create media asset upload validation and constraints

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: About Page Integration

**Purpose**: Integrate R2 media components into the about page

- [x] T031 Update about page to use R2 media components in app/about/page.tsx
- [x] T032 [P] Add team photos section to about page using MediaGallery component
- [x] T033 [P] Add company images section to about page using CompanyImages component
- [x] T034 Replace existing static images with R2 bucket images
- [x] T035 Add responsive design for media galleries on about page
- [x] T036 Implement loading states and error handling for about page media

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T037 [P] Add comprehensive error boundaries for media components
- [x] T038 [P] Optimize image loading performance across all components
- [x] T039 [P] Add accessibility improvements (ARIA labels, keyboard navigation)
- [x] T040 [P] Implement responsive design for all media components
- [x] T041 [P] Add analytics tracking for media engagement
- [x] T042 [P] Create documentation for R2 media integration
- [x] T043 [P] Add monitoring and health checks for R2 bucket performance
- [x] T044 [P] Implement caching strategies for media assets
- [x] T045 [P] Add security headers and CORS configuration for R2 bucket
- [x] T046 [P] Create quickstart guide validation and testing

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **About Page Integration (Phase 6)**: Depends on User Story 1 completion
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Core utilities before components
- Components before integration
- Error handling after core functionality
- Performance optimization after basic functionality
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all parallel tasks for User Story 1 together:
Task: "Implement URL construction utilities in lib/r2-media.ts"
Task: "Add error handling and retry logic to R2Image component in components/R2Image.tsx"
Task: "Add error handling and retry logic to R2Video component in components/R2Video.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 6: About Page Integration
5. **STOP and VALIDATE**: Test User Story 1 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add About Page Integration → Test independently → Deploy/Demo
4. Add User Story 2 → Test independently → Deploy/Demo
5. Add User Story 3 → Test independently → Deploy/Demo
6. Add Polish → Final optimization and deployment

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 + About Page Integration
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

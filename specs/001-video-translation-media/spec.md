# Technical Specification Template

## Constitution Check
This specification MUST align with the Best IT Consulting Project Constitution v1.0.0, ensuring all principles are upheld throughout implementation.

## Specification Overview
- **Feature Name:** Digital Video Translation and Media Display Improvements
- **Version:** 1.0.0
- **Priority:** High
- **Complexity:** Medium
- **Estimated Effort:** 3-4 weeks

## Core Principles Compliance

### Modern Web Architecture
- [x] Next.js 15+ App Router implementation
- [x] TypeScript strict mode enabled
- [x] Server/Client component separation
- [x] Modern React patterns (hooks, context)

### Accessibility-First Development
- [x] WCAG 2.1 AA compliance planning
- [x] Screen reader support design
- [x] Keyboard navigation implementation
- [x] ARIA labels and semantic HTML

### Performance Optimization
- [x] Core Web Vitals targets defined
- [x] Mobile performance optimization
- [x] Bundle size optimization
- [x] Animation performance planning

### Visual Excellence
- [x] Tailwind CSS utility classes only
- [x] shadcn/ui component integration
- [x] Animation and micro-interaction design
- [x] Brand consistency maintenance

### Internationalization
- [x] Multi-language support planning
- [x] Cultural considerations
- [x] Localized content strategy
- [x] SEO optimization for all languages

### Security and Privacy
- [x] Environment variable security
- [x] API endpoint security
- [x] GDPR compliance planning
- [x] Data protection measures

### Code Quality and Maintainability
- [x] TypeScript typing strategy
- [x] ESLint configuration
- [x] Prettier formatting
- [x] Documentation standards

### Animation and Interaction Standards
- [x] Performance-optimized animations
- [x] GPU acceleration planning
- [x] Reduced motion support
- [x] Device-specific optimizations

## Functional Requirements

### Core Functionality

#### Video Translation Support
- **Primary Function:** Enable multi-language subtitle and caption support for digital videos displayed on the website
- **User Interactions:**
  - Users can select their preferred language for video subtitles/captions
  - Subtitles automatically display based on user's language preference
  - Users can toggle subtitles on/off during video playback
  - Users can adjust subtitle appearance (size, position, background) for accessibility
- **Data Flow:**
  - Video metadata includes available subtitle languages
  - Subtitle files are loaded based on user's selected language
  - Subtitle timing is synchronized with video playback
  - Language selection persists across sessions
- **State Management:**
  - Current subtitle language preference stored in user context
  - Subtitle visibility state managed at component level
  - Subtitle file loading state tracked for error handling

#### Media Card and Thumbnail Improvements
- **Primary Function:** Enhance visual presentation and performance of media cards and thumbnails across portfolio, case studies, and gallery sections
- **User Interactions:**
  - Improved hover states with smooth transitions
  - Better image loading states with progressive enhancement
  - Enhanced thumbnail previews with metadata overlay
  - Responsive grid layouts that adapt to screen size
  - Lazy loading for better performance
- **Data Flow:**
  - Media metadata (title, description, category) displayed on cards
  - Thumbnail images optimized for different viewport sizes
  - Card interactions trigger appropriate navigation or modal views
- **State Management:**
  - Loading states for media assets
  - Hover and focus states for interactive cards
  - Grid layout state for responsive adjustments

### User Experience

#### Video Translation Journey
- **User Journey:**
  1. User visits page with video content
  2. Video loads with default language subtitles (based on user preference or site default)
  3. User can access language selector to change subtitle language
  4. Subtitles update in real-time without interrupting playback
  5. User can customize subtitle appearance for better readability
- **Interaction Patterns:**
  - Language selector accessible from video controls
  - Subtitle toggle button in video control bar
  - Settings panel for subtitle customization
  - Keyboard shortcuts for common actions (toggle subtitles, change language)
- **Visual Feedback:**
  - Loading indicator while subtitle files are being fetched
  - Clear indication of current subtitle language
  - Smooth transitions when switching languages
  - Error messages if subtitle files fail to load
- **Error Handling:**
  - Graceful fallback to default language if selected language unavailable
  - Clear error messages if subtitle loading fails
  - Option to continue watching without subtitles
  - Retry mechanism for failed subtitle loads

#### Media Card Journey
- **User Journey:**
  1. User views portfolio/case studies page with media grid
  2. Thumbnails load progressively with smooth animations
  3. User hovers over card to see enhanced preview
  4. User clicks card to view full details or navigate to project
  5. Cards maintain visual consistency across all sections
- **Interaction Patterns:**
  - Hover effects reveal additional information
  - Click/tap to navigate or open detailed view
  - Keyboard navigation between cards
  - Smooth scroll animations when cards come into view
- **Visual Feedback:**
  - Loading skeletons while images load
  - Hover states with scale and shadow effects
  - Focus indicators for keyboard navigation
  - Smooth transitions for all state changes
- **Error Handling:**
  - Placeholder images if media fails to load
  - Graceful degradation for slow connections
  - Retry options for failed image loads

### Integration Points

#### Video Translation
- **API Endpoints:**
  - Subtitle file storage and retrieval endpoints
  - Language metadata API for available subtitle languages
- **External Services:**
  - Integration with existing i18n system for language management
  - R2 storage for subtitle file assets
- **Database Interactions:**
  - User language preferences (if user accounts exist)
  - Video metadata with subtitle availability information
- **Third-party Integrations:**
  - Video player library for subtitle rendering (if needed)
  - Translation service integration (if automatic translation required)

#### Media Cards
- **API Endpoints:**
  - Media asset retrieval endpoints
  - Thumbnail generation endpoints
- **External Services:**
  - R2 storage for optimized image assets
  - Image optimization service for responsive thumbnails
- **Database Interactions:**
  - Media metadata retrieval
  - Project/case study information for card content
- **Third-party Integrations:**
  - Image CDN for optimized delivery
  - Lazy loading library for performance

## Technical Requirements

### Architecture

#### Video Translation
- **Component Structure:**
  - Video player component with subtitle support
  - Subtitle renderer component
  - Language selector component
  - Subtitle settings panel component
- **Data Flow:**
  - Subtitle files fetched based on language selection
  - Subtitle data parsed and synchronized with video timeline
  - User preferences stored in context/localStorage
- **State Management:**
  - React Context for language preferences
  - Component state for subtitle visibility and settings
  - Error state for subtitle loading failures
- **Error Boundaries:**
  - Error boundary around video player to handle subtitle loading failures
  - Fallback UI when subtitles unavailable

#### Media Cards
- **Component Structure:**
  - Enhanced media card component with improved visuals
  - Thumbnail component with lazy loading
  - Responsive grid layout component
  - Image optimization wrapper
- **Data Flow:**
  - Media metadata passed as props to card components
  - Image URLs optimized based on viewport size
  - Lazy loading triggered by intersection observer
- **State Management:**
  - Component-level state for hover and loading
  - Context for grid layout preferences
  - Global state for media loading progress
- **Error Boundaries:**
  - Error boundary for media grid to handle image loading failures
  - Fallback UI for missing or broken images

### Performance

#### Video Translation
- **Load Time:**
  - Subtitle files load within 500ms of video initialization
  - No impact on initial video load time
- **Animation Performance:**
  - Subtitle transitions render at 60fps
  - Language switching completes within 200ms
- **Memory Usage:**
  - Subtitle files cached efficiently
  - Memory released when video component unmounts
- **Bundle Size Impact:**
  - Subtitle parser library adds <50KB to bundle
  - Lazy load subtitle components if possible

#### Media Cards
- **Load Time:**
  - Initial card grid renders within 1 second
  - Thumbnails load progressively without blocking
  - Lazy loading reduces initial page weight by 60%
- **Animation Performance:**
  - Hover animations maintain 60fps
  - Card transitions use GPU acceleration
  - Scroll animations optimized with intersection observer
- **Memory Usage:**
  - Images unloaded when out of viewport
  - Efficient caching of loaded thumbnails
- **Bundle Size Impact:**
  - Image optimization utilities add <30KB
  - Lazy loading library adds <20KB

### Accessibility

#### Video Translation
- **WCAG Compliance:** 2.1 AA standard
- **Screen Reader Support:**
  - Subtitle language announced when changed
  - Subtitle toggle state announced
  - Subtitle content available to screen readers
- **Keyboard Navigation:**
  - Tab navigation to all video controls
  - Enter/Space to toggle subtitles
  - Arrow keys for language selection
- **Color Contrast:** 4.5:1 minimum ratio for subtitle text
- **Reduced Motion:**
  - Respects prefers-reduced-motion
  - Subtitle transitions disabled when motion reduced

#### Media Cards
- **WCAG Compliance:** 2.1 AA standard
- **Screen Reader Support:**
  - Card content properly labeled
  - Image alt text descriptive and meaningful
  - Card actions announced clearly
- **Keyboard Navigation:**
  - Tab navigation between cards
  - Enter/Space to activate card
  - Arrow keys for grid navigation
- **Color Contrast:** 4.5:1 minimum ratio for all text on cards
- **Reduced Motion:**
  - Hover animations disabled when motion reduced
  - Scroll animations simplified for reduced motion

### Security

#### Video Translation
- **Data Protection:**
  - Subtitle files served over HTTPS
  - No sensitive data in subtitle files
- **Input Validation:**
  - Language codes validated against allowed list
  - Subtitle file format validated before parsing
- **Authentication:**
  - No authentication required for subtitle access
  - Public subtitle files accessible to all users
- **Authorization:**
  - All users can access all available subtitle languages

#### Media Cards
- **Data Protection:**
  - Media URLs validated before rendering
  - No user data exposed in card metadata
- **Input Validation:**
  - Image URLs sanitized
  - Metadata validated before display
- **Authentication:**
  - No authentication required for viewing media cards
  - Public media accessible to all users
- **Authorization:**
  - All users can view all media cards

## Implementation Details

### Component Design

#### Video Translation Components
```typescript
// Video player with subtitle support
interface VideoPlayerWithSubtitlesProps {
  videoUrl: string
  subtitleLanguages: string[]
  defaultLanguage?: string
  onLanguageChange?: (language: string) => void
}

// Subtitle renderer
interface SubtitleRendererProps {
  subtitles: SubtitleData[]
  currentTime: number
  visible: boolean
  settings: SubtitleSettings
}

// Language selector
interface LanguageSelectorProps {
  availableLanguages: Language[]
  currentLanguage: string
  onSelect: (language: string) => void
}
```

#### Media Card Components
```typescript
// Enhanced media card
interface EnhancedMediaCardProps {
  title: string
  description: string
  thumbnail: string
  category?: string
  metadata?: MediaMetadata
  onClick?: () => void
  onHover?: () => void
}

// Optimized thumbnail
interface OptimizedThumbnailProps {
  src: string
  alt: string
  sizes: string
  loading?: 'lazy' | 'eager'
  placeholder?: string
}
```

### Styling Approach
- **Framework:** Tailwind CSS utility classes only
- **Design System:** shadcn/ui components
- **Responsive Design:** Mobile-first approach
- **Theme Support:**
  - Consistent with existing design system
  - Dark mode support if applicable
  - High contrast mode for accessibility

### Animation Specifications

#### Video Translation
- **Animation Type:** Fade and slide transitions
- **Duration:** 200ms for language switching
- **Easing:** ease-in-out
- **Performance:** GPU acceleration enabled
- **Accessibility:** Reduced motion support

#### Media Cards
- **Animation Type:** Scale, fade, and slide
- **Duration:** 300ms for hover effects, 400ms for scroll reveals
- **Easing:** cubic-bezier for smooth transitions
- **Performance:** GPU acceleration enabled, will-change properties
- **Accessibility:** Reduced motion support with simplified animations

### Internationalization
- **Supported Languages:** English, French, Spanish, Chinese (matching existing i18n system)
- **Translation Keys:**
  - Video controls (play, pause, subtitles, settings)
  - Subtitle language names
  - Media card labels (view, category, etc.)
  - Error messages
- **Cultural Considerations:**
  - Subtitle text direction for RTL languages (if needed)
  - Appropriate subtitle positioning for different languages
- **SEO Requirements:**
  - Video metadata includes language information
  - Media cards include proper alt text in all languages

## User Scenarios & Testing

### Video Translation Scenarios

#### Scenario 1: User Watches Video with Subtitles
1. **Given:** User visits page with video content
2. **When:** Video loads and user's language preference is set to French
3. **Then:**
   - Video displays with French subtitles automatically
   - Subtitles are synchronized with video playback
   - Subtitle text is readable and properly formatted

#### Scenario 2: User Changes Subtitle Language
1. **Given:** User is watching video with English subtitles
2. **When:** User opens language selector and selects Spanish
3. **Then:**
   - Subtitles switch to Spanish without interrupting playback
   - Transition is smooth and visually clear
   - New language is saved as preference

#### Scenario 3: User Toggles Subtitles Off
1. **Given:** User is watching video with subtitles visible
2. **When:** User clicks subtitle toggle button
3. **Then:**
   - Subtitles disappear immediately
   - Video continues playing normally
   - Toggle state is visually indicated

#### Scenario 4: Subtitle File Fails to Load
1. **Given:** User selects a language for subtitles
2. **When:** Subtitle file fails to load due to network error
3. **Then:**
   - Error message is displayed clearly
   - User can retry loading subtitles
   - Video continues playing without subtitles
   - Fallback to default language is attempted

### Media Card Scenarios

#### Scenario 1: User Views Portfolio Grid
1. **Given:** User visits portfolio page
2. **When:** Page loads with multiple project cards
3. **Then:**
   - Cards display in responsive grid layout
   - Thumbnails load progressively with smooth animations
   - All cards are accessible via keyboard navigation
   - Loading states are clear and informative

#### Scenario 2: User Hovers Over Card
1. **Given:** User views portfolio grid
2. **When:** User hovers over a project card
3. **Then:**
   - Card elevates with smooth animation
   - Additional information is revealed
   - Hover state is visually distinct
   - Animation respects reduced motion preferences

#### Scenario 3: User Clicks Card
1. **Given:** User views portfolio grid
2. **When:** User clicks on a project card
3. **Then:**
   - User navigates to project detail page
   - Click interaction is responsive (<100ms feedback)
   - Navigation is smooth and clear

#### Scenario 4: Image Fails to Load
1. **Given:** User views portfolio grid
2. **When:** A thumbnail image fails to load
3. **Then:**
   - Placeholder image is displayed
   - Error state is visually clear
   - Card remains functional
   - User can retry loading image

## Quality Assurance

### Testing Requirements

#### Video Translation
- **Unit Tests:**
  - Subtitle parser functions
  - Language selector logic
  - Subtitle synchronization calculations
- **Integration Tests:**
  - Video player with subtitle integration
  - Language switching flow
  - Error handling scenarios
- **Accessibility Tests:**
  - Screen reader compatibility
  - Keyboard navigation
  - Color contrast validation
  - Reduced motion support
- **Performance Tests:**
  - Subtitle file loading time
  - Language switching performance
  - Memory usage during playback

#### Media Cards
- **Unit Tests:**
  - Card component rendering
  - Thumbnail optimization logic
  - Lazy loading implementation
- **Integration Tests:**
  - Grid layout responsiveness
  - Image loading flow
  - Hover and click interactions
- **Accessibility Tests:**
  - Screen reader compatibility
  - Keyboard navigation
  - Focus management
  - Color contrast
- **Performance Tests:**
  - Initial load time
  - Lazy loading effectiveness
  - Animation frame rates
  - Memory usage

### Code Quality
- **TypeScript:** Strict mode enabled
- **ESLint:** Zero warnings or errors
- **Prettier:** Consistent formatting
- **Documentation:** JSDoc for all exports

### Performance Validation
- **Core Web Vitals:** LCP <2.5s, FID <100ms, CLS <0.1
- **Lighthouse Score:** >90 across all categories
- **Mobile Performance:** Optimized for 3G networks
- **Bundle Size:** <250KB initial load

### Accessibility Validation
- **WCAG Compliance:** 2.1 AA standard verified
- **Screen Reader Testing:** Tested with NVDA, JAWS, VoiceOver
- **Keyboard Navigation:** All interactions accessible via keyboard
- **Color Contrast:** All text meets 4.5:1 ratio minimum

## Dependencies and Constraints

### Technical Dependencies
- **Framework:** Next.js 15+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **Video:** HTML5 video with WebVTT subtitle support
- **i18n:** Existing i18n system

### External Dependencies
- **API Endpoints:**
  - Subtitle file storage (R2)
  - Media asset storage (R2)
- **External Services:**
  - R2 storage for subtitle and media files
  - Existing i18n infrastructure
- **Third-party Libraries:**
  - Video subtitle parser (if needed)
  - Image optimization utilities (if needed)
  - Lazy loading library (if needed)

### Constraints
- **Browser Support:**
  - Modern browsers with HTML5 video support
  - WebVTT subtitle support required
  - Intersection Observer API for lazy loading
- **Mobile Support:**
  - Touch-friendly controls
  - Responsive layouts for all screen sizes
  - Optimized for mobile data usage
- **Performance Limits:**
  - Subtitle files must be <500KB per language
  - Thumbnail images optimized to <100KB each
  - Initial page load must not exceed 2.5s
- **Accessibility Requirements:**
  - WCAG 2.1 AA compliance mandatory
  - Keyboard navigation required for all features
  - Screen reader support required

## Success Criteria

### Functional Success Criteria
1. **Video Translation:**
   - Users can view videos with subtitles in their preferred language
   - Subtitle language can be changed without interrupting playback
   - Subtitles are synchronized accurately with video content
   - Subtitle appearance can be customized for accessibility
   - 95% of subtitle file loads complete successfully

2. **Media Cards:**
   - All media cards display with improved visual design
   - Thumbnails load progressively without blocking page rendering
   - Card hover interactions are smooth and responsive
   - Grid layouts adapt correctly to all screen sizes
   - 98% of thumbnail images load successfully

### Performance Success Criteria
1. **Video Translation:**
   - Subtitle files load within 500ms
   - Language switching completes within 200ms
   - No impact on video playback performance
   - Subtitle rendering maintains 60fps

2. **Media Cards:**
   - Initial card grid renders within 1 second
   - Lazy loading reduces initial page weight by 60%
   - Hover animations maintain 60fps
   - Page load time improves by 30% compared to current implementation

### Accessibility Success Criteria
1. **Video Translation:**
   - All video controls accessible via keyboard
   - Screen readers announce subtitle language changes
   - Subtitle text meets WCAG contrast requirements
   - Reduced motion preferences are respected

2. **Media Cards:**
   - All cards accessible via keyboard navigation
   - Screen readers properly announce card content
   - Focus indicators are clearly visible
   - All text meets WCAG contrast requirements

### User Experience Success Criteria
1. **Video Translation:**
   - 90% of users successfully change subtitle language
   - Subtitle toggle is discoverable and intuitive
   - Error messages are clear and actionable
   - User satisfaction score >4.0/5.0 for video experience

2. **Media Cards:**
   - Card interactions feel responsive (<100ms feedback)
   - Visual improvements are noticeable to users
   - Grid layouts work well on all device types
   - User satisfaction score >4.0/5.0 for media display

## Acceptance Criteria

### Functional Criteria
- [ ] Video subtitles display correctly in all supported languages
- [ ] Language switching works without interrupting playback
- [ ] Subtitle toggle functions correctly
- [ ] Media cards display with improved visual design
- [ ] Thumbnails load progressively with lazy loading
- [ ] Card hover interactions are smooth and responsive
- [ ] Grid layouts are responsive across all screen sizes
- [ ] Error handling works correctly for both features

### Non-Functional Criteria
- [ ] Performance requirements met for both features
- [ ] Accessibility standards achieved (WCAG 2.1 AA)
- [ ] Security requirements satisfied
- [ ] Code quality standards maintained
- [ ] All animations respect reduced motion preferences

### Technical Criteria
- [ ] TypeScript compilation successful
- [ ] ESLint compliance achieved
- [ ] Prettier formatting applied
- [ ] Documentation complete
- [ ] All tests passing

## Risk Assessment

### Technical Risks

#### Video Translation
- **Performance Impact:**
  - Risk: Subtitle file loading may slow down video initialization
  - Mitigation: Lazy load subtitles, optimize file sizes, use CDN caching
- **Accessibility Compliance:**
  - Risk: Subtitle rendering may not meet WCAG standards
  - Mitigation: Test with screen readers, validate contrast ratios, ensure keyboard access
- **Browser Compatibility:**
  - Risk: WebVTT support varies across browsers
  - Mitigation: Feature detection, fallback options, polyfills if needed
- **Mobile Optimization:**
  - Risk: Subtitle controls may be difficult on small screens
  - Mitigation: Touch-friendly controls, responsive design, mobile testing

#### Media Cards
- **Performance Impact:**
  - Risk: Enhanced animations may impact performance
  - Mitigation: GPU acceleration, will-change properties, performance monitoring
- **Accessibility Compliance:**
  - Risk: Visual improvements may reduce accessibility
  - Mitigation: Maintain keyboard navigation, ensure focus indicators, test with screen readers
- **Browser Compatibility:**
  - Risk: New CSS features may not work in older browsers
  - Mitigation: Progressive enhancement, feature detection, fallbacks
- **Mobile Optimization:**
  - Risk: Hover effects don't work on touch devices
  - Mitigation: Touch-friendly alternatives, tap interactions, responsive design

### Mitigation Strategies
- **Performance:**
  - Implement performance monitoring
  - Use lazy loading and code splitting
  - Optimize asset sizes
  - Test on low-end devices
- **Accessibility:**
  - Regular accessibility audits
  - Screen reader testing
  - Keyboard-only navigation testing
  - Color contrast validation
- **Compatibility:**
  - Cross-browser testing
  - Progressive enhancement approach
  - Feature detection and fallbacks
  - Regular updates to supported browsers
- **Mobile:**
  - Mobile-first design approach
  - Touch interaction testing
  - Performance optimization for mobile networks
  - Responsive design validation

## Assumptions

1. **Subtitle File Format:** Subtitle files will be in WebVTT format, which is the standard for HTML5 video subtitles
2. **Subtitle Storage:** Subtitle files will be stored in R2 storage alongside video files, following existing asset management patterns
3. **Language Availability:** Not all videos will have subtitles in all languages; the system will gracefully handle missing subtitle files
4. **Media Card Usage:** Media cards are used across portfolio, case studies, and gallery sections with similar requirements
5. **User Preferences:** User language preferences will be stored in localStorage, matching existing i18n implementation
6. **Image Optimization:** Thumbnail images will be pre-optimized and stored in multiple sizes for responsive loading
7. **Performance Targets:** Performance improvements will be measured against current implementation baseline
8. **Browser Support:** Modern browsers (last 2 versions) with HTML5 video and WebVTT support

## Dependencies

### Internal Dependencies
- Existing i18n system for language management
- R2 storage infrastructure for asset management
- Existing video player component (DemoVideo)
- Existing media card components (CaseStudyCard, portfolio components)
- Accessibility hooks and utilities

### External Dependencies
- R2 storage service availability
- CDN for optimized asset delivery
- Browser support for WebVTT subtitles
- Browser support for Intersection Observer API (for lazy loading)

## Implementation Timeline

### Phase 1: Setup and Foundation (Week 1)
- [ ] Set up subtitle file storage structure
- [ ] Create subtitle parser utilities
- [ ] Design enhanced media card component structure
- [ ] Set up lazy loading infrastructure
- [ ] Initial testing framework

### Phase 2: Feature Development (Week 2-3)
- [ ] Implement video subtitle support
- [ ] Build language selector component
- [ ] Create subtitle settings panel
- [ ] Enhance media card components
- [ ] Implement responsive grid improvements
- [ ] Add lazy loading for thumbnails
- [ ] Integration with existing systems
- [ ] Performance optimization

### Phase 3: Enhancement and Polish (Week 4)
- [ ] Accessibility improvements
- [ ] Error handling refinement
- [ ] Animation polish
- [ ] Cross-browser testing
- [ ] Mobile optimization
- [ ] Final testing and validation
- [ ] Documentation completion

## Review and Approval

### Technical Review
- **Architecture Review:** [REVIEWER_NAME] - [DATE]
- **Code Review:** [REVIEWER_NAME] - [DATE]
- **Performance Review:** [REVIEWER_NAME] - [DATE]
- **Accessibility Review:** [REVIEWER_NAME] - [DATE]

### Stakeholder Approval
- **Product Owner:** [APPROVER_NAME] - [DATE]
- **Technical Lead:** [APPROVER_NAME] - [DATE]
- **Design Lead:** [APPROVER_NAME] - [DATE]

## Constitution Compliance Verification

This specification has been reviewed against the Best IT Consulting Project Constitution v1.0.0 and ensures:
- [x] All 8 core principles are addressed
- [x] Technical standards are met
- [x] Governance requirements are followed
- [x] Implementation guidelines are adhered to
- [x] Quality gates are established

**Constitution Compliance:** ✅ VERIFIED
**Last Updated:** 2025-01-27

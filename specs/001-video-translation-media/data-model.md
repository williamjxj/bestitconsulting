# Data Model: Language Translation, Card Layout, and Contact Carousel

## Entities

### Translation Entity
**Purpose:** Store and manage translation data for multi-language support

**Fields:**
- `category: string` - Translation category (nav, common, services, etc.)
- `key: string` - Translation key identifier
- `value: Record<LanguageCode, string>` - Translations for each language
- `languageCode: 'en' | 'fr' | 'es' | 'zh'` - Supported language codes

**Relationships:**
- Belongs to TranslationCategory
- Has many Language translations

**Validation:**
- Key must be unique within category
- Value must exist for at least default language (en)
- Language code must be in supported list

**State Transitions:**
- Initial: Default language (en) loaded
- Language Change: New language translations loaded
- Fallback: If translation missing, fall back to English

---

### Media Card Entity
**Purpose:** Represent portfolio/case study card data structure

**Fields:**
- `id: string` - Unique identifier
- `title: string` - Card title (translatable)
- `description: string` - Card description (translatable)
- `image: string | string[]` - Image URL(s)
- `category: string` - Category tag (translatable)
- `technologies: string[]` - Technology tags
- `metadata: MediaMetadata` - Additional metadata

**Relationships:**
- Has translations for title/description
- Has one or more images

**Validation:**
- Title required
- At least one image required
- Category must be valid

**State Transitions:**
- Loading: Images loading
- Loaded: All content displayed
- Error: Image load failure, show placeholder

---

### Carousel Slide Entity
**Purpose:** Represent carousel slide content

**Fields:**
- `id: number` - Slide index
- `content: string` - Slide text content (translatable)
- `order: number` - Display order
- `isActive: boolean` - Currently visible

**Relationships:**
- Belongs to Carousel
- Has translations for content

**Validation:**
- Content required
- Order must be unique
- Content length reasonable for display

**State Transitions:**
- Hidden: Not currently visible
- Visible: Currently displayed
- Transitioning: Animating between slides

---

## Data Flow

### Language Translation Flow
```
User selects language
  → setLanguage() called
  → Translations loaded from storage/files
  → Current language state updated
  → All components using t() re-render
  → Page content updates to selected language
  → Preference saved to localStorage
```

### Card Data Flow
```
Page loads
  → Fetch project/case study data
  → Load images (lazy loading)
  → Render cards with image-first layout
  → Apply translations for title/description
  → Display in responsive grid
```

### Carousel Data Flow
```
Component mounts
  → Initialize carousel with slides
  → Start autoplay timer
  → Display first slide
  → Auto-advance every N seconds
  → Loop back to first slide
  → User can manually navigate
```

---

## State Management

### Translation State
- **Context:** `I18nContext` (existing)
- **State:** `currentLanguage`, `translations`, `isLoading`
- **Actions:** `setLanguage()`, `t()`
- **Persistence:** localStorage

### Card State
- **Component State:** Loading, hover, focus
- **Props:** Card data passed from parent
- **No Global State:** Cards are presentational

### Carousel State
- **Component State:** Current slide index, autoplay status
- **Props:** Slide content array
- **No Global State:** Carousel is self-contained

---

## API Contracts

### Translation API
**No API endpoints needed** - All translations are client-side

**Local Storage:**
- Key: `bestitconsulting_language`
- Value: Language code string

### Media API
**Existing:** R2 asset retrieval (already implemented)
- No changes needed

### Carousel API
**No API needed** - Static content in component

---

## Validation Rules

### Translation
- Language code must be in supported list: ['en', 'fr', 'es', 'zh']
- Translation key must exist in translation files
- Fallback to English if translation missing

### Card
- Image URL must be valid
- Title and description must be non-empty
- Category must be valid enum value

### Carousel
- Slide content must be non-empty
- Slide order must be sequential
- At least one slide required

---

## Error Handling

### Translation Errors
- Missing translation: Fallback to English
- Invalid language: Use default language
- Storage error: Continue with in-memory state

### Card Errors
- Image load failure: Show placeholder image
- Missing data: Show error state or skip card
- Network error: Retry with exponential backoff

### Carousel Errors
- No slides: Don't render carousel
- Slide load error: Skip to next slide
- Animation error: Fallback to instant transition

---

## Performance Considerations

### Translation
- Translations loaded once per language
- Cached in memory and localStorage
- No network requests after initial load

### Cards
- Images lazy loaded with Intersection Observer
- Progressive image loading
- Optimized image sizes per breakpoint

### Carousel
- Text-only content (minimal performance impact)
- Autoplay pauses when tab not visible
- Smooth CSS transitions (GPU accelerated)


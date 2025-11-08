# Translation API Contract

## Overview
This feature uses client-side translation management. No server-side API endpoints are required. All translations are stored in translation files and managed through the i18n context.

## Client-Side Contracts

### I18nContext Interface

```typescript
interface I18nContextType {
  currentLanguage: string
  availableLanguages: Language[]
  categories: TranslationCategory[]
  translations: Translations
  setLanguage: (languageCode: string) => Promise<void>
  t: (key: string, category?: string, params?: Record<string, string | number>) => string
  addLanguage: (language: Language, translations: Translations) => Promise<void>
  addTranslation: (category: string, key: string, value: string, languageCode?: string) => Promise<void>
  addCategory: (category: TranslationCategory) => Promise<void>
  isLoading: boolean
  error: string | null
}
```

### Translation Function Contract

**Function:** `t(key: string, category?: string, params?: Record<string, string | number>): string`

**Parameters:**
- `key: string` - Translation key (dot notation supported, e.g., "nav.home")
- `category: string` - Optional category (default: "common")
- `params: Record<string, string | number>` - Optional parameters for interpolation

**Returns:** `string` - Translated text or key if translation not found

**Example:**
```typescript
t('home', 'nav') // Returns: "Home" (en), "Accueil" (fr), "Inicio" (es), "首页" (zh)
t('welcome', 'home', { name: 'John' }) // Returns: "Welcome, John!"
```

### Set Language Contract

**Function:** `setLanguage(languageCode: string): Promise<void>`

**Parameters:**
- `languageCode: string` - Language code ('en', 'fr', 'es', 'zh')

**Returns:** `Promise<void>`

**Behavior:**
- Loads translations for specified language
- Updates current language state
- Persists to localStorage if configured
- Throws error if language not supported or translations not found

**Example:**
```typescript
await setLanguage('fr') // Switches to French
```

## Local Storage Contract

### Language Preference Storage

**Key:** `bestitconsulting_language`

**Value:** Language code string ('en' | 'fr' | 'es' | 'zh')

**Access:**
- Read on app initialization
- Write on language change
- Used to restore user preference

## Translation File Structure

### File Location
`lib/i18n/translations/{languageCode}.ts`

### Structure
```typescript
export const {LANG}_TRANSLATIONS: Translations = {
  category: {
    key: 'value',
    nested: {
      key: 'nested value'
    }
  }
}
```

### Categories
- `nav` - Navigation items
- `common` - Common UI elements
- `services` - Services page
- `about` - About page
- `portfolio` - Portfolio page
- `testimonials` - Testimonials page
- `contact` - Contact page
- `errors` - Error messages
- `meta` - SEO metadata
- `home` - Home page
- `footer` - Footer content

## Error Handling

### Missing Translation
- Returns the key itself
- Logs warning in development mode
- Falls back to English if available

### Invalid Language
- Throws error: "Unsupported language: {code}"
- Falls back to default language (en)

### Storage Error
- Continues with in-memory state
- Logs error but doesn't break functionality

## Usage Examples

### In Page Component
```typescript
'use client'

import { useI18n } from '@/lib/i18n'

export default function MyPage() {
  const { t } = useI18n()

  return (
    <div>
      <h1>{t('title', 'home')}</h1>
      <p>{t('description', 'home')}</p>
    </div>
  )
}
```

### With Parameters
```typescript
const { t } = useI18n()
const message = t('welcome', 'common', { name: 'John', count: 5 })
// Returns: "Welcome, John! You have 5 items."
```

### Language Switching
```typescript
const { setLanguage, currentLanguage } = useI18n()

const handleLanguageChange = async (code: string) => {
  await setLanguage(code)
  // Page content automatically updates
}
```


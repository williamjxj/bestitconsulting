import { Language, Translations, TranslationCategory } from './types'
import { DEFAULT_CONFIG } from './config'

/**
 * Get nested translation value using dot notation
 */
export function getNestedValue(
  obj: Record<string, unknown>,
  path: string
): string | undefined {
  return path.split('.').reduce((current: unknown, key: string) => {
    return current &&
      typeof current === 'object' &&
      current !== null &&
      key in current
      ? (current as Record<string, unknown>)[key]
      : undefined
  }, obj) as string | undefined
}

/**
 * Set nested translation value using dot notation
 */
export function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: string
): void {
  const keys = path.split('.')
  const lastKey = keys.pop()!

  const target = keys.reduce(
    (current: Record<string, unknown>, key: string) => {
      if (!current[key]) {
        current[key] = {}
      }
      return current[key] as Record<string, unknown>
    },
    obj
  )

  target[lastKey] = value
}

/**
 * Format translation string with parameters
 */
export function formatTranslation(
  template: string,
  params: Record<string, string | number> = {}
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key]?.toString() || match
  })
}

/**
 * Get browser language preference
 */
export function getBrowserLanguage(): string {
  if (typeof window === 'undefined') return DEFAULT_CONFIG.defaultLanguage

  const language = navigator.language || navigator.languages?.[0]
  if (!language) return DEFAULT_CONFIG.defaultLanguage

  // Extract language code (e.g., 'en-US' -> 'en')
  return language.split('-')[0]
}

/**
 * Get language from localStorage
 */
export function getStoredLanguage(): string | null {
  if (typeof window === 'undefined') return null

  try {
    return localStorage.getItem(DEFAULT_CONFIG.storageKey)
  } catch {
    return null
  }
}

/**
 * Store language in localStorage
 */
export function storeLanguage(languageCode: string): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(DEFAULT_CONFIG.storageKey, languageCode)
  } catch {
    // Silent fail if localStorage is not available
  }
}

/**
 * Remove language from localStorage
 */
export function removeStoredLanguage(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(DEFAULT_CONFIG.storageKey)
  } catch {
    // Silent fail if localStorage is not available
  }
}

/**
 * Check if a language is supported
 */
export function isSupportedLanguage(
  languageCode: string,
  availableLanguages: Language[]
): boolean {
  return availableLanguages.some(lang => lang.code === languageCode)
}

/**
 * Get fallback language
 */
export function getFallbackLanguage(
  preferredLanguage: string,
  availableLanguages: Language[]
): string {
  // First try the preferred language
  if (isSupportedLanguage(preferredLanguage, availableLanguages)) {
    return preferredLanguage
  }

  // Then try browser language
  const browserLang = getBrowserLanguage()
  if (isSupportedLanguage(browserLang, availableLanguages)) {
    return browserLang
  }

  // Finally use default
  return DEFAULT_CONFIG.defaultLanguage
}

/**
 * Validate translation object structure
 */
export function validateTranslations(
  translations: Translations,
  categories: TranslationCategory[]
): string[] {
  const errors: string[] = []

  // Check if all categories exist
  categories.forEach(category => {
    if (!translations[category.id]) {
      errors.push(`Missing category: ${category.id}`)
    }
  })

  return errors
}

/**
 * Merge translations (deep merge)
 */
export function mergeTranslations(
  base: Translations,
  override: Translations
): Translations {
  const result = { ...base }

  Object.keys(override).forEach(category => {
    if (result[category]) {
      result[category] = { ...result[category], ...override[category] }
    } else {
      result[category] = { ...override[category] }
    }
  })

  return result
}

/**
 * Extract all translation keys from translations object
 */
export function extractTranslationKeys(
  translations: Translations
): Record<string, string[]> {
  const keys: Record<string, string[]> = {}

  Object.keys(translations).forEach(category => {
    keys[category] = []

    function extractKeys(obj: Record<string, unknown>, prefix = ''): void {
      Object.keys(obj).forEach(key => {
        const fullKey = prefix ? `${prefix}.${key}` : key

        if (typeof obj[key] === 'string') {
          keys[category].push(fullKey)
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          extractKeys(obj[key] as Record<string, unknown>, fullKey)
        }
      })
    }

    extractKeys(translations[category])
  })

  return keys
}

/**
 * Generate unique ID for new language
 */
export function generateLanguageId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 5)
}

/**
 * Validate language object
 */
export function validateLanguage(language: Language): string[] {
  const errors: string[] = []

  if (!language.code || language.code.length < 2) {
    errors.push('Language code must be at least 2 characters')
  }

  if (!language.name) {
    errors.push('Language name is required')
  }

  if (!language.nativeName) {
    errors.push('Native name is required')
  }

  return errors
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T

  const cloned = {} as T
  Object.keys(obj).forEach(key => {
    cloned[key as keyof T] = deepClone(obj[key as keyof T])
  })

  return cloned
}

/**
 * Storage keys for translations and languages
 */
export const STORAGE_KEYS = {
  TRANSLATIONS: 'bestitconsulting_translations',
  CUSTOM_LANGUAGES: 'bestitconsulting_custom_languages',
}

/**
 * Store translations in localStorage
 */
export function storeTranslations(translations: Record<string, unknown>): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(
      STORAGE_KEYS.TRANSLATIONS,
      JSON.stringify(translations)
    )
  } catch {
    // Silent fail if localStorage is not available
  }
}

/**
 * Get translations from localStorage
 */
export function getStoredTranslations(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSLATIONS)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

/**
 * Store custom languages in localStorage
 */
export function storeCustomLanguages(languages: Language[]): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(
      STORAGE_KEYS.CUSTOM_LANGUAGES,
      JSON.stringify(languages)
    )
  } catch {
    // Silent fail if localStorage is not available
  }
}

/**
 * Get custom languages from localStorage
 */
export function getStoredCustomLanguages(): Language[] | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_LANGUAGES)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

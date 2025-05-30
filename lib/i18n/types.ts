// Types for the internationalization system
export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl?: boolean
}

export interface TranslationCategory {
  id: string
  name: string
  description?: string
}

export interface Translation {
  [key: string]: string | Translation
}

export interface Translations {
  [category: string]: Translation
}

export interface LanguageData {
  meta: Language
  translations: Translations
}

export interface I18nConfig {
  defaultLanguage: string
  fallbackLanguage: string
  availableLanguages: Language[]
  categories: TranslationCategory[]
  persistLanguage: boolean
  storageKey: string
}

export interface I18nContextType {
  currentLanguage: string
  availableLanguages: Language[]
  categories: TranslationCategory[]
  translations: Translations
  setLanguage: (languageCode: string) => void
  t: (key: string, category?: string) => string
  addLanguage: (language: Language, translations: Translations) => Promise<void>
  addTranslation: (
    category: string,
    key: string,
    value: string,
    languageCode?: string
  ) => Promise<void>
  addCategory: (category: TranslationCategory) => Promise<void>
  isLoading: boolean
  error: string | null
}

export type TranslationKey = string
export type CategoryKey = string
export type LanguageCode = string

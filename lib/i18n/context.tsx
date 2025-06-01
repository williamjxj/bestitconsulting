'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import {
  I18nContextType,
  Language,
  Translations,
  TranslationCategory,
} from './types'
import {
  AVAILABLE_LANGUAGES,
  TRANSLATION_CATEGORIES,
  DEFAULT_CONFIG,
} from './config'
import { DEFAULT_TRANSLATIONS } from './translations'
import {
  getNestedValue,
  setNestedValue,
  formatTranslation,
  getBrowserLanguage,
  getStoredLanguage,
  storeLanguage,
  isSupportedLanguage,
  mergeTranslations,
  validateLanguage,
  deepClone,
  getStoredTranslations,
  getStoredCustomLanguages,
  storeTranslations,
  storeCustomLanguages,
} from './utils'

const I18nContext = createContext<I18nContextType | null>(null)

interface I18nProviderProps {
  children: React.ReactNode
  defaultLanguage?: string
  availableLanguages?: Language[]
  categories?: TranslationCategory[]
}

export function I18nProvider({
  children,
  defaultLanguage = DEFAULT_CONFIG.defaultLanguage,
  availableLanguages = AVAILABLE_LANGUAGES,
  categories = TRANSLATION_CATEGORIES,
}: I18nProviderProps) {
  const [currentLanguage, setCurrentLanguage] =
    useState<string>(defaultLanguage)
  const [translations, setTranslations] = useState<Translations>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [languages, setLanguages] = useState<Language[]>(availableLanguages)
  const [translationCategories, setTranslationCategories] =
    useState<TranslationCategory[]>(categories)

  // Initialize language and translations
  useEffect(() => {
    const initializeI18n = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Load custom languages from localStorage
        const customLanguages = getStoredCustomLanguages()
        if (customLanguages && customLanguages.length > 0) {
          setLanguages(prev => [...prev, ...customLanguages])
        }

        // Determine initial language
        let initialLanguage = defaultLanguage

        if (DEFAULT_CONFIG.persistLanguage) {
          const storedLanguage = getStoredLanguage()
          if (
            storedLanguage &&
            isSupportedLanguage(storedLanguage, [
              ...availableLanguages,
              ...(customLanguages || []),
            ])
          ) {
            initialLanguage = storedLanguage
          } else {
            const browserLanguage = getBrowserLanguage()
            if (
              isSupportedLanguage(browserLanguage, [
                ...availableLanguages,
                ...(customLanguages || []),
              ])
            ) {
              initialLanguage = browserLanguage
            }
          }
        }

        // Load translations for initial language
        let initialTranslations =
          DEFAULT_TRANSLATIONS[initialLanguage]?.translations

        // Load custom translations from localStorage
        const storedTranslations = getStoredTranslations()
        if (storedTranslations && storedTranslations[initialLanguage]) {
          initialTranslations = mergeTranslations(
            initialTranslations || {},
            storedTranslations[initialLanguage] as Translations
          )
        }

        if (initialTranslations) {
          setCurrentLanguage(initialLanguage)
          setTranslations(initialTranslations)

          if (DEFAULT_CONFIG.persistLanguage) {
            storeLanguage(initialLanguage)
          }
        } else {
          throw new Error(
            `Translations not found for language: ${initialLanguage}`
          )
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to initialize i18n'
        )
        // Fallback to default language
        const fallbackData =
          DEFAULT_TRANSLATIONS[DEFAULT_CONFIG.defaultLanguage]
        if (fallbackData) {
          setCurrentLanguage(DEFAULT_CONFIG.defaultLanguage)
          setTranslations(fallbackData.translations)
        }
      } finally {
        setIsLoading(false)
      }
    }

    initializeI18n()
  }, [defaultLanguage, availableLanguages])

  // Translation function
  const t = useCallback(
    (
      key: string,
      category: string = 'common',
      params?: Record<string, string | number>
    ): string => {
      if (!translations[category]) {
        // console.warn(`Translation category not found: ${category}`)
        return key
      }

      const value = getNestedValue(translations[category], key)

      if (value === undefined) {
        // Log translation key not found in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(`Translation key not found: ${category}.${key}`)
        }

        // Try fallback language
        const fallbackData =
          DEFAULT_TRANSLATIONS[DEFAULT_CONFIG.fallbackLanguage]
        if (fallbackData && fallbackData.translations[category]) {
          const fallbackValue = getNestedValue(
            fallbackData.translations[category],
            key
          )
          if (fallbackValue) {
            return params
              ? formatTranslation(fallbackValue, params)
              : fallbackValue
          }
        }

        return key
      }

      return params ? formatTranslation(value, params) : value
    },
    [translations]
  )

  // Set language function
  const setLanguage = useCallback(
    async (languageCode: string) => {
      try {
        setIsLoading(true)
        setError(null)

        if (!isSupportedLanguage(languageCode, languages)) {
          throw new Error(`Unsupported language: ${languageCode}`)
        }

        // First try to get built-in translations
        let languageTranslations =
          DEFAULT_TRANSLATIONS[languageCode]?.translations || {}

        // Then try to get stored translations and merge them
        const storedTranslations = getStoredTranslations()
        if (storedTranslations && storedTranslations[languageCode]) {
          languageTranslations = mergeTranslations(
            languageTranslations,
            storedTranslations[languageCode] as Translations
          )
        }

        // If we don't have any translations for this language, throw an error
        if (Object.keys(languageTranslations).length === 0) {
          throw new Error(
            `Translations not found for language: ${languageCode}`
          )
        }

        setCurrentLanguage(languageCode)
        setTranslations(languageTranslations)

        if (DEFAULT_CONFIG.persistLanguage) {
          storeLanguage(languageCode)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to set language')
      } finally {
        setIsLoading(false)
      }
    },
    [languages]
  )

  // Add new language function
  const addLanguage = useCallback(
    async (language: Language, languageTranslations: Translations) => {
      try {
        setError(null)

        // Validate language
        const errors = validateLanguage(language)
        if (errors.length > 0) {
          throw new Error(`Invalid language: ${errors.join(', ')}`)
        }

        // Check if language already exists
        if (languages.some(l => l.code === language.code)) {
          throw new Error(`Language already exists: ${language.code}`)
        }

        // Add to available languages
        const updatedLanguages = [...languages, language]
        setLanguages(updatedLanguages)

        // Store custom languages in localStorage
        const existingCustomLanguages = getStoredCustomLanguages() || []
        storeCustomLanguages([...existingCustomLanguages, language])

        // Store translations in localStorage
        const storedTranslations = getStoredTranslations() || {}
        storedTranslations[language.code] = languageTranslations
        storeTranslations(storedTranslations)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add language')
        throw err
      }
    },
    [languages]
  )

  // Add translation function
  const addTranslation = useCallback(
    async (
      category: string,
      key: string,
      value: string,
      languageCode: string = currentLanguage
    ) => {
      try {
        setError(null)

        if (!isSupportedLanguage(languageCode, languages)) {
          throw new Error(`Unsupported language: ${languageCode}`)
        }

        // Update current translations if it's the active language
        if (languageCode === currentLanguage) {
          setTranslations(prev => {
            const updated = deepClone(prev)
            if (!updated[category]) {
              updated[category] = {}
            }
            setNestedValue(updated[category], key, value)
            return updated
          })
        }

        // Store translations in localStorage
        const storedTranslations =
          (getStoredTranslations() as Record<string, Translations>) || {}
        if (!storedTranslations[languageCode]) {
          storedTranslations[languageCode] = {}
        }
        if (!storedTranslations[languageCode][category]) {
          storedTranslations[languageCode][category] = {}
        }

        // Use a temporary object to set the nested value
        const temp = deepClone(storedTranslations[languageCode][category])
        setNestedValue(temp as Record<string, unknown>, key, value)
        storedTranslations[languageCode][category] = temp

        storeTranslations(storedTranslations)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to add translation'
        )
        throw err
      }
    },
    [currentLanguage, languages]
  )

  // Add category function
  const addCategory = useCallback(
    async (category: TranslationCategory) => {
      try {
        setError(null)

        // Check if category already exists
        if (translationCategories.some(c => c.id === category.id)) {
          throw new Error(`Category already exists: ${category.id}`)
        }

        // Update categories
        const updatedCategories = [...translationCategories, category]
        setTranslationCategories(updatedCategories)

        // Initialize empty translations for this category in current language
        setTranslations(prev => ({
          ...prev,
          [category.id]: {},
        }))

        // Store the new category in all stored translations
        const storedTranslations =
          (getStoredTranslations() as Record<string, Translations>) || {}

        // Initialize this category for all languages in stored translations
        Object.keys(storedTranslations).forEach(langCode => {
          if (!storedTranslations[langCode][category.id]) {
            storedTranslations[langCode][category.id] = {}
          }
        })

        storeTranslations(storedTranslations)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add category')
        throw err
      }
    },
    [translationCategories]
  )

  const contextValue: I18nContextType = {
    currentLanguage,
    availableLanguages: languages,
    categories: translationCategories,
    translations,
    setLanguage,
    t,
    addLanguage,
    addTranslation,
    addCategory,
    isLoading,
    error,
  }

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  )
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

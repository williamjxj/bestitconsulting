import { useCallback } from 'react'
import { useI18n } from './context'

/**
 * Hook for translation with category support
 */
export function useTranslation(defaultCategory: string = 'common') {
  const {
    t: translate,
    currentLanguage,
    setLanguage,
    isLoading,
    error,
  } = useI18n()

  const t = useCallback(
    (
      key: string,
      params?: Record<string, string | number>,
      category?: string
    ) => {
      return translate(key, category || defaultCategory, params)
    },
    [translate, defaultCategory]
  )

  return {
    t,
    currentLanguage,
    setLanguage,
    isLoading,
    error,
  }
}

/**
 * Hook for navigation translations
 */
export function useNavTranslation() {
  return useTranslation('nav')
}

/**
 * Hook for common UI translations
 */
export function useCommonTranslation() {
  return useTranslation('common')
}

/**
 * Hook for services page translations
 */
export function useServicesTranslation() {
  return useTranslation('services')
}

/**
 * Hook for about page translations
 */
export function useAboutTranslation() {
  return useTranslation('about')
}

/**
 * Hook for portfolio page translations
 */
export function usePortfolioTranslation() {
  return useTranslation('portfolio')
}

/**
 * Hook for testimonials page translations
 */
export function useTestimonialsTranslation() {
  return useTranslation('testimonials')
}

/**
 * Hook for contact page translations
 */
export function useContactTranslation() {
  return useTranslation('contact')
}

/**
 * Hook for error messages
 */
export function useErrorTranslation() {
  return useTranslation('errors')
}

/**
 * Hook for meta/SEO translations
 */
export function useMetaTranslation() {
  return useTranslation('meta')
}

/**
 * Hook for language management
 */
export function useLanguageManager() {
  const {
    availableLanguages,
    currentLanguage,
    setLanguage,
    addLanguage,
    isLoading,
    error,
  } = useI18n()

  return {
    availableLanguages,
    currentLanguage,
    setLanguage,
    addLanguage,
    isLoading,
    error,
  }
}

/**
 * Hook for translation management
 */
export function useTranslationManager() {
  const {
    categories,
    translations,
    addTranslation,
    addCategory,
    isLoading,
    error,
  } = useI18n()

  return {
    categories,
    translations,
    addTranslation,
    addCategory,
    isLoading,
    error,
  }
}

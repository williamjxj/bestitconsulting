import { EN_TRANSLATIONS } from './en'
import { FR_TRANSLATIONS } from './fr'
import { ES_TRANSLATIONS } from './es'
import { ZH_TRANSLATIONS } from './zh'
import { LanguageData } from '../types'
import { AVAILABLE_LANGUAGES } from '../config'

export const DEFAULT_TRANSLATIONS: Record<string, LanguageData> = {
  en: {
    meta: AVAILABLE_LANGUAGES.find(l => l.code === 'en')!,
    translations: EN_TRANSLATIONS,
  },
  fr: {
    meta: AVAILABLE_LANGUAGES.find(l => l.code === 'fr')!,
    translations: FR_TRANSLATIONS,
  },
  es: {
    meta: AVAILABLE_LANGUAGES.find(l => l.code === 'es')!,
    translations: ES_TRANSLATIONS,
  },
  zh: {
    meta: AVAILABLE_LANGUAGES.find(l => l.code === 'zh')!,
    translations: ZH_TRANSLATIONS,
  },
}

export * from './en'
export * from './fr'
export * from './es'
export * from './zh'

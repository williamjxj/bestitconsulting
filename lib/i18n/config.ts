import { Language, TranslationCategory } from './types'

// Default language configuration
export const DEFAULT_CONFIG = {
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  persistLanguage: true,
  storageKey: 'bestitconsulting_language',
}

// Available languages
export const AVAILABLE_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
  },
]

// Translation categories
export const TRANSLATION_CATEGORIES: TranslationCategory[] = [
  {
    id: 'nav',
    name: 'Navigation',
    description: 'Navigation menu items and links',
  },
  {
    id: 'common',
    name: 'Common',
    description: 'Common UI elements and messages',
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Services page content',
  },
  {
    id: 'about',
    name: 'About',
    description: 'About page content',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Portfolio page content',
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Testimonials page content',
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Contact page content',
  },
  {
    id: 'errors',
    name: 'Errors',
    description: 'Error messages and validation',
  },
  {
    id: 'meta',
    name: 'Meta',
    description: 'SEO titles, descriptions, and meta content',
  },
  {
    id: 'home',
    name: 'Home',
    description: 'Home page content',
  },
  {
    id: 'footer',
    name: 'Footer',
    description: 'Footer content and links',
  },
]

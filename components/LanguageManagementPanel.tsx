'use client'

import React, { useState } from 'react'
import { Plus, X, Globe, Edit } from 'lucide-react'
import { useTranslationManager, useLanguageManager } from '@/lib/i18n/hooks'
import { Language, TranslationCategory, Translations } from '@/lib/i18n/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface LanguageManagementPanelProps {
  className?: string
}

export function LanguageManagementPanel({
  className = '',
}: LanguageManagementPanelProps) {
  // Get translation management functions
  const {
    categories,
    addCategory,
    addTranslation,
    isLoading: translationLoading,
    error: translationError,
  } = useTranslationManager()

  // Use the language management hook for language-related functions
  const {
    availableLanguages,
    addLanguage,
    isLoading: languageLoading,
    error: languageError,
  } = useLanguageManager()

  const [showAddLanguage, setShowAddLanguage] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddTranslation, setShowAddTranslation] = useState(false)

  // Combine loading and error states
  const isLoading = translationLoading || languageLoading
  const error = translationError || languageError

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error Display */}
      {error && (
        <div className='p-4 bg-red-50 border border-red-200 rounded-md'>
          <p className='text-red-600 text-sm'>{error}</p>
        </div>
      )}

      {/* Languages Section */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                <Globe className='w-5 h-5' />
                Available Languages
              </CardTitle>
              <CardDescription>
                Manage supported languages for your application
              </CardDescription>
            </div>
            <button
              onClick={() => setShowAddLanguage(true)}
              className='flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
              disabled={isLoading}
            >
              <Plus className='w-4 h-4' />
              Add Language
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {availableLanguages.length > 0 ? (
              availableLanguages.map(language => (
                <LanguageCard key={language.code} language={language} />
              ))
            ) : (
              <div className='col-span-full text-gray-500 text-center py-8'>
                No languages available.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Translation Categories</CardTitle>
              <CardDescription>
                Organize translations into logical categories
              </CardDescription>
            </div>
            <button
              onClick={() => setShowAddCategory(true)}
              className='flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
            >
              <Plus className='w-4 h-4' />
              Add Category
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {categories.length > 0 ? (
              categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))
            ) : (
              <div className='col-span-full text-gray-500 text-center py-8'>
                No categories available.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Translation */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Add translations and manage content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() => setShowAddTranslation(true)}
              className='flex items-center gap-2 px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors'
              disabled={
                categories.length === 0 || availableLanguages.length === 0
              }
            >
              <Edit className='w-4 h-4' />
              Add Translation
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showAddLanguage && (
        <AddLanguageModal
          onClose={() => setShowAddLanguage(false)}
          onAdd={addLanguage}
        />
      )}

      {showAddCategory && (
        <AddCategoryModal
          onClose={() => setShowAddCategory(false)}
          onAdd={addCategory}
        />
      )}

      {showAddTranslation && (
        <AddTranslationModal
          onClose={() => setShowAddTranslation(false)}
          onAdd={addTranslation}
          categories={categories}
          languages={availableLanguages}
        />
      )}
    </div>
  )
}

function LanguageCard({ language }: { language: Language }) {
  return (
    <div className='p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors'>
      <div className='flex items-start justify-between'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <span className='text-2xl'>{language.flag}</span>
            <div>
              <h3 className='font-medium'>{language.name}</h3>
              <p className='text-sm text-gray-600'>{language.nativeName}</p>
            </div>
          </div>
          <Badge variant='secondary'>{language.code}</Badge>
        </div>
      </div>
    </div>
  )
}

function CategoryCard({ category }: { category: TranslationCategory }) {
  return (
    <div className='p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors'>
      <h3 className='font-medium mb-1'>{category.name}</h3>
      <p className='text-sm text-gray-600 mb-2'>{category.description}</p>
      <Badge variant='outline'>{category.id}</Badge>
    </div>
  )
}

// Modal Components
function AddLanguageModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (language: Language, translations: Translations) => Promise<void>
}) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    nativeName: '',
    flag: '',
    rtl: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create basic translation structure
      const basicTranslations = {
        nav: {},
        common: {},
        services: {},
        about: {},
        portfolio: {},
        testimonials: {},
        contact: {},
        errors: {},
        meta: {},
      }

      await onAdd(formData, basicTranslations)
      onClose()
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>Add New Language</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Language Code
            </label>
            <input
              type='text'
              value={formData.code}
              onChange={e => setFormData({ ...formData, code: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='en, fr, es...'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Language Name
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='English'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Native Name
            </label>
            <input
              type='text'
              value={formData.nativeName}
              onChange={e =>
                setFormData({ ...formData, nativeName: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='English'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Flag Emoji
            </label>
            <input
              type='text'
              value={formData.flag}
              onChange={e => setFormData({ ...formData, flag: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='🇺🇸'
              required
            />
          </div>

          <div className='flex items-center'>
            <input
              type='checkbox'
              id='rtl'
              checked={formData.rtl}
              onChange={e =>
                setFormData({ ...formData, rtl: e.target.checked })
              }
              className='mr-2'
            />
            <label htmlFor='rtl' className='text-sm text-gray-700'>
              Right-to-left (RTL) language
            </label>
          </div>

          <div className='flex gap-2 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50'
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Language'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AddCategoryModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (category: TranslationCategory) => Promise<void>
}) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onAdd(formData)
      onClose()
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>Add New Category</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Category ID
            </label>
            <input
              type='text'
              value={formData.id}
              onChange={e => setFormData({ ...formData, id: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='navigation, common, etc.'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Category Name
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Navigation'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Description of this category...'
              rows={3}
            />
          </div>

          <div className='flex gap-2 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50'
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AddTranslationModal({
  onClose,
  onAdd,
  categories,
  languages,
}: {
  onClose: () => void
  onAdd: (
    category: string,
    key: string,
    value: string,
    languageCode?: string
  ) => Promise<void>
  categories: TranslationCategory[]
  languages: Language[]
}) {
  const [formData, setFormData] = useState({
    category: categories.length > 0 ? categories[0].id : '',
    key: '',
    value: '',
    languageCode: languages.length > 0 ? languages[0].code : '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onAdd(
        formData.category,
        formData.key,
        formData.value,
        formData.languageCode
      )
      onClose()
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>Add Translation</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Language
            </label>
            <select
              value={formData.languageCode}
              onChange={e =>
                setFormData({ ...formData, languageCode: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Category
            </label>
            <select
              value={formData.category}
              onChange={e =>
                setFormData({ ...formData, category: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Translation Key
            </label>
            <input
              type='text'
              value={formData.key}
              onChange={e => setFormData({ ...formData, key: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='home, about, contact...'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Translation Value
            </label>
            <textarea
              value={formData.value}
              onChange={e =>
                setFormData({ ...formData, value: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter the translated text...'
              rows={3}
              required
            />
          </div>

          <div className='flex gap-2 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50'
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Translation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

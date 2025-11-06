'use client'

import React, { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useLanguageManager } from '@/lib/i18n/hooks'

interface LanguageSelectorProps {
  showFlag?: boolean
  showNativeName?: boolean
  variant?: 'dropdown' | 'buttons' | 'minimal'
  className?: string
  iconOnly?: boolean
}

export function LanguageSelector({
  showFlag = true,
  showNativeName = false,
  variant = 'dropdown',
  className = '',
  iconOnly = false,
}: LanguageSelectorProps) {
  const { availableLanguages, currentLanguage, setLanguage, isLoading } =
    useLanguageManager()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = availableLanguages.find(
    lang => lang.code === currentLanguage
  )

  const handleLanguageChange = async (languageCode: string) => {
    await setLanguage(languageCode)
    setIsOpen(false)
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-1 ${className}`}>
        {availableLanguages.map(language => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            disabled={isLoading}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              currentLanguage === language.code
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={showNativeName ? language.nativeName : language.name}
          >
            {showFlag && language.flag} {language.code.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors'
          title='Switch Language'
        >
          {currentLang && (
            <span className='flex items-center gap-2'>
              {showFlag && currentLang.flag}
              <span className='text-xs font-medium'>
                {currentLang.code.toUpperCase()}
              </span>
            </span>
          )}
        </button>

        {isOpen && (
          <>
            <div
              className='fixed inset-0 z-10'
              onClick={() => setIsOpen(false)}
            />
            <div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-32'>
              {availableLanguages.map(language => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  disabled={isLoading}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                    currentLanguage === language.code
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  <span className='flex items-center gap-3'>
                    {showFlag && <span className='mr-1'>{language.flag}</span>}
                    {showNativeName ? language.nativeName : language.name}
                  </span>
                  {currentLanguage === language.code && (
                    <Check className='w-3 h-3' />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`flex items-center ${
          iconOnly
            ? 'p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            : 'gap-3 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors'
        }`}
        title={
          iconOnly && currentLang
            ? showNativeName
              ? currentLang.nativeName
              : currentLang.name
            : undefined
        }
      >
        {currentLang && (
          <>
            {showFlag && (
              <span className={iconOnly ? '' : 'mr-1'}>{currentLang.flag}</span>
            )}
            {!iconOnly && (
              <span>
                {showNativeName ? currentLang.nativeName : currentLang.name}
              </span>
            )}
          </>
        )}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''} ${iconOnly ? 'ml-1' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />
          <div className='absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-full'>
            {availableLanguages.map(language => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                disabled={isLoading}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                  currentLanguage === language.code
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                <span className='flex items-center gap-3'>
                  {showFlag && <span className='mr-1'>{language.flag}</span>}
                  {showNativeName ? language.nativeName : language.name}
                </span>
                {currentLanguage === language.code && (
                  <Check className='w-3 h-3' />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

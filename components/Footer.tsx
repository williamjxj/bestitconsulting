'use client'

import { Github, Linkedin, Twitter } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/hooks'

export default function Footer() {
  const { t } = useTranslation('footer')

  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-2xl font-bold text-blue-400 mb-4'>BestIT</h3>
            <p className='text-gray-400'>{t('companyDescription')}</p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>{t('services')}</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>{t('servicesList.fullStack')}</li>
              <li>{t('servicesList.cloud')}</li>
              <li>{t('servicesList.team')}</li>
              <li>{t('servicesList.enterprise')}</li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>{t('technologies')}</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>{t('techList.react')}</li>
              <li>{t('techList.node')}</li>
              <li>{t('techList.python')}</li>
              <li>{t('techList.cloud')}</li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>{t('followUs')}</h4>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Linkedin className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Twitter className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Github className='h-6 w-6' />
              </a>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2024 BestIT Consulting Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

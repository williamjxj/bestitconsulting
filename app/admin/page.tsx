'use client'

import Layout from '@/components/Layout'
import { LanguageManagementPanel } from '@/components/LanguageManagementPanel'

export default function AdminPage() {
  return (
    <Layout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-3xl font-bold mb-8'>Language Management</h1>
        <LanguageManagementPanel />
      </div>
    </Layout>
  )
}

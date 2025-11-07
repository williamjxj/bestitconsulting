#!/usr/bin/env ts-node
/**
 * Test Supabase configuration
 * This script verifies that Supabase credentials are correctly configured
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

import { testSupabaseConnection } from '../lib/supabase'

async function main() {
  console.log('🔍 Testing Supabase configuration...\n')

  const result = await testSupabaseConnection()

  if (result.success) {
    console.log('✅', result.message)
    if (result.details) {
      console.log('\n📋 Configuration Details:')
      console.log('   Project ID:', result.details.projectId)
      console.log('   URL:', result.details.url)
    }
    console.log('\n✨ Supabase configuration is correct!')
    process.exit(0)
  } else {
    console.error('❌', result.message)
    if (result.details) {
      console.error(
        '\n🔍 Error Details:',
        JSON.stringify(result.details, null, 2)
      )
    }
    console.error(
      '\n⚠️  Please check your Supabase configuration in .env.local'
    )
    process.exit(1)
  }
}

main().catch(error => {
  console.error('❌ Unexpected error:', error)
  process.exit(1)
})

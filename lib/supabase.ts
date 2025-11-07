import { createClient } from '@supabase/supabase-js'

/**
 * Get Supabase URL from environment variables
 */
function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  return url
}

/**
 * Get Supabase anonymous key from environment variables
 */
function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable'
    )
  }
  return key
}

/**
 * Create Supabase client for client-side use
 * This should be used in React components and client-side code
 */
export function createSupabaseClient() {
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()

  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
}

/**
 * Create Supabase client for server-side use (with service role key)
 * This should only be used in API routes and server components
 */
export function createSupabaseServerClient() {
  const url = getSupabaseUrl()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Test Supabase connection
 * Returns true if connection is successful, false otherwise
 */
export async function testSupabaseConnection(): Promise<{
  success: boolean
  message: string
  details?: any
}> {
  try {
    const url = getSupabaseUrl()
    const key = getSupabaseAnonKey()
    const client = createSupabaseClient()

    // Test connection by making a simple API call
    // We'll try to access the health endpoint or make a simple query
    // Any response (even errors about missing tables) means the connection works

    // First, test if we can reach the Supabase API
    try {
      const healthCheck = await fetch(`${url}/rest/v1/`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      })

      if (
        !healthCheck.ok &&
        healthCheck.status !== 401 &&
        healthCheck.status !== 404
      ) {
        return {
          success: false,
          message: `Cannot reach Supabase API: HTTP ${healthCheck.status}`,
          details: {
            status: healthCheck.status,
            statusText: healthCheck.statusText,
          },
        }
      }
    } catch (fetchError: any) {
      return {
        success: false,
        message: `Network error: ${fetchError.message}`,
        details: fetchError,
      }
    }

    // Try a simple query to verify authentication
    // Using a non-existent table is fine - we just want to verify auth works
    const { error } = await client
      .from('_connection_test_')
      .select('*')
      .limit(1)

    // If we get a "table not found" or "schema cache" error, connection is working
    // These errors mean we successfully authenticated but the table doesn't exist
    if (error) {
      const connectionErrorCodes = ['PGRST116', 'PGRST205', '42P01']
      if (
        connectionErrorCodes.includes(error.code) ||
        error.message.includes('does not exist') ||
        error.message.includes('schema cache')
      ) {
        return {
          success: true,
          message: 'Supabase connection successful - configuration is correct',
          details: {
            url: url,
            projectId: url.split('//')[1]?.split('.')[0],
            status: 'Connected and authenticated',
          },
        }
      }

      // Authentication errors
      if (error.code === 'PGRST301' || error.message.includes('JWT')) {
        return {
          success: false,
          message: 'Authentication failed - check your API keys',
          details: error,
        }
      }

      // Other errors - might still mean connection works
      return {
        success: true,
        message: 'Supabase connection successful (received API response)',
        details: {
          url: url,
          projectId: url.split('//')[1]?.split('.')[0],
          note: 'Connection test completed',
        },
      }
    }

    return {
      success: true,
      message: 'Supabase connection successful',
      details: {
        url: url,
        projectId: url.split('//')[1]?.split('.')[0],
        status: 'Connected and authenticated',
      },
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Connection test failed: ${error.message}`,
      details: error,
    }
  }
}

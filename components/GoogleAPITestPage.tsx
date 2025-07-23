'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, ExternalLink } from 'lucide-react'

export default function GoogleAPITestPage() {
  const [testResults, setTestResults] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

  const tests = [
    {
      name: 'Maps Embed API',
      description: 'Used for embedded iframe maps',
      test: () => testEmbedAPI(),
      required: true,
    },
    {
      name: 'Maps JavaScript API',
      description: 'Used for interactive maps',
      test: () => testJavaScriptAPI(),
      required: false,
    },
    {
      name: 'Places API',
      description: 'Used for location search and details',
      test: () => testPlacesAPI(),
      required: false,
    },
    {
      name: 'Geocoding API',
      description: 'Used for address to coordinates conversion',
      test: () => testGeocodingAPI(),
      required: false,
    },
  ]

  const testEmbedAPI = async () => {
    try {
      // Test by trying to load an embed map
      const testQuery = encodeURIComponent('New York, NY')
      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${testQuery}`

      // Create a hidden iframe to test the API
      const iframe = document.createElement('iframe')
      iframe.src = embedUrl
      iframe.style.display = 'none'

      return new Promise(resolve => {
        iframe.onload = () => {
          document.body.removeChild(iframe)
          resolve('✅ Working')
        }
        iframe.onerror = () => {
          document.body.removeChild(iframe)
          resolve('❌ Failed')
        }

        document.body.appendChild(iframe)

        // Timeout after 5 seconds
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe)
            resolve('⏰ Timeout')
          }
        }, 5000)
      })
    } catch (error) {
      return '❌ Error: ' + (error as Error).message
    }
  }

  const testJavaScriptAPI = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      )
      if (response.ok) {
        return '✅ Available'
      }
      return '❌ Not authorized'
    } catch (error) {
      return '❌ Error: ' + (error as Error).message
    }
  }

  const testPlacesAPI = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=New%20York&inputtype=textquery&key=${apiKey}`
      )

      if (response.status === 200) {
        return '✅ Working'
      } else if (response.status === 403) {
        return '❌ Not enabled'
      }
      return `❌ Status: ${response.status}`
    } catch (error) {
      return '❌ Error: ' + (error as Error).message
    }
  }

  const testGeocodingAPI = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=New%20York&key=${apiKey}`
      )

      if (response.status === 200) {
        const data = await response.json()
        if (data.status === 'OK') {
          return '✅ Working'
        }
        return `❌ ${data.status}`
      } else if (response.status === 403) {
        return '❌ Not enabled'
      }
      return `❌ Status: ${response.status}`
    } catch (error) {
      return '❌ Error: ' + (error as Error).message
    }
  }

  const runAllTests = async () => {
    setIsLoading(true)
    const results: Record<string, string> = {}

    for (const test of tests) {
      try {
        results[test.name] = (await test.test()) as string
      } catch {
        results[test.name] = '❌ Test failed'
      }
    }

    setTestResults(results)
    setIsLoading(false)
  }

  const getStatusBadge = (result: string) => {
    if (result.includes('✅')) {
      return <Badge className='bg-green-100 text-green-800'>Working</Badge>
    } else if (result.includes('❌')) {
      return <Badge className='bg-red-100 text-red-800'>Failed</Badge>
    } else if (result.includes('⏰')) {
      return <Badge className='bg-yellow-100 text-yellow-800'>Timeout</Badge>
    }
    return <Badge className='bg-gray-100 text-gray-800'>Unknown</Badge>
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <AlertCircle className='h-5 w-5' />
            Google Maps API Diagnostic Tool
          </CardTitle>
          <p className='text-gray-600'>
            Test which Google Maps APIs are enabled for your API key:{' '}
            <code className='bg-gray-100 px-2 py-1 rounded'>
              {apiKey?.slice(0, 20)}...
            </code>
          </p>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex gap-4'>
            <Button
              onClick={runAllTests}
              disabled={isLoading || !apiKey}
              className='flex items-center gap-2'
            >
              {isLoading ? 'Testing...' : 'Run API Tests'}
            </Button>

            <Button
              variant='outline'
              onClick={() =>
                window.open(
                  'https://console.cloud.google.com/apis/library',
                  '_blank'
                )
              }
              className='flex items-center gap-2'
            >
              <ExternalLink className='h-4 w-4' />
              Open Google Cloud Console
            </Button>
          </div>

          {!apiKey && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
              <p className='text-red-800'>
                ❌ No API key found in environment variables
              </p>
            </div>
          )}

          {Object.keys(testResults).length > 0 && (
            <div className='space-y-4'>
              <h3 className='font-semibold'>Test Results:</h3>
              {tests.map(test => (
                <div
                  key={test.name}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div>
                    <div className='flex items-center gap-2'>
                      <h4 className='font-medium'>{test.name}</h4>
                      {test.required && (
                        <Badge variant='outline'>Required</Badge>
                      )}
                    </div>
                    <p className='text-sm text-gray-600'>{test.description}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    {getStatusBadge(testResults[test.name] || '')}
                    <span className='text-sm text-gray-600'>
                      {testResults[test.name] || 'Not tested'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h4 className='font-medium text-blue-800 mb-2'>
              How to Fix API Authorization Issues:
            </h4>
            <ol className='text-sm text-blue-700 space-y-1 list-decimal list-inside'>
              <li>
                Go to{' '}
                <a
                  href='https://console.cloud.google.com/apis/library'
                  target='_blank'
                  className='underline'
                >
                  Google Cloud Console
                </a>
              </li>
              <li>Select your project (the one that owns your API key)</li>
              <li>
                Search for and enable these APIs:
                <ul className='list-disc list-inside ml-4 mt-1'>
                  <li>
                    <strong>Maps Embed API</strong> (Required for embedded maps)
                  </li>
                  <li>
                    <strong>Maps JavaScript API</strong> (For interactive maps)
                  </li>
                  <li>
                    <strong>Places API</strong> (For location search)
                  </li>
                  <li>
                    <strong>Geocoding API</strong> (For address conversion)
                  </li>
                </ul>
              </li>
              <li>Wait 5-10 minutes for changes to propagate</li>
              <li>Run the test again</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

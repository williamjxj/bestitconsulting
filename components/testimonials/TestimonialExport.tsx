/**
 * Testimonial export component
 * Provides export functionality for testimonials
 */

'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Mail,
  Share2,
  Copy,
  Check,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialExportProps {
  testimonials: Array<{
    id: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    avatar?: string
    category?: string
    featured?: boolean
    date?: string
  }>
  className?: string
  showPreview?: boolean
  showShare?: boolean
  showCopy?: boolean
}

export const TestimonialExport: React.FC<TestimonialExportProps> = ({
  testimonials,
  className = '',
  showPreview = true,
  showShare = true,
  showCopy = true,
}) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<
    'csv' | 'json' | 'txt' | 'pdf'
  >('csv')
  const [copied, setCopied] = useState(false)
  const { preferences } = useAccessibility()

  // Export to CSV
  const exportToCSV = useCallback(() => {
    const headers = [
      'Name',
      'Role',
      'Company',
      'Content',
      'Rating',
      'Category',
      'Featured',
      'Date',
    ]
    const csvContent = [
      headers.join(','),
      ...testimonials.map(t =>
        [
          `"${t.name}"`,
          `"${t.role}"`,
          `"${t.company}"`,
          `"${t.content.replace(/"/g, '""')}"`,
          t.rating,
          t.category || '',
          t.featured ? 'Yes' : 'No',
          t.date || '',
        ].join(',')
      ),
    ].join('\n')

    downloadFile(csvContent, 'testimonials.csv', 'text/csv')
  }, [testimonials])

  // Export to JSON
  const exportToJSON = useCallback(() => {
    const jsonContent = JSON.stringify(testimonials, null, 2)
    downloadFile(jsonContent, 'testimonials.json', 'application/json')
  }, [testimonials])

  // Export to TXT
  const exportToTXT = useCallback(() => {
    const txtContent = testimonials
      .map(
        t =>
          `${t.name} - ${t.role} at ${t.company}\nRating: ${t.rating}/5\n"${t.content}"\n${t.category ? `Category: ${t.category}` : ''}\n${t.featured ? 'Featured: Yes' : ''}\n${t.date ? `Date: ${t.date}` : ''}\n\n`
      )
      .join('---\n\n')

    downloadFile(txtContent, 'testimonials.txt', 'text/plain')
  }, [testimonials])

  // Export to PDF (simplified - would need a proper PDF library)
  const exportToPDF = useCallback(() => {
    // This is a simplified implementation
    // In a real app, you'd use a library like jsPDF or Puppeteer
    const htmlContent = `
      <html>
        <head>
          <title>Testimonials</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .testimonial { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; }
            .header { font-weight: bold; margin-bottom: 10px; }
            .content { margin: 10px 0; }
            .rating { color: #ffc107; }
          </style>
        </head>
        <body>
          <h1>Testimonials</h1>
          ${testimonials
            .map(
              t => `
            <div class="testimonial">
              <div class="header">${t.name} - ${t.role} at ${t.company}</div>
              <div class="rating">Rating: ${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
              <div class="content">"${t.content}"</div>
              ${t.category ? `<div>Category: ${t.category}</div>` : ''}
              ${t.featured ? '<div>Featured: Yes</div>' : ''}
              ${t.date ? `<div>Date: ${t.date}</div>` : ''}
            </div>
          `
            )
            .join('')}
        </body>
      </html>
    `

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'testimonials.html'
    a.click()
    URL.revokeObjectURL(url)
  }, [testimonials])

  // Generic download function
  const downloadFile = useCallback(
    (content: string, filename: string, mimeType: string) => {
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    },
    []
  )

  // Handle export
  const handleExport = useCallback(async () => {
    setIsExporting(true)

    try {
      switch (exportFormat) {
        case 'csv':
          exportToCSV()
          break
        case 'json':
          exportToJSON()
          break
        case 'txt':
          exportToTXT()
          break
        case 'pdf':
          exportToPDF()
          break
      }
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }, [exportFormat, exportToCSV, exportToJSON, exportToTXT, exportToPDF])

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    try {
      const text = testimonials
        .map(
          t =>
            `${t.name} - ${t.role} at ${t.company}\nRating: ${t.rating}/5\n"${t.content}"`
        )
        .join('\n\n---\n\n')

      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }, [testimonials])

  // Share functionality
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Testimonials',
          text: `Check out these ${testimonials.length} testimonials`,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Share failed:', error)
      }
    } else {
      // Fallback to copy
      handleCopy()
    }
  }, [testimonials, handleCopy])

  // Email functionality
  const handleEmail = useCallback(() => {
    const subject = 'Testimonials'
    const body = `Here are the testimonials:\n\n${testimonials
      .map(
        t =>
          `${t.name} - ${t.role} at ${t.company}\nRating: ${t.rating}/5\n"${t.content}"`
      )
      .join('\n\n---\n\n')}`

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }, [testimonials])

  return (
    <div className={cn('w-full', className)}>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Download className='h-5 w-5' />
            Export Testimonials
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Format selection */}
          <div className='space-y-3'>
            <label className='text-sm font-medium'>Export Format</label>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              {[
                {
                  key: 'csv',
                  label: 'CSV',
                  icon: FileSpreadsheet,
                  description: 'Spreadsheet format',
                },
                {
                  key: 'json',
                  label: 'JSON',
                  icon: FileJson,
                  description: 'Structured data',
                },
                {
                  key: 'txt',
                  label: 'Text',
                  icon: FileText,
                  description: 'Plain text',
                },
                {
                  key: 'pdf',
                  label: 'PDF',
                  icon: FileText,
                  description: 'Document format',
                },
              ].map(({ key, label, icon: Icon, description }) => (
                <Button
                  key={key}
                  variant={exportFormat === key ? 'default' : 'outline'}
                  onClick={() => setExportFormat(key as any)}
                  className='flex flex-col items-center gap-2 h-auto py-4'
                >
                  <Icon className='h-5 w-5' />
                  <span className='font-medium'>{label}</span>
                  <span className='text-xs text-muted-foreground'>
                    {description}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Export button */}
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className='w-full'
            size='lg'
          >
            {isExporting ? (
              <motion.div
                className='flex items-center gap-2'
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Download className='h-4 w-4' />
                Exporting...
              </motion.div>
            ) : (
              <>
                <Download className='h-4 w-4 mr-2' />
                Export {testimonials.length} Testimonials
              </>
            )}
          </Button>

          {/* Additional actions */}
          <div className='flex flex-wrap gap-2'>
            {showCopy && (
              <Button
                variant='outline'
                size='sm'
                onClick={handleCopy}
                className='flex items-center gap-2'
              >
                {copied ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
                {copied ? 'Copied!' : 'Copy Text'}
              </Button>
            )}

            {showShare && (
              <Button
                variant='outline'
                size='sm'
                onClick={handleShare}
                className='flex items-center gap-2'
              >
                <Share2 className='h-4 w-4' />
                Share
              </Button>
            )}

            <Button
              variant='outline'
              size='sm'
              onClick={handleEmail}
              className='flex items-center gap-2'
            >
              <Mail className='h-4 w-4' />
              Email
            </Button>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className='space-y-3'>
              <label className='text-sm font-medium'>Preview</label>
              <div className='max-h-40 overflow-y-auto border border-input rounded-lg p-3 bg-muted/50'>
                <pre className='text-xs text-muted-foreground whitespace-pre-wrap'>
                  {testimonials
                    .slice(0, 2)
                    .map(
                      t =>
                        `${t.name} - ${t.role} at ${t.company}\nRating: ${t.rating}/5\n"${t.content}"\n${t.category ? `Category: ${t.category}` : ''}\n${t.featured ? 'Featured: Yes' : ''}\n${t.date ? `Date: ${t.date}` : ''}\n\n`
                    )
                    .join('---\n\n')}
                  {testimonials.length > 2 &&
                    `... and ${testimonials.length - 2} more testimonials`}
                </pre>
              </div>
            </div>
          )}

          {/* Export info */}
          <div className='text-sm text-muted-foreground'>
            <p>
              Exporting {testimonials.length} testimonials in{' '}
              {exportFormat.toUpperCase()} format
            </p>
            {exportFormat === 'csv' && (
              <p className='text-xs mt-1'>
                CSV format is compatible with Excel, Google Sheets, and other
                spreadsheet applications
              </p>
            )}
            {exportFormat === 'json' && (
              <p className='text-xs mt-1'>
                JSON format preserves all data structure and is ideal for
                developers
              </p>
            )}
            {exportFormat === 'txt' && (
              <p className='text-xs mt-1'>
                Plain text format is human-readable and compatible with any text
                editor
              </p>
            )}
            {exportFormat === 'pdf' && (
              <p className='text-xs mt-1'>
                PDF format creates a formatted document suitable for printing or
                sharing
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TestimonialExport

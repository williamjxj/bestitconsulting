'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { Button } from './button'
import { AnimatedFAQ } from './AnimatedFAQ'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQDialogProps {
  faqs: FAQItem[]
  triggerText?: string
  triggerIcon?: React.ReactNode
  className?: string
}

export function FAQDialog({
  faqs,
  triggerText = 'FAQ',
  triggerIcon = <HelpCircle className='h-4 w-4' />,
  className,
}: FAQDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors',
            className
          )}
        >
          {triggerIcon}
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <HelpCircle className='h-6 w-6 text-blue-600' />
            Frequently Asked Questions
          </DialogTitle>
          <DialogDescription className='text-base'>
            Find answers to common questions about our services, processes, and
            how we can help transform your business with technology.
          </DialogDescription>
        </DialogHeader>

        <div className='mt-6'>
          <AnimatedFAQ faqs={faqs} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Compact FAQ dialog for smaller spaces
export function FAQDialogCompact({
  faqs,
  triggerText = 'FAQ',
  triggerIcon = <HelpCircle className='h-4 w-4' />,
  className,
}: FAQDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className={cn(
            'flex items-center gap-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors',
            className
          )}
        >
          {triggerIcon}
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-3xl max-h-[70vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-gray-900 flex items-center gap-2'>
            <HelpCircle className='h-5 w-5 text-blue-600' />
            FAQ
          </DialogTitle>
          <DialogDescription>
            Quick answers to common questions about our services.
          </DialogDescription>
        </DialogHeader>

        <div className='mt-4'>
          <AnimatedFAQ faqs={faqs} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

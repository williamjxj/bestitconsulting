'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface FAQItem {
  question: string
  answer: string
  id: string
}

interface AnimatedFAQProps {
  faqs: FAQItem[]
  className?: string
}

export function AnimatedFAQ({ faqs, className = '' }: AnimatedFAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {faqs.map((faq, index) => {
        const isOpen = openItems.has(faq.id)

        return (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className='border-0 bg-white overflow-hidden'>
              <motion.button
                className='w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset'
                onClick={() => toggleItem(faq.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <HelpCircle className='h-4 w-4 text-white' />
                    </div>
                    <h3 className='text-lg font-semibold text-gray-900 pr-4'>
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className='flex-shrink-0'
                  >
                    {isOpen ? (
                      <ChevronUp className='h-5 w-5 text-blue-600' />
                    ) : (
                      <ChevronDown className='h-5 w-5 text-gray-400' />
                    )}
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='overflow-hidden'
                  >
                    <CardContent className='px-6 pb-6'>
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className='pt-2'
                      >
                        <p className='text-gray-600 leading-relaxed'>
                          {faq.answer}
                        </p>
                      </motion.div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

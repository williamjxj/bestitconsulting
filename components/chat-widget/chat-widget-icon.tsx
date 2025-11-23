'use client'

/**
 * Chat widget icon/trigger button component
 *
 * Features:
 * - Floating button in bottom-right corner
 * - Uses angel.webp image (80x80px)
 * - Framer Motion scale animation
 * - Keyboard accessible (Enter/Space)
 * - Fixed positioning with high z-index
 */
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

interface ChatWidgetIconProps {
  /** Callback function when icon is clicked */
  onClick: () => void
  /** Whether the chat widget is currently open */
  isOpen: boolean
}

/**
 * Chat widget icon/trigger button component.
 *
 * Displays a floating button in the bottom-right corner that opens the chat panel.
 * Includes keyboard accessibility and Framer Motion animations.
 *
 * @param {ChatWidgetIconProps} props - Component props
 * @returns {JSX.Element} The chat widget icon button
 */
export function ChatWidgetIcon({ onClick, isOpen }: ChatWidgetIconProps) {
  const { t } = useI18n()
  return (
    <motion.div
      initial={false}
      animate={{ scale: isOpen ? 0.9 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={onClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        variant='ghost'
        className='fixed bottom-6 right-6 z-[99999] h-auto rounded-full shadow-lg hover:shadow-xl transition-shadow p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90'
        aria-label={
          isOpen ? t('closeLabel', 'chatbot') : t('openLabel', 'chatbot')
        }
      >
        <Image
          src='/angel.webp'
          alt='AI Assistant'
          width={80}
          height={80}
          className='object-cover rounded-full'
          priority
        />
      </Button>
    </motion.div>
  )
}

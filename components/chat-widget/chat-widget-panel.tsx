'use client'

/**
 * Chat widget panel component with chat interface
 *
 * Features:
 * - Full chat interface with message display
 * - Streaming AI responses
 * - Message persistence
 * - Auto-scroll to bottom
 * - Copy message functionality
 * - Error handling with retry
 * - Keyboard navigation (Escape to close)
 */
import { useState, useEffect, useRef } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Send, X, AlertCircle, Copy, Check } from 'lucide-react'
import Image from 'next/image'
import { useChatWidget } from '@/lib/hooks/use-chat-widget'
import { useI18n } from '@/lib/i18n'
import type { Message } from '@/types/chat-widget'

interface ChatWidgetPanelProps {
  /** Whether the chat panel is currently open */
  isOpen: boolean
  /** Callback function to close the chat panel */
  onClose: () => void
}

/**
 * Chat widget panel component with full chat interface.
 *
 * Features include:
 * - Message display with user/assistant differentiation
 * - Streaming AI responses via Vercel AI SDK
 * - Message persistence using localStorage
 * - Auto-scroll to latest message
 * - Copy message functionality
 * - Error handling with retry mechanism
 * - Keyboard navigation (Escape to close)
 * - Internationalization support
 *
 * @param {ChatWidgetPanelProps} props - Component props
 * @returns {JSX.Element} The chat widget panel
 */
export function ChatWidgetPanel({ isOpen, onClose }: ChatWidgetPanelProps) {
  const [input, setInput] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { messages: persistedMessages, addMessage } = useChatWidget()
  const [isInitialized, setIsInitialized] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const { t, currentLanguage } = useI18n()

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      fetch: async (url, options) => {
        // Add language to request body
        if (options?.body) {
          const body = JSON.parse(options.body as string)
          body.language = currentLanguage
          options.body = JSON.stringify(body)
        }
        return fetch(url, options)
      },
    }),
    onError: error => {
      console.error('Chat error:', error)
    },
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Initialize messages from persisted state on mount
  useEffect(() => {
    if (!isInitialized) {
      if (persistedMessages.length > 0 && messages.length === 0) {
        const initialMessages = persistedMessages.map(msg => {
          const textParts =
            msg.parts?.filter(part => part.type === 'text') || []
          const textContent =
            textParts.length > 0
              ? textParts.map(part => part.text || '').join('')
              : msg.content

          return {
            id: msg.id,
            role: msg.role,
            parts: [{ type: 'text' as const, text: textContent }],
          }
        })
        setMessages(initialMessages)
      }
      setIsInitialized(true)
    }
  }, [persistedMessages, messages.length, setMessages, isInitialized])

  // Sync messages from useChat to persisted state
  useEffect(() => {
    messages.forEach(msg => {
      // Skip system messages
      if (msg.role === 'system') {
        return
      }

      const textParts = msg.parts?.filter(part => part.type === 'text') || []
      const content = textParts
        .map(part => ('text' in part ? part.text : ''))
        .join('')

      if (content && (msg.role === 'user' || msg.role === 'assistant')) {
        const convertedParts: Message['parts'] = textParts.map(part => ({
          type: 'text' as const,
          text: 'text' in part ? part.text : '',
        }))

        const message: Message = {
          id: msg.id,
          role: msg.role,
          content,
          timestamp: Date.now(),
          parts: convertedParts.length > 0 ? convertedParts : undefined,
        }

        // Only add if not already in persisted messages
        if (!persistedMessages.find(m => m.id === msg.id)) {
          addMessage(message)
        }
      }
    })
  }, [messages, addMessage, persistedMessages])

  // Auto-scroll to bottom when new messages arrive or when streaming
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: 'smooth',
          })
        }
      })
    }
  }, [messages, isOpen, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    sendMessage({ text: trimmed })
    setInput('')
  }

  const handleCopyMessage = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error('Failed to copy message:', error)
    }
  }

  const formatTimestamp = (timestamp?: number) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find(msg => msg.role === 'user')
      if (lastUserMessage) {
        const lastUserIndex = messages.findIndex(
          msg => msg.id === lastUserMessage.id
        )
        setMessages(messages.slice(0, lastUserIndex + 1))
        const textParts =
          lastUserMessage.parts?.filter(part => part.type === 'text') || []
        const messageText = textParts
          .map(part => ('text' in part ? part.text : ''))
          .join('')
        if (messageText) {
          setTimeout(() => {
            sendMessage({ text: messageText })
          }, 100)
        }
      }
    }
  }

  // Handle Escape key to close chat widget
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className='fixed bottom-4 right-4 z-[99999] w-full max-w-md md:w-[450px] h-[calc(100vh-2rem)] max-h-[700px] flex flex-col'
          style={{ willChange: 'auto' }}
          role='dialog'
          aria-label='AI Assistant Chat'
          aria-modal='true'
        >
          <Card
            className='flex flex-col h-full shadow-2xl overflow-hidden bg-white dark:bg-gray-900'
            animated={false}
            hover={false}
          >
            <CardHeader className='flex items-center justify-between px-4 py-2 border-b flex-shrink-0'>
              <CardTitle className='text-lg font-semibold'>
                {t('title', 'chatbot')}
              </CardTitle>
              <div className='flex items-center gap-2'>
                <Image
                  src='/angel.webp'
                  alt='AI Assistant'
                  width={24}
                  height={24}
                  className='object-cover rounded-full'
                />
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={onClose}
                  aria-label={t('closeLabel', 'chatbot')}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </CardHeader>

            <div
              ref={scrollContainerRef}
              className='flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-3 custom-scrollbar'
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.length === 0 && (
                <div className='text-center text-muted-foreground py-8'>
                  <p>{t('startConversation', 'chatbot')}</p>
                </div>
              )}

              {messages.map(message => {
                const textParts =
                  message.parts?.filter(part => part.type === 'text') || []
                const content = textParts
                  .map(part => ('text' in part ? part.text : ''))
                  .join('')

                // Get timestamp from persisted messages
                const persistedMessage = persistedMessages.find(
                  m => m.id === message.id
                )
                const timestamp = persistedMessage?.timestamp

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-indigo-500 text-white shadow-sm'
                      }`}
                    >
                      <div className='flex items-start justify-between gap-2'>
                        <p className='text-sm whitespace-pre-wrap flex-1'>
                          {content}
                        </p>
                        <div className='flex items-center gap-1 flex-shrink-0'>
                          {timestamp && (
                            <span
                              className={`text-xs ${
                                message.role === 'user'
                                  ? 'text-primary-foreground/70'
                                  : 'text-white/70'
                              }`}
                            >
                              {formatTimestamp(timestamp)}
                            </span>
                          )}
                          <Button
                            variant='ghost'
                            size='icon'
                            className={`h-6 w-6 ${
                              message.role === 'user'
                                ? 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/20'
                                : 'text-white/70 hover:text-white hover:bg-white/20'
                            }`}
                            onClick={() =>
                              handleCopyMessage(message.id, content)
                            }
                            aria-label={t('copyMessage', 'chatbot')}
                          >
                            {copiedMessageId === message.id ? (
                              <Check className='h-3 w-3' />
                            ) : (
                              <Copy className='h-3 w-3' />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {isLoading && (
                <div className='flex justify-start'>
                  <div className='bg-indigo-100 dark:bg-indigo-900/30 rounded-lg px-4 py-2 border border-indigo-200 dark:border-indigo-800'>
                    <p className='text-sm text-indigo-700 dark:text-indigo-300'>
                      {t('thinking', 'chatbot')}
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className='bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 max-w-[80%]'>
                  <div className='flex items-start gap-2'>
                    <AlertCircle className='h-5 w-5 text-destructive mt-0.5 shrink-0' />
                    <div className='flex-1'>
                      <p className='text-sm font-semibold text-destructive'>
                        Error
                      </p>
                      <p className='text-sm text-destructive/80 mt-1'>
                        {error.message || t('error', 'chatbot')}
                      </p>
                      <Button
                        onClick={handleRetry}
                        variant='outline'
                        size='sm'
                        className='mt-2 text-destructive border-destructive/30 hover:bg-destructive/10'
                      >
                        {t('retry', 'chatbot')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className='px-3 py-2 border-t shrink-0'
            >
              <div className='flex gap-2 w-full'>
                <input
                  type='text'
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={t('placeholder', 'chatbot')}
                  disabled={isLoading}
                  className='flex-1 w-full min-w-0 px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                />
                <Button
                  type='submit'
                  disabled={isLoading || !input.trim()}
                  size='icon'
                  className='shrink-0'
                >
                  <Send className='h-4 w-4' />
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

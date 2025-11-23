'use client'

/**
 * Lazy-loaded wrapper for ChatWidget component.
 *
 * This client component handles the dynamic import with SSR disabled,
 * which is required for client-only components like the chat widget.
 */
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(
  () =>
    import('./chat-widget').then(mod => ({
      default: mod.ChatWidget,
    })),
  {
    ssr: false, // Chat widget doesn't need SSR
    loading: () => null, // No loading indicator needed for chat widget
  }
)

export default ChatWidget

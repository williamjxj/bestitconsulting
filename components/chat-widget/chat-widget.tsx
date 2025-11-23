'use client'

/**
 * Main chat widget component that combines icon and panel
 *
 * Features:
 * - Toggles between icon and panel views
 * - Only one visible at a time
 * - Simple state management
 */
import { useState } from 'react'
import { ChatWidgetIcon } from './chat-widget-icon'
import { ChatWidgetPanel } from './chat-widget-panel'

/**
 * Main chat widget component that manages the visibility of icon and panel.
 *
 * @returns {JSX.Element} The chat widget with conditional rendering of icon or panel
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Toggles the chat widget open/closed state.
   */
  const toggleWidget = () => {
    setIsOpen(prev => !prev)
  }

  /**
   * Closes the chat widget.
   */
  const closeWidget = () => {
    setIsOpen(false)
  }

  return (
    <>
      {!isOpen && <ChatWidgetIcon onClick={toggleWidget} isOpen={isOpen} />}
      {isOpen && <ChatWidgetPanel isOpen={isOpen} onClose={closeWidget} />}
    </>
  )
}

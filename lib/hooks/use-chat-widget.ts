"use client";

import { useState, useEffect } from "react";
import type { Message } from "@/types/chat-widget";

const STORAGE_KEY = "chat-widget-messages";
const MAX_MESSAGES = 100;

/**
 * Custom hook for managing chat widget state with localStorage persistence
 *
 * Features:
 * - Loads messages from localStorage on mount
 * - Saves messages to localStorage on update
 * - Limits to 100 messages to prevent localStorage bloat
 * - Provides addMessage and clearMessages functions
 */
export function useChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load messages from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedMessages = JSON.parse(stored);
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Failed to load chat messages:", error);
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addMessage = (message: Message) => {
    setMessages((prev) => {
      const updated = [...prev, message];
      // Limit to MAX_MESSAGES to prevent localStorage bloat
      const limited = updated.slice(-MAX_MESSAGES);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
      } catch (error) {
        console.error("Failed to save chat messages:", error);
        // If storage quota exceeded, remove oldest messages
        if (error instanceof Error && error.name === "QuotaExceededError") {
          const trimmed = updated.slice(-Math.floor(MAX_MESSAGES / 2));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
          return trimmed;
        }
      }
      return limited;
    });
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { messages, addMessage, clearMessages };
}


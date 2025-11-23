/**
 * Type definitions for the AI Chatbot Widget feature
 */

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  parts?: MessagePart[];
}

export interface MessagePart {
  type: "text";
  text: string;
}

export interface Conversation {
  messages: Message[];
  sessionId?: string;
  language?: string;
  createdAt?: number;
  lastActivity?: number;
}

export interface Lead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: "chatbot";
  timestamp: number;
  conversationContext?: string;
}


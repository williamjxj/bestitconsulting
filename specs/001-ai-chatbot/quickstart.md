# Quickstart: AI Chatbot Implementation

This guide provides step-by-step instructions for implementing the AI chatbot feature based on the reference implementation from images-hub.

## Prerequisites

- ✅ Next.js 15+ project with App Router
- ✅ TypeScript configured
- ✅ Tailwind CSS and shadcn/ui installed
- ✅ Framer Motion installed
- ✅ Environment variables configured:
  - `AI_GATEWAY_API_KEY` (for production)
  - `DEEPSEEK_API_KEY` (for local development)

## Step 1: Install Dependencies

```bash
npm install ai @ai-sdk/react @ai-sdk/deepseek
# or
pnpm add ai @ai-sdk/react @ai-sdk/deepseek
# or
yarn add ai @ai-sdk/react @ai-sdk/deepseek
```

## Step 2: Create Type Definitions

Create `types/chat-widget.ts`:

```typescript
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
```

## Step 3: Create Chat Widget Hook

Create `lib/hooks/use-chat-widget.ts`:

```typescript
"use client";

import { useState, useEffect } from "react";
import type { Message } from "@/types/chat-widget";

const STORAGE_KEY = "chat-widget-messages";

export function useChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load messages from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load chat messages:", error);
      }
    }
  }, []);

  const addMessage = (message: Message) => {
    setMessages((prev) => {
      const updated = [...prev, message];
      // Limit to 100 messages to prevent localStorage bloat
      const limited = updated.slice(-100);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
      return limited;
    });
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { messages, addMessage, clearMessages };
}
```

## Step 4: Create API Route

Create `app/api/chat/route.ts`:

```typescript
import { streamText, convertToModelMessages } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

export const runtime = "edge";

const REQUEST_TIMEOUT_MS = 60_000;

const getModel = () => {
  const isVercelProduction = process.env.VERCEL === "1";

  if (isVercelProduction) {
    // Use AI Gateway in production
    return "deepseek/deepseek-chat";
  } else {
    // Use DeepSeek directly in local development
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("DEEPSEEK_API_KEY is required for local development");
    }
    const provider = createDeepSeek({ apiKey });
    return provider.chat("deepseek-chat");
  }
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: {
            type: "validation",
            message: "Messages array is required and cannot be empty",
            retryable: false,
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate message length
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "user" && lastMessage?.content) {
      const estimatedTokens = lastMessage.content.length / 4;
      if (estimatedTokens > 8000) {
        return new Response(
          JSON.stringify({
            error: {
              type: "validation",
              message: "Message exceeds token limit. Please shorten your message.",
              retryable: false,
              details: "Maximum tokens: 8000",
            },
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Convert to model messages
    const modelMessages = convertToModelMessages(messages);

    // Create timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      // Stream response
      const result = streamText({
        model: getModel(),
        messages: modelMessages,
        temperature: 0.7,
        maxOutputTokens: 2000,
        abortSignal: controller.signal,
      });

      clearTimeout(timeoutId);
      return result.toUIMessageStreamResponse();
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle errors
      if (error instanceof Error && error.name === "AbortError") {
        return new Response(
          JSON.stringify({
            error: {
              type: "timeout",
              message: "Request timed out. Please try again.",
              retryable: true,
            },
          }),
          { status: 408, headers: { "Content-Type": "application/json" } }
        );
      }

      // Handle other errors
      console.error("Chat API Error:", error);
      return new Response(
        JSON.stringify({
          error: {
            type: "service",
            message: "An error occurred processing your request. Please try again.",
            retryable: true,
            details: error instanceof Error ? error.message : "Unknown error",
          },
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error: {
          type: "network",
          message: "Network error occurred. Please check your connection and try again.",
          retryable: true,
        },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
```

## Step 5: Create Chat Widget Components

### 5.1 Chat Widget Icon

Create `components/chat-widget/chat-widget-icon.tsx`:

```typescript
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ChatWidgetIconProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatWidgetIcon({ onClick, isOpen }: ChatWidgetIconProps) {
  return (
    <motion.div
      initial={false}
      animate={{ scale: isOpen ? 0.9 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        variant="ghost"
        className="fixed bottom-6 right-6 z-[9999] h-auto rounded-full shadow-lg hover:shadow-xl transition-shadow p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90"
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        <Image
          src="/angel.webp"
          alt="AI Assistant"
          width={80}
          height={80}
          className="object-cover rounded-full"
        />
      </Button>
    </motion.div>
  );
}
```

### 5.2 Chat Widget Panel

Create `components/chat-widget/chat-widget-panel.tsx` (see reference implementation for full code - too long to include here, but follows the same pattern).

### 5.3 Main Chat Widget

Create `components/chat-widget/chat-widget.tsx`:

```typescript
"use client";

import { useState } from "react";
import { ChatWidgetIcon } from "./chat-widget-icon";
import { ChatWidgetPanel } from "./chat-widget-panel";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
  };

  const closeWidget = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && <ChatWidgetIcon onClick={toggleWidget} isOpen={isOpen} />}
      {isOpen && <ChatWidgetPanel isOpen={isOpen} onClose={closeWidget} />}
    </>
  );
}
```

## Step 6: Add to Layout

Add to `app/layout.tsx`:

```typescript
import { ChatWidget } from "@/components/chat-widget/chat-widget";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

## Step 7: Add Translations

Add chatbot translations to `lib/i18n/translations/en.ts`, `fr.ts`, `es.ts`, `zh.ts`:

```typescript
chatbot: {
  title: "AI Assistant",
  placeholder: "Type your message...",
  thinking: "Thinking...",
  error: "An error occurred. Please try again.",
  retry: "Retry",
  startConversation: "Start a conversation!",
  // ... more translations
}
```

## Step 8: Test

1. Start development server: `npm run dev`
2. Navigate to any page
3. Click the chatbot icon (bottom-right)
4. Send a test message
5. Verify streaming response
6. Verify persistence across navigation

## Step 9: Production Setup

1. Deploy to Vercel
2. Configure DeepSeek API key in Vercel Dashboard → AI Gateway → Integrations
3. Add credit card (required for AI Gateway free tier)
4. Test in production

## Troubleshooting

### Issue: Chat not appearing
- Check z-index (should be 9999)
- Verify component is in layout
- Check console for errors

### Issue: API errors
- Verify environment variables are set
- Check API route logs
- Verify DeepSeek API key is valid

### Issue: Messages not persisting
- Check localStorage in browser DevTools
- Verify hook is working correctly
- Check for storage quota errors

## Next Steps

- Add lead capture functionality
- Integrate with knowledge base
- Add proactive engagement
- Optimize performance
- Add analytics


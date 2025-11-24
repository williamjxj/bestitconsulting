# AI Chatbot Chat Logic Documentation

## Overview

This document explains how the AI chatbot chat logic works, including message flow, streaming responses, persistence, and system prompt integration.

## Architecture Overview

```
User Input → ChatWidgetPanel → useChat Hook → API Route → DeepSeek LLM
                ↓                                                    ↓
         localStorage ← useChatWidget Hook ← Streaming Response ← AI Gateway
```

## Core Components

### 1. Chat Widget Panel (`components/chat-widget/chat-widget-panel.tsx`)

The main chat interface component that handles:
- Message input and display
- Streaming AI responses
- Message persistence
- Language detection
- Error handling

### 2. API Route (`app/api/chat/route.ts`)

Edge runtime API endpoint that:
- Receives chat messages
- Validates input
- Routes to DeepSeek LLM (via Vercel AI Gateway or direct API)
- Streams responses back to client
- Includes system prompt with company knowledge

### 3. Chat Widget Hook (`lib/hooks/use-chat-widget.ts`)

Custom hook for:
- Loading messages from localStorage
- Saving messages to localStorage
- Managing message limits (100 messages max)

## Message Flow

### Step 1: User Sends Message

```typescript
// User types message and clicks Send
handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  const trimmed = input.trim()
  if (!trimmed || isLoading) return

  // Send message via Vercel AI SDK
  sendMessage({ text: trimmed })
  setInput('')
}
```

**What happens:**
1. User types message in input field
2. Clicks Send button or presses Enter
3. `handleSubmit` validates and trims input
4. Calls `sendMessage()` from `useChat` hook
5. Message is added to messages array immediately (optimistic update)

### Step 2: Message Transport

```typescript
const { messages, sendMessage, status, error, setMessages } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
    fetch: async (url, options) => {
      // Add language context to request
      if (options?.body) {
        const body = JSON.parse(options.body as string)
        body.language = currentLanguage // From useI18n hook
        options.body = JSON.stringify(body)
      }
      return fetch(url, options)
    },
  }),
})
```

**What happens:**
1. `useChat` hook wraps message in request body
2. Adds current language preference
3. Sends POST request to `/api/chat`
4. Request includes:
   - `messages`: Array of conversation history
   - `language`: User's current language code (en, fr, es, zh)

### Step 3: API Route Processing

```typescript
export async function POST(req: Request) {
  const { messages, language } = await req.json()

  // 1. Validate messages array
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return error response
  }

  // 2. Validate message length (token limit)
  const estimatedTokens = lastMessage.content.length / 4
  if (estimatedTokens > MAX_TOKENS_PER_MESSAGE) {
    return error response
  }

  // 3. Convert UI messages to model messages
  const modelMessages = convertToModelMessages(messages)

  // 4. Create system prompt with company knowledge
  const systemPrompt = `You are a helpful AI assistant for Best IT Consulting...`

  // 5. Add system message to conversation
  const messagesWithSystem = [
    { role: 'system', content: systemPrompt },
    ...modelMessages,
  ]

  // 6. Stream response from LLM
  const result = streamText({
    model: getModel(), // DeepSeek via AI Gateway or direct API
    messages: messagesWithSystem,
    temperature: 0.7,
    maxOutputTokens: 2000,
  })

  // 7. Return streaming response
  return result.toUIMessageStreamResponse()
}
```

**What happens:**
1. **Validation**: Checks messages array exists and is valid
2. **Token Limit Check**: Ensures message doesn't exceed 8000 tokens
3. **Message Conversion**: Converts UI message format to model format
4. **System Prompt Injection**: Adds comprehensive system prompt with:
   - Company information
   - Services offered
   - FAQ answers
   - Pricing information
   - Contact details
   - Language instructions
5. **Model Selection**:
   - Production: Uses `"deepseek/deepseek-chat"` (routed via Vercel AI Gateway)
   - Local: Uses `createDeepSeek({ apiKey })` directly
6. **Streaming**: Returns text/event-stream response

### Step 4: Streaming Response

```typescript
// Vercel AI SDK handles streaming automatically
const { messages, status } = useChat({ ... })

// Status changes:
// 'idle' → 'submitted' → 'streaming' → 'idle'
```

**What happens:**
1. API returns `text/event-stream` response
2. `useChat` hook automatically processes stream
3. Status updates: `idle` → `submitted` → `streaming` → `idle`
4. Messages array updates in real-time as tokens arrive
5. UI re-renders with each token update

### Step 5: Message Display

```typescript
{messages.map(message => {
  const textParts = message.parts?.filter(part => part.type === 'text') || []
  const content = textParts.map(part => part.text).join('')

  return (
    <div className={message.role === 'user' ? 'justify-end' : 'justify-start'}>
      <div className={message.role === 'user'
        ? 'bg-primary text-primary-foreground'
        : 'bg-indigo-500 text-white'}>
        {content}
      </div>
    </div>
  )
})}
```

**What happens:**
1. Messages array is iterated
2. Text content is extracted from message parts
3. Messages are displayed:
   - User messages: Right-aligned, primary color
   - Assistant messages: Left-aligned, indigo color
4. Timestamps and copy buttons are shown

### Step 6: Message Persistence

```typescript
// Sync messages from useChat to localStorage
useEffect(() => {
  messages.forEach(msg => {
    if (msg.role === 'system') return

    const content = extractTextContent(msg)
    const message: Message = {
      id: msg.id,
      role: msg.role,
      content,
      timestamp: Date.now(),
      parts: convertedParts,
    }

    // Only add if not already persisted
    if (!persistedMessages.find(m => m.id === msg.id)) {
      addMessage(message) // Saves to localStorage
    }
  })
}, [messages, addMessage, persistedMessages])
```

**What happens:**
1. Every time messages array updates, effect runs
2. Each message is converted to persistence format
3. Messages are saved to localStorage via `useChatWidget` hook
4. Maximum 100 messages are kept (oldest removed if exceeded)
5. Messages persist across page navigation

### Step 7: Message Restoration

```typescript
// Initialize messages from localStorage on mount
useEffect(() => {
  if (!isInitialized && persistedMessages.length > 0 && messages.length === 0) {
    const initialMessages = persistedMessages.map(msg => ({
      id: msg.id,
      role: msg.role,
      parts: [{ type: 'text', text: msg.content }],
    }))
    setMessages(initialMessages)
  }
  setIsInitialized(true)
}, [persistedMessages, messages.length, setMessages, isInitialized])
```

**What happens:**
1. On component mount, checks localStorage for saved messages
2. Converts persisted messages to UI format
3. Restores conversation history
4. User sees previous conversation when reopening chatbot

## System Prompt Logic

The system prompt is dynamically constructed with:

### Company Information
- Company name, location, contact details
- Team size, experience, statistics
- Business hours, support availability

### Services Knowledge Base
- Full-Stack Development details
- AI Integration & Modernization
- Cloud Solutions
- Team Augmentation
- Cybersecurity

### FAQ Knowledge Base
- Extracted from `app/faq/page.tsx`
- 10 common questions with answers
- Covers timeline, support, technology, industries, pricing, etc.

### Language Instructions
```typescript
LANGUAGE INSTRUCTION:
${language
  ? `- The user's preferred language is: ${language}
     - Respond in ${language} unless explicitly asked for another
     - Use appropriate greetings and formalities for ${language} culture`
  : "- Respond in English by default, but adapt to user's language"}
```

**How it works:**
1. Language is detected from `useI18n().currentLanguage`
2. Language code (en, fr, es, zh) is passed to API
3. System prompt includes language-specific instructions
4. LLM responds in user's preferred language

## Error Handling Logic

### Error Types

1. **Validation Errors** (400)
   - Empty messages array
   - Message exceeds token limit
   - Non-retryable

2. **Timeout Errors** (408)
   - Request exceeds 60 seconds
   - Retryable

3. **Rate Limit Errors** (429)
   - Too many requests
   - Includes retry-after time
   - Retryable

4. **Configuration Errors** (402)
   - Vercel AI Gateway credit card required
   - Non-retryable
   - Includes action URL

5. **Service Errors** (500)
   - LLM service unavailable
   - Network errors
   - Retryable

### Error Display

```typescript
{error && (
  <div className='bg-destructive/10 border border-destructive/20'>
    <AlertCircle />
    <p>{error.message || t('error', 'chatbot')}</p>
    <Button onClick={handleRetry}>Retry</Button>
  </div>
)}
```

**Retry Logic:**
```typescript
const handleRetry = () => {
  // Find last user message
  const lastUserMessage = [...messages].reverse()
    .find(msg => msg.role === 'user')

  // Remove all messages after last user message
  const lastUserIndex = messages.findIndex(
    msg => msg.id === lastUserMessage.id
  )
  setMessages(messages.slice(0, lastUserIndex + 1))

  // Resend last user message
  sendMessage({ text: messageText })
}
```

## Auto-Scroll Logic

```typescript
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
```

**What happens:**
1. Effect triggers when messages, isOpen, or isLoading changes
2. Uses `requestAnimationFrame` for smooth scrolling
3. Scrolls to bottom of message container
4. Smooth scroll behavior for better UX

## Language Detection Flow

```typescript
// 1. Get current language from i18n context
const { t, currentLanguage } = useI18n()
// currentLanguage = 'en' | 'fr' | 'es' | 'zh'

// 2. Pass language to API in fetch interceptor
fetch: async (url, options) => {
  const body = JSON.parse(options.body as string)
  body.language = currentLanguage // 'en', 'fr', 'es', or 'zh'
  options.body = JSON.stringify(body)
  return fetch(url, options)
}

// 3. API includes language in system prompt
const systemPrompt = `...
LANGUAGE INSTRUCTION:
- The user's preferred language is: ${language}
- Respond in ${language} unless explicitly asked for another
...`

// 4. LLM responds in detected language
```

## Message Format

### UI Message Format (from useChat)
```typescript
{
  id: string
  role: 'user' | 'assistant' | 'system'
  parts: Array<{
    type: 'text'
    text: string
  }>
}
```

### Persisted Message Format (localStorage)
```typescript
{
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  parts?: Array<{
    type: 'text'
    text: string
  }>
}
```

### Model Message Format (to LLM)
```typescript
{
  role: 'user' | 'assistant' | 'system'
  content: string
}
```

## State Management

### Component State
- `input`: Current input field value
- `isInitialized`: Whether messages have been restored
- `copiedMessageId`: Which message was copied (for UI feedback)

### Hook State (useChat)
- `messages`: Array of conversation messages
- `status`: 'idle' | 'submitted' | 'streaming'
- `error`: Error object if request failed

### Persisted State (localStorage)
- `chat-widget-messages`: Array of up to 100 messages
- Automatically synced with useChat messages

## Performance Optimizations

1. **Lazy Loading**: ChatWidget loaded dynamically with `next/dynamic`
2. **Smooth Scrolling**: Uses `requestAnimationFrame` and `scrollTo` with smooth behavior
3. **Message Limit**: Maximum 100 messages prevents localStorage bloat
4. **Edge Runtime**: API route uses Edge runtime for lower latency
5. **Streaming**: Responses stream in real-time, no waiting for complete response

## Security Considerations

1. **Environment Variables**: API keys stored in `.env.local`, never exposed to client
2. **Input Validation**: Messages validated for length and format
3. **Token Limits**: Prevents abuse with 8000 token limit per message
4. **Timeout Protection**: 60-second timeout prevents hanging requests
5. **Error Sanitization**: Error messages don't expose sensitive information

## Future Enhancements

1. **Lead Generation**: Detect interest and show lead capture form
2. **Enhanced Error Handling**: Better error categorization and user guidance
3. **Pricing Inquiry**: Structured pricing responses
4. **Escalation**: Detect when user wants human contact
5. **Analytics**: Track usage and conversion metrics





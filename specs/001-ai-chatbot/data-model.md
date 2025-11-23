# Data Model: AI Chatbot

## Overview

This document defines the data structures and entities for the AI chatbot feature. The chatbot uses client-side state management with localStorage persistence and communicates with a server-side API for AI responses.

## Entities

### Message

Represents a single message in a conversation.

**Properties**:
- `id` (string, required): Unique message identifier
- `role` (string, required): Message role - "user" | "assistant" | "system"
- `content` (string, required): Message text content
- `timestamp` (number, optional): Unix timestamp in milliseconds
- `parts` (MessagePart[], optional): Structured message parts (for future extensibility)

**Validation Rules**:
- `id` must be unique within a conversation
- `role` must be one of: "user", "assistant", "system"
- `content` must be non-empty string
- `timestamp` must be valid Unix timestamp if provided

**State Transitions**:
- Created → Sent (when user submits)
- Sent → Streaming (when AI starts responding)
- Streaming → Complete (when AI finishes)
- Any state → Error (on failure)

### MessagePart

Represents a part of a message (for future extensibility to support images, files, etc.).

**Properties**:
- `type` (string, required): Part type - "text" | "image" | "file" (currently only "text" supported)
- `text` (string, required if type is "text"): Text content

**Validation Rules**:
- `type` must be "text" for initial implementation
- `text` must be non-empty if type is "text"

### Conversation

Represents a chat conversation session.

**Properties**:
- `messages` (Message[], required): Array of messages in the conversation
- `sessionId` (string, optional): Session identifier (for analytics)
- `language` (string, optional): User's preferred language code
- `createdAt` (number, optional): Conversation start timestamp
- `lastActivity` (number, optional): Last message timestamp

**Validation Rules**:
- `messages` must be array (can be empty)
- `language` must be valid language code if provided (en, fr, es, zh)

**State Management**:
- Stored in localStorage with key: `chat-widget-messages`
- Persists across page navigation
- Cleared on explicit user action or after 30 minutes of inactivity

### Lead

Represents a captured lead from chatbot conversation.

**Properties**:
- `name` (string, required): Lead's name
- `email` (string, required): Lead's email address
- `phone` (string, optional): Lead's phone number
- `company` (string, optional): Lead's company name
- `message` (string, required): Conversation context or lead's message
- `source` (string, required): Source identifier - "chatbot"
- `timestamp` (number, required): Capture timestamp
- `conversationContext` (string, optional): Relevant conversation history

**Validation Rules**:
- `email` must be valid email format
- `name` must be non-empty string
- `message` must be non-empty string

**Relationships**:
- Originates from a Conversation
- Submitted to `/api/contact` endpoint

## Data Flow

### Message Flow

1. **User Input**:
   ```
   User types message → Input component → handleSubmit
   ```

2. **Message Creation**:
   ```
   handleSubmit → createMessage({ role: "user", content: input })
   → addMessage (localStorage) → sendMessage (API)
   ```

3. **AI Response**:
   ```
   API receives → streamText → Streaming response chunks
   → useChat hook → Message parts → addMessage (localStorage)
   → Display in UI
   ```

4. **Persistence**:
   ```
   Every message → useChatWidget hook → localStorage
   → Persist across navigation → Restore on mount
   ```

### Lead Capture Flow

1. **Detection**:
   ```
   User expresses interest → Detect intent → Trigger lead capture
   ```

2. **Collection**:
   ```
   Ask for contact info → Collect name, email, phone, company
   → Validate → Prepare lead object
   ```

3. **Submission**:
   ```
   Lead object → POST /api/contact → Email notification
   → Confirmation to user
   ```

## Storage Schema

### localStorage Structure

```typescript
{
  "chat-widget-messages": Message[],
  "chat-widget-language": string, // Optional language preference
  "chat-widget-session-id": string // Optional session ID
}
```

### API Request/Response

#### Request (POST /api/chat)
```typescript
{
  messages: Array<{
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    parts?: Array<{
      type: "text";
      text: string;
    }>;
  }>;
}
```

#### Response (Streaming)
```
Content-Type: text/event-stream

data: {"type":"text-delta","textDelta":"Hello"}
data: {"type":"text-delta","textDelta":" there"}
...
data: {"type":"finish","finishReason":"stop"}
```

## Validation Rules

### Message Validation
- Maximum content length: 32,000 characters (approximately 8,000 tokens)
- Minimum content length: 1 character
- Role must be valid enum value

### Conversation Validation
- Maximum messages per conversation: 100 (to prevent localStorage bloat)
- Maximum conversation age: 30 minutes of inactivity
- Auto-cleanup old messages if limit exceeded

### Lead Validation
- Email format validation (RFC 5322 compliant)
- Phone format validation (optional, flexible format)
- Name: 1-100 characters
- Message: 1-5000 characters

## Error States

### Message Errors
- **Network Error**: Retry mechanism, user-friendly message
- **Timeout Error**: 60-second timeout, retry option
- **Rate Limit Error**: Rate limit message, retry after delay
- **Validation Error**: Clear error message, input validation

### Conversation Errors
- **Storage Error**: Fallback to session storage, user notification
- **Corruption Error**: Clear and reset conversation
- **Quota Error**: Clear old messages, notify user

## TypeScript Types

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
```

## Migration Notes

When migrating from reference implementation:
- Message structure is compatible
- localStorage key remains the same: `chat-widget-messages`
- API request/response format is compatible
- No database migration needed (client-side only)


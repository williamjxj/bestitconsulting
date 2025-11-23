import { streamText, convertToModelMessages } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export const runtime = 'edge' // Edge runtime for lower latency

// Timeout: 60 seconds (per specification)
const REQUEST_TIMEOUT_MS = 60_000

// Maximum tokens per message: 8000 (approximately 32,000 characters)
const MAX_TOKENS_PER_MESSAGE = 8000

/**
 * Get the model to use based on environment
 * Production: Use model string format for Vercel AI Gateway routing
 * Local: Use Deepseek provider directly
 */
const getModel = () => {
  // Check if running on Vercel (production)
  const isVercelProduction = process.env.VERCEL === '1'

  if (isVercelProduction) {
    // On Vercel, model string format automatically routes through AI Gateway
    // The DEEPSEEK_API_KEY should be configured in Vercel Dashboard → AI Gateway → Integrations
    return 'deepseek/deepseek-chat'
  } else {
    // Local development: Use Deepseek provider directly with API key from env
    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      throw new Error(
        'DEEPSEEK_API_KEY is required for local development. ' +
          'Please set it in your .env.local file or configure it in Vercel Dashboard for production.'
      )
    }
    // Create Deepseek provider with API key
    const provider = createDeepSeek({ apiKey })
    return provider.chat('deepseek-chat')
  }
}

/**
 * POST /api/chat
 *
 * Handles chat message requests and returns streaming AI responses.
 *
 * Request body:
 * {
 *   messages: Array<{ id: string, role: "user" | "assistant" | "system", content: string }>
 * }
 *
 * Response: text/event-stream with streaming text deltas
 */
export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    // Validate messages array
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: {
            type: 'validation',
            message: 'Messages array is required and cannot be empty',
            retryable: false,
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate message length (approximate token check)
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'user' && lastMessage?.content) {
      const estimatedTokens = lastMessage.content.length / 4 // Approximate: 1 token ≈ 4 characters
      if (estimatedTokens > MAX_TOKENS_PER_MESSAGE) {
        return new Response(
          JSON.stringify({
            error: {
              type: 'validation',
              message:
                'Message exceeds token limit. Please shorten your message.',
              retryable: false,
              details: `Maximum tokens: ${MAX_TOKENS_PER_MESSAGE}`,
            },
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    // Convert UIMessages to ModelMessages
    const modelMessages = convertToModelMessages(messages)

    // Create system prompt with company information, FAQs, and services
    const systemPrompt = `You are a helpful AI assistant for Best IT Consulting, a Canadian IT consulting firm specializing in software development, cloud solutions, AI integration, and digital transformation.

COMPANY INFORMATION:
- Company: Best IT Consulting Inc.
- Location: Vancouver, Canada (Surrey, BC)
- Website: https://www.bestitconsulting.ca
- Phone: +1 (236) 992-3846
- Email: service@bestitconsulting.ca
- Team: 50+ certified professionals
- Experience: 20+ years
- Projects Delivered: 50+
- Client Satisfaction: 98%
- Support: 24/7 available

SERVICES OFFERED:
1. Full-Stack Development
   - End-to-end web and mobile applications
   - Frontend: React, Next.js, Tailwind CSS, shadcn/ui
   - Backend: Node.js, Python, Express, FastAPI
   - Database design and optimization
   - RESTful and GraphQL API development
   - Performance optimization
   - Code review and refactoring

2. AI Integration & Modernization
   - Legacy system assessment and upgrades
   - AI strategy and roadmap
   - LLM/Agent integration, RAG systems
   - Automation and orchestration
   - Data pipeline modernization
   - LLM localization and customization

3. Cloud Solutions
   - Scalable cloud architecture (AWS, GCP, Azure)
   - Cloud migration strategy
   - Infrastructure as code
   - Containerization with Docker and Kubernetes
   - Serverless architecture
   - Cloud security and compliance
   - Cost optimization

4. Team Augmentation
   - Expert developers to accelerate projects
   - Fill skill gaps in teams
   - Flexible resourcing models
   - Seamless integration with existing teams
   - Knowledge transfer
   - Agile methodology expertise

5. Cybersecurity
   - Comprehensive security solutions
   - Industry-standard security measures
   - Encryption and secure data transmission
   - Regular security audits
   - GDPR and privacy compliance

FREQUENTLY ASKED QUESTIONS:
Q: What is your typical project timeline?
A: Depends on the project requirements and details. We work with clients to establish realistic timelines based on scope and complexity.

Q: Do you offer ongoing support and maintenance?
A: Yes, we provide comprehensive support packages including 24/7 monitoring, regular updates, and technical assistance to ensure your solution runs smoothly.

Q: Can you work with our existing technology stack?
A: Absolutely! We specialize in integrating with existing systems and can work with virtually any technology stack to enhance your current infrastructure.

Q: What industries do you serve?
A: We serve clients across healthcare, finance, retail, manufacturing, transportation, education, and technology sectors, adapting our solutions to industry-specific requirements.

Q: How do you structure your pricing?
A: We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Pricing is based on project scope, complexity, and timeline requirements.

Q: Is the initial consultation really free?
A: Yes! We offer a completely free 30-minute consultation to discuss your project requirements, provide initial recommendations, and answer any questions you may have.

Q: How do you ensure data security and privacy?
A: We implement industry-standard security measures including encryption, secure data transmission, regular security audits, and compliance with GDPR and other privacy regulations.

Q: What is the size and expertise of your team?
A: Our team consists of 50+ certified professionals including software engineers, cloud architects, data scientists, UI/UX designers, and project managers with expertise across multiple technologies.

Q: How do you handle project communication and updates?
A: We maintain regular communication through scheduled meetings, progress reports, and real-time collaboration tools. You'll have a dedicated project manager as your primary point of contact.

Q: Can your solutions scale with our business growth?
A: Absolutely! We design scalable solutions that can grow with your business. Our cloud-based architectures and modular designs ensure your systems can handle increased load and functionality.

PRICING INFORMATION:
- Flexible pricing models: fixed-price projects, time and materials, retainer agreements
- Pricing based on: project scope, complexity, and timeline requirements
- Free 30-minute initial consultation available
- Contact us for personalized quotes

CONTACT OPTIONS:
- Phone: +1 (236) 992-3846 (Mon-Fri 9AM-6PM EST, Sat 10AM-4PM EST)
- Email: service@bestitconsulting.ca (Response within 24 hours)
- Website: https://www.bestitconsulting.ca
- Office: 10355 152 St, Surrey, BC V3R 7C3, Canada

YOUR ROLE:
- Answer questions about services, pricing, processes, and company information
- Provide helpful, accurate information based on the knowledge base above
- Be friendly, professional, and concise
- If asked about pricing, mention that we offer free consultations for personalized quotes
- If user expresses interest, offer to help them get in touch with our team
- Direct users to contact form or phone/email for detailed discussions
- Maintain conversation context throughout the chat

LANGUAGE INSTRUCTION:
${
  language
    ? `- The user's preferred language is: ${language}
- Respond in ${language} unless the user explicitly asks for another language
- Use appropriate greetings and formalities for ${language} culture`
    : "- Respond in English by default, but adapt to the user's language if they communicate in another language"
}

IMPORTANT:
- Always be helpful and professional
- If you don't know something specific, suggest they contact us directly
- Encourage free consultation for detailed project discussions
- Keep responses concise but informative`

    // Add system message to the beginning of messages
    const messagesWithSystem = [
      {
        role: 'system' as const,
        content: systemPrompt,
      },
      ...modelMessages,
    ]

    // Create AbortController for timeout handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      // Stream text using Vercel AI Gateway routing (production) or Deepseek provider (local)
      const result = streamText({
        model: getModel(),
        messages: messagesWithSystem,
        temperature: 0.7,
        maxOutputTokens: 2000,
        abortSignal: controller.signal,
      })

      clearTimeout(timeoutId)
      return result.toUIMessageStreamResponse()
    } catch (error) {
      clearTimeout(timeoutId)

      // Handle timeout
      if (error instanceof Error && error.name === 'AbortError') {
        return new Response(
          JSON.stringify({
            error: {
              type: 'timeout',
              message: 'Request timed out. Please try again.',
              retryable: true,
            },
          }),
          { status: 408, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Handle credit card requirement (Vercel AI Gateway)
      if (
        error instanceof Error &&
        (error.message.includes('credit card') ||
          error.message.includes('valid credit card') ||
          error.message.includes('add-credit-card'))
      ) {
        return new Response(
          JSON.stringify({
            error: {
              type: 'configuration',
              message:
                'AI Gateway requires a valid credit card on file. Please add a credit card in Vercel dashboard to unlock free credits.',
              retryable: false,
              details: error.message,
              actionUrl:
                'https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card',
            },
          }),
          { status: 402, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Handle rate limits
      if (
        error instanceof Error &&
        (error.message.includes('rate limit') ||
          error.message.includes('429') ||
          error.message.includes('too many requests'))
      ) {
        const retryAfter = 60 // Default retry after 60 seconds
        return new Response(
          JSON.stringify({
            error: {
              type: 'rate_limit',
              message: 'Rate limit exceeded. Please try again later.',
              retryable: true,
              retryAfter,
            },
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': retryAfter.toString(),
            },
          }
        )
      }

      // Handle other errors
      console.error('Chat API Error:', error)
      return new Response(
        JSON.stringify({
          error: {
            type: 'service',
            message:
              'An error occurred processing your request. Please try again.',
            retryable: true,
            details: error instanceof Error ? error.message : 'Unknown error',
          },
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({
        error: {
          type: 'network',
          message:
            'Network error occurred. Please check your connection and try again.',
          retryable: true,
        },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

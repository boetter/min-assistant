// app/api/assistant/route.ts
import { AssistantResponse } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

// Kør som Edge-funktion (valgfrit)
export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { threadId, message } = (await req.json()) as {
    threadId: string | null
    message: string
  }

  // Start ny eller genbrug thread
  const tid = threadId ?? (await openai.beta.threads.create({})).id

  // Tilføj bruger-besked og gem messageId
  const msg = await openai.beta.threads.messages.create(tid, {
    role: 'user',
    content: message,
  })

  // Returnér både threadId og messageId til AssistantResponse
  return AssistantResponse(
    { threadId: tid, messageId: msg.id },
    async ({ forwardStream }) => {
      return forwardStream(
        openai.beta.threads.runs.stream(tid, {
          assistant_id: process.env.ASSISTANT_ID!,
        })
      )
    }
  )
}
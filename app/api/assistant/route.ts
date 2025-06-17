// app/api/assistant/route.ts
import { AssistantResponse } from 'ai'
import OpenAI from 'openai'

export const runtime = 'edge'
export const maxDuration = 60

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  // Korrekt assertion af JSON-body
  const { threadId, message } = (await req.json()) as {
    threadId: string | null
    message: string
  }

  // Start ny eller genbrug thread
  const tid = threadId ?? (await openai.beta.threads.create({})).id

  // Tilføj bruger-besked og hent messageId
  const msg = await openai.beta.threads.messages.create(tid, {
    role: 'user',
    content: message,
  })

  // Returnér både threadId + messageId, og stream med øget max_tokens
  return AssistantResponse(
    { threadId: tid, messageId: msg.id },
    async ({ forwardStream }) => {
      return forwardStream(
        openai.beta.threads.runs.stream(tid, {
          assistant_id: process.env.ASSISTANT_ID!,
          max_tokens: 2048,
        })
      )
    }
  )
}
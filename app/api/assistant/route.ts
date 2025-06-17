// app/api/assistant/route.ts
import { AssistantResponse } from 'ai'
import OpenAI from 'openai'

export const runtime = 'edge'
export const maxDuration = 60

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function POST(req: Request) {
  const { threadId, message } = (await req.json()) as {
    threadId: string | null
    message: string
  }

  const tid = threadId ?? (await openai.beta.threads.create({})).id
  const msg = await openai.beta.threads.messages.create(tid, {
    role: 'user',
    content: message,
  })

  return AssistantResponse(
    { threadId: tid, messageId: msg.id },
    async ({ forwardStream }) => {
      return forwardStream(
        openai.beta.threads.runs.stream(tid, {
          assistant_id: process.env.ASSISTANT_ID!,
          max_completion_tokens: 25000
        })
      )
    }
  )
}
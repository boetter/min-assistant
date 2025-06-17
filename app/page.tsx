'use client'
import { useAssistant } from '@ai-sdk/react'

export default function Page() {
  const {
    status, messages, input,
    submitMessage, handleInputChange
  } = useAssistant({ api: '/api/assistant' })

  return (
    <main style={{ padding: 20 }}>
      {messages.map(m => (
        <p key={m.id}><strong>{m.role}:</strong> {m.content}</p>
      ))}
      {status === 'in_progress' && <p>Assistant tænker…</p>}
      <form onSubmit={submitMessage}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Skriv til assistant…"
          disabled={status !== 'awaiting_message'}
          style={{ width: '100%', padding: 8 }}
        />
      </form>
    </main>
  )
}
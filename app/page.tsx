'use client'
import { useAssistant } from '@ai-sdk/react'
import { FormEvent } from 'react'

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    submitMessage,
    status
  } = useAssistant({ api: '/api/assistant' })

  return (
    <main className="main">
      <div className="messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`message ${m.role === 'user' ? 'user' : 'assistant'}`}
          >
            {m.parts
              ? m.parts.map((p) => p.text).join('')
              : m.content}
          </div>
        ))}
      </div>

      <form
        className="inputContainer"
        onSubmit={(e: FormEvent) => {
          e.preventDefault()
          submitMessage(e)
        }}
      >
        <input
          placeholder="Hvilken slags musik ka' du li'?"
          value={input}
          onChange={handleInputChange}
          disabled={status !== 'ready'}
        />
        <button type="submit" disabled={status !== 'ready'}>
          SEND
        </button>
      </form>
    </main>
  )
}
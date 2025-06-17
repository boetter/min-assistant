'use client'
import { useAssistant } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown'

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
            <ReactMarkdown>{m.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      <form className="inputContainer" onSubmit={submitMessage}>
        <input
          type="text"
          placeholder="Hvilken slags musik ka' du li'?"
          value={input}
          onChange={handleInputChange}
          disabled={status !== 'awaiting_message'}
        />
        <button type="submit" disabled={status !== 'awaiting_message'}>
          SEND
        </button>
      </form>
    </main>
)
}
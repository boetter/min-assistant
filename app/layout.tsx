// app/layout.tsx
export const metadata = {
  title: 'Min Assistant',
  description: 'Chat med min Playground-assistant'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  )
}
// app/layout.tsx
import './globals.css';

export const metadata = { /* … */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Exa Demo',
  description: 'Created with Exa AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  metadataBase: new URL('https://landing.seeklon.com'),
  title: { default: 'Seeklon', template: '%s | Seeklon' },
  description: 'Simplify hiring for SMBs with our ATS powered by AI screening.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = headersList.get('x-next-intl-locale') || 'fr'

  return (
    <html lang={locale}>
      <body
        className={`
          font-sans
          bg-background
          text-text-main
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  )
}

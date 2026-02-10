import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://landing.seeklon.com'),
  title: { default: 'Seeklon', template: '%s | Seeklon' },
  description: 'Simplify hiring for SMBs with our ATS powered by AI screening.',
  icons: { icon: '/logo.png', shortcut: '/logo.png', apple: '/logo.png' },
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
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
        />
      </head>
      <body
        className={`
          ${jakarta.variable}
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

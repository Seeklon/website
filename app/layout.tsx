import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

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
      <body
        className={`
          ${dmSans.variable}
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

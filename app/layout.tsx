import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  metadataBase: new URL('https://landing.seeklon.com'),
  title: { default: 'Seeklon', template: '%s | Seeklon' },
  description: 'Seeklon aide les PME à rédiger leurs offres, trier les candidatures et préparer les entretiens.',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
      </head>
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

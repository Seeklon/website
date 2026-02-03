import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Demandez une démo gratuite Seeklon',
  description: 'Contactez l\'équipe Seeklon à Paris pour une démonstration gratuite de notre ATS intelligent. Accès Bêta gratuit, réponse sous 24h.',
  keywords: ['contact Seeklon', 'démo ATS', 'essai gratuit recrutement', 'logiciel recrutement Paris'],
  openGraph: {
    title: 'Contact - Demandez une démo gratuite Seeklon',
    description: 'Contactez l\'équipe Seeklon pour une démonstration gratuite. Accès Bêta gratuit, réponse sous 24h.',
    url: 'https://landing.seeklon.com/contact',
    siteName: 'Seeklon',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Seeklon - Démo gratuite',
    description: 'Demandez une démonstration gratuite de l\'ATS Seeklon.',
  },
  alternates: {
    canonical: 'https://landing.seeklon.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

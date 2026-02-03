import Pricing from '@/components/Pricing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs Seeklon - Plans et abonnements ATS pour PME',
  description: 'Tarifs Seeklon : accès Bêta gratuit, Standard à 49€/mois avec offres illimitées et multidiffusion, ou sur-mesure Entreprise. Sans engagement, aucune carte bancaire requise.',
  keywords: ['tarif ATS', 'prix logiciel recrutement', 'ATS gratuit', 'logiciel recrutement PME prix', 'Seeklon tarif'],
  openGraph: {
    title: 'Tarifs Seeklon - Plans ATS pour PME',
    description: 'Bêta gratuit, Standard 49€/mois, ou Entreprise sur-mesure. Sans engagement.',
    url: 'https://landing.seeklon.com/pricing',
    siteName: 'Seeklon',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs Seeklon - ATS pour PME',
    description: 'Bêta gratuit, Standard 49€/mois ou Entreprise. Découvrez nos offres.',
  },
  alternates: {
    canonical: 'https://landing.seeklon.com/pricing',
  },
}

export default function PricingPage() {
  return (
    <>
      <div className="pt-20">
          <Pricing />
      </div>
    </>
  )
}

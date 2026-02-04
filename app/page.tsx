import Hero from '@/components/Hero'
import WhyAtsIA from '@/components/WhyAtsIA'
import TrustBar from '@/components/TrustBar'
import Features from '@/components/Features'
import SocialProof from '@/components/SocialProof'
// import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Newsletter from '@/components/Newsletter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ATS IA pour PME | Seeklon – Recrutez plus vite',
  description: 'Triez vos candidatures en quelques secondes grâce à Seeklon, l\'ATS IA pour PME. Scoring, multidiffusion, guides d\'entretien. Demandez une démo gratuite.',
  keywords: ['ATS', 'recrutement', 'IA', 'tri CV', 'PME', 'candidatures', 'RH', 'logiciel recrutement', 'scoring candidat', 'multidiffusion jobboards', 'analyse sémantique CV', 'guide entretien IA', 'recrutement PME France', 'ATS IA'],
  openGraph: {
    title: 'ATS IA pour PME | Seeklon – Recrutez plus vite',
    description: 'Triez vos candidatures en quelques secondes grâce à Seeklon, l\'ATS IA pour PME. Scoring, multidiffusion, guides d\'entretien.',
    url: 'https://landing.seeklon.com',
    siteName: 'Seeklon',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATS IA pour PME | Seeklon – Recrutez plus vite',
    description: 'Triez vos candidatures en quelques secondes grâce à Seeklon, l\'ATS IA pour PME. Scoring, multidiffusion, guides d\'entretien.',
  },
  alternates: {
    canonical: 'https://landing.seeklon.com',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <WhyAtsIA />
      <Features />
      <TrustBar />
      <SocialProof />
      {/* <CTA /> */}
      <Newsletter />
    </>
  )
}

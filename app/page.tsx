import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Features from '@/components/Features'
import SocialProof from '@/components/SocialProof'
// import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Newsletter from '@/components/Newsletter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seeklon - ATS intelligent avec tri de CV par IA pour PME',
  description: 'Recrutez plus vite avec Seeklon, l\'ATS français boosté à l\'IA qui trie vos candidatures par analyse sémantique. Scoring intelligent, multidiffusion sur tous les jobboards et guides d\'entretien générés automatiquement.',
  keywords: ['ATS', 'recrutement', 'IA', 'tri CV', 'PME', 'candidatures', 'RH', 'logiciel recrutement', 'scoring candidat', 'multidiffusion jobboards', 'analyse sémantique CV', 'guide entretien IA', 'recrutement PME France'],
  openGraph: {
    title: 'Seeklon - ATS intelligent avec tri de CV par IA pour PME',
    description: 'L\'ATS français qui trie vos candidatures par IA. Scoring intelligent, multidiffusion sur tous les jobboards et guides d\'entretien générés.',
    url: 'https://landing.seeklon.com',
    siteName: 'Seeklon',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seeklon - ATS intelligent avec tri de CV par IA pour PME',
    description: 'L\'ATS français qui trie vos candidatures par IA. Scoring, multidiffusion et guides d\'entretien.',
  },
  alternates: {
    canonical: 'https://landing.seeklon.com',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <TrustBar />

      <SocialProof />
      {/* <CTA /> */}
      <Newsletter />
    </>
  )
}

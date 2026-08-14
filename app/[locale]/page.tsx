import { setRequestLocale, getTranslations } from 'next-intl/server'
import Hero from '@/components/Hero'
import WhyAtsIA from '@/components/WhyAtsIA'
import TrustBar from '@/components/TrustBar'
import Features from '@/components/Features'
import SocialProof from '@/components/SocialProof'
import Newsletter from '@/components/Newsletter'
import FAQ from '@/components/FAQ'
import { buildPageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return buildPageMetadata({
    title: t('homeTitle'),
    description: t('homeDescription'),
    locale,
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <WhyAtsIA />
      <Features />
      <TrustBar />
      <SocialProof />
      <FAQ />
      <Newsletter />
    </>
  )
}

import Pricing from '@/components/Pricing'
import SocialProof from '@/components/SocialProof'
import FAQ from '@/components/FAQ'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return buildPageMetadata({
    title: t('pricingTitle'),
    description: t('pricingDescription'),
    locale,
    path: '/pricing',
  })
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Pricing />
      <SocialProof />
      <FAQ namespace="PricingFAQ" />
    </>
  )
}

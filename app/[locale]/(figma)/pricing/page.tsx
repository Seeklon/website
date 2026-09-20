import { setRequestLocale, getTranslations } from 'next-intl/server'
import PricingHero from '@/components/pricing/PricingHero'
import BetaPlan from '@/components/pricing/BetaPlan'
import PackCards from '@/components/pricing/PackCards'
import PricingFaq from '@/components/pricing/PricingFaq'
import ClosingCta from '@/components/home/ClosingCta'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('pricingTitle'),
    description: t('pricingDescription'),
  }
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PricingHero />
      <BetaPlan />
      <PackCards />
      <PricingFaq />
      <ClosingCta namespace="Pricing.closing" />
    </>
  )
}

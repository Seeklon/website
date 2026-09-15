import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Pricing' })
  const path = locale === 'fr' ? '/pricing' : `/${locale}/pricing`

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: path, languages: { fr: '/pricing', en: '/en/pricing', 'x-default': '/pricing' } },
  }
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <><Pricing /><CTA /></>
}

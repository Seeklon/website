import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CTA from '@/components/CTA'
import Features from '@/components/Features'
import Hero from '@/components/Hero'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: {
      canonical: locale === 'fr' ? '/' : `/${locale}`,
      languages: { fr: '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: ['/marketing/app-screens/13-recruitment-pipeline-1920x1080.png'],
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <Features />
      <CTA />
    </>
  )
}

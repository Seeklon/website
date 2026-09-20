import { setRequestLocale, getTranslations } from 'next-intl/server'
import HomeHero from '@/components/home/HomeHero'
import ProblemStatement from '@/components/home/ProblemStatement'
import Journey from '@/components/home/Journey'
import InterviewExcerpt from '@/components/home/InterviewExcerpt'
import Testimonials from '@/components/home/Testimonials'
import ClosingCta from '@/components/home/ClosingCta'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HomeHero />
      <ProblemStatement />
      <Journey />
      <InterviewExcerpt />
      <Testimonials />
      <ClosingCta />
    </>
  )
}

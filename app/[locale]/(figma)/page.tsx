import { setRequestLocale, getTranslations } from 'next-intl/server'
import { pageMetadata } from '@/lib/metadata'
import { SITE_URL } from '@/lib/site'
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
  return pageMetadata({
    locale,
    path: '',
    title: t('homeTitle'),
    description: t('homeDescription'),
    image: 'home',
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Seeklon',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    email: 'contact@seeklon.com',
    sameAs: ['https://www.linkedin.com/company/seeklon/'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />
      <ProblemStatement />
      <Journey />
      <InterviewExcerpt />
      <Testimonials />
      <ClosingCta />
    </>
  )
}

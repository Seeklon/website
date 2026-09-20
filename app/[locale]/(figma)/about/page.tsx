import { setRequestLocale, getTranslations } from 'next-intl/server'
import { pageMetadata } from '@/lib/metadata'
import { useTranslations } from 'next-intl'
import AboutPillars from '@/components/about/AboutPillars'
import AboutVision from '@/components/about/AboutVision'
import AboutHackathon from '@/components/about/AboutHackathon'
import AboutTeam from '@/components/about/AboutTeam'
import ClosingCta from '@/components/home/ClosingCta'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return pageMetadata({
    locale,
    path: '/about',
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    image: 'about',
  })
}

function AboutHero() {
  const t = useTranslations('About.hero')
  return (
    <section className="px-6 pt-[136px] md:pt-[180px] md:text-center">
      <h1 className="text-balance text-[clamp(2.25rem,0.9rem+5.9vw,6rem)] font-medium leading-[1.02] tracking-[-0.045em] md:leading-[0.98] md:tracking-[-0.05em]">
        <span className="block">{t('line1')}</span>
        <span className="block font-genoid text-[0.85em] font-bold tracking-[0.03em] text-azure">{t('line2')}</span>
      </h1>
      <p className="mt-8 max-w-[44rem] text-base leading-[1.6] text-ink-soft md:mx-auto md:mt-9 md:text-balance md:text-[19px]">
        {t('body')}
      </p>
    </section>
  )
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <AboutHero />
      <AboutPillars />
      <AboutVision />
      <AboutHackathon />
      <AboutTeam />
      <ClosingCta namespace="About.closing" />
    </>
  )
}

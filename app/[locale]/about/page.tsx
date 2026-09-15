import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CTA from '@/components/CTA'
import { Link } from '@/i18n/navigation'
import { ArrowUpRight } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'About' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: locale === 'fr' ? '/about' : `/${locale}/about`,
      languages: { fr: '/about', en: '/en/about', 'x-default': '/about' },
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('About')

  const principles = ['clarity', 'control', 'team'] as const

  return (
    <div className="about-readable bg-paper">
      <section className="secondary-opening">
        <div className="secondary-container">
          <h1>{t('titleLead')}<span>{t('titleAccent')}</span></h1>
          <div className="secondary-intro"><p>{t('intro')}</p><Link href="/#fonctionnalites" className="button-on-dark">{t('seeProduct')}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </div>
      </section>
      <section className="secondary-container about-narrative">
        <div className="about-story-intro"><h2>{t('storyTitle')}</h2><p>{t('storyBody')}</p></div>
        <figure className="about-proof">
          <Image src="/marketing/app-screens/17-interview-guide-1920x1080.png" alt={t('productAlt')} width={1920} height={1080} unoptimized />
          <figcaption><span>{t('screenNote')}</span><a href="/marketing/app-screens/17-interview-guide-1920x1080.png" target="_blank" rel="noreferrer">{t('openScreen')}<ArrowUpRight size={18} aria-hidden="true" /></a></figcaption>
        </figure>
        <div className="about-principles">
          {principles.map((principle) => (
            <article key={principle}>
              <h3>{t(`${principle}Title`)}</h3>
              <p>{t(`${principle}Text`)}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </div>
  )
}

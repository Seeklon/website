import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CTA from '@/components/CTA'

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
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12 md:items-end">
          <h1 className="display-title max-w-[11ch] md:col-span-7">{t('title')}</h1>
          <p className="max-w-xl text-xl leading-9 text-ink-muted md:col-span-5">{t('intro')}</p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="about-bento mx-auto max-w-[1440px]">
          <article className="about-story">
            <h2 className="section-title max-w-[11ch]">{t('storyTitle')}</h2>
            <p>{t('storyBody')}</p>
          </article>
          <div className="about-product-image">
            <Image
              src="/marketing/app-screens/14-candidate-profile-1920x1080.png"
              alt={t('productAlt')}
              fill
              sizes="(max-width: 767px) 92vw, 55vw"
              className="object-cover object-left-top"
            />
          </div>
          {principles.map((principle) => (
            <article key={principle} className="about-principle">
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

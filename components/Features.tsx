"use client"

import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import offerScreen from '@/assets/plates/offer-screen.png'

type Feature = {
  key: 'write' | 'sort' | 'prepare'
  image: string | typeof offerScreen
  alt: string
}

export default function Features() {
  const t = useTranslations('Features')
  const features: Feature[] = [
    { key: 'write', image: offerScreen, alt: t('writeAlt') },
    { key: 'sort', image: '/marketing/app-screens/10-applications-table-1920x1080.png', alt: t('sortAlt') },
    { key: 'prepare', image: '/marketing/app-screens/17-interview-guide-1920x1080.png', alt: t('prepareAlt') },
  ]

  return (
    <section id="fonctionnalites" className="section-shell bg-paper py-20 md:py-32" aria-labelledby="features-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="max-w-4xl">
          <h2 id="features-title" className="section-title">{t('title')}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">{t('subtitle')}</p>
        </div>

        <div className="feature-bento mt-14">
          {features.map((feature, index) => (
            <article key={feature.key} className={`feature-panel feature-panel-${feature.key}`}>
              <div className="feature-text">
                <div className="feature-index" aria-hidden="true">0{index + 1}</div>
                <h3>{t(`${feature.key}Title`)}</h3>
                <p>{t(`${feature.key}Description`)}</p>
                <ul>
                  {[1, 2, 3].map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      {t(`${feature.key}Point${item}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-image-wrap">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={1920}
                  height={1080}
                  sizes={feature.key === 'prepare' ? '(max-width: 767px) 92vw, 56vw' : '(max-width: 767px) 92vw, 44vw'}
                  className="h-full w-full object-cover object-left-top"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="decision-workbench mt-14">
          <div className="decision-copy">
            <h2 className="section-title max-w-[12ch]">{t('transparencyTitle')}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">{t('transparencyDescription')}</p>
            <Link href="/contact" className="button-on-dark group mt-8">
              {t('transparencyCta')}
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="decision-evidence">
            <Image
              src="/marketing/app-screens/15-candidate-detail-with-cv-1920x1080.png"
              alt={t('transparencyAlt')}
              width={1920}
              height={1080}
              sizes="(max-width: 767px) 92vw, 52vw"
              className="h-full w-full object-cover object-left-top"
            />
            <div className="decision-legend">
              <span>{t('criterionJob')}</span>
              <span>{t('criterionCareer')}</span>
              <span>{t('criterionCheck')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

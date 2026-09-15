"use client"

import Image from 'next/image'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import pipelineScreen from '@/assets/plates/pipeline-screen.png'

export default function Hero() {
  const t = useTranslations('Hero')
  const actions = [t('actionWrite'), t('actionSort'), t('actionPrepare')]

  return (
    <section className="hero-stage" aria-labelledby="hero-title">
      <div className="hero-copy-panel">
        <div className="hero-copy-inner">
          <h1 id="hero-title" className="display-title max-w-[9ch]">{t('title')}</h1>
          <p className="mt-7 max-w-[34rem] text-lg leading-8 text-ink-muted md:text-xl">{t('subtitle')}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="button-primary group">
              {t('requestDemo')}
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#fonctionnalites" className="button-quiet group">
              {t('seeFeatures')}
              <ArrowDown size={17} aria-hidden="true" className="transition-transform group-hover:translate-y-1" />
            </a>
          </div>
          <ol className="mt-14 grid grid-cols-3 border-t border-ink/15 pt-4" aria-label={t('workflowLabel')}>
            {actions.map((action, index) => (
              <li key={action} className="pr-3 text-sm font-semibold text-ink-muted">
                <span className="mr-2 text-electric">0{index + 1}</span>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="hero-product-panel" aria-label={t('productAreaLabel')}>
        <div className="hero-screen-frame">
          <Image
            src={pipelineScreen}
            alt={t('pipelineAlt')}
            width={1920}
            height={1080}
            priority
            sizes="(max-width: 767px) 94vw, 64vw"
            className="h-full w-full object-cover object-left-top"
          />
        </div>
        <div className="hero-note hero-note-top">{t('noteFollow')}</div>
        <div className="hero-note hero-note-bottom">{t('noteDecide')}</div>
        <div className="hero-data-label">{t('demoData')}</div>
      </div>
    </section>
  )
}

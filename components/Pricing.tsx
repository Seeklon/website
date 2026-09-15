"use client"

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const packKeys = ['brise', 'bourrasque', 'rafale', 'tornade', 'cyclone'] as const

export default function Pricing() {
  const t = useTranslations('Pricing')

  return (
    <section className="pricing-readable bg-paper px-5 py-20 md:px-8 md:py-28" aria-labelledby="pricing-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 border-b border-ink/15 pb-12 md:grid-cols-12 md:items-end">
          <h1 id="pricing-title" className="display-title max-w-[10ch] md:col-span-7">{t('title')}</h1>
          <p className="max-w-xl text-lg leading-8 text-ink-muted md:col-span-5">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {packKeys.map((pack, index) => (
            <article key={pack} className={`pricing-pack ${index < 2 ? 'md:col-span-6' : 'md:col-span-4'}`}>
              <span className="text-sm font-extrabold text-electric" aria-hidden="true">0{index + 1}</span>
              <h2 className="mt-8">{t(`${pack}Name`)}</h2>
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.12em] text-electric">{t('configurationLabel')}</p>
              <p className="mt-4 text-lg leading-8 text-ink-muted">{t('configurationText')}</p>
              <dl className="mt-8 grid gap-3 border-t border-ink/15 pt-6 text-base font-semibold text-ink-muted">
                <div>{t('parameter1')}</div>
                <div>{t('parameter2')}</div>
                <div>{t('parameter3')}</div>
              </dl>
              <Link href="/contact" className="button-quiet group mt-8">
                {t('cta')}
                <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink/15 pt-7 text-base text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>{t('customNote')}</p>
          <Link href="/contact" className="font-bold text-ink underline">{t('talkToUs')}</Link>
        </div>
      </div>
    </section>
  )
}

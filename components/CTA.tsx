"use client"

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function CTA() {
  const t = useTranslations('CTA')

  return (
    <section className="bg-paper px-5 pb-8 md:px-8 md:pb-12">
      <div className="cta-panel mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <h2 className="section-title max-w-[11ch]">{t('title')}</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white">{t('subtitle')}</p>
        </div>
        <Link href="/contact" className="button-on-dark group shrink-0">
          {t('cta')}
          <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}

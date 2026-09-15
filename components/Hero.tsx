"use client"

import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Hero() {
  const t = useTranslations('Hero')
  return (
    <section className="recruit-opening" aria-labelledby="hero-title">
      <div className="opening-grid">
        <h1 id="hero-title">{t('title')}<span>{t('better')}</span></h1>
        <div className="opening-context">
          <p>{t('subtitle')}</p>
          <Link href="/contact" className="button-primary">{t('requestDemo')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          <figure className="opening-proof">
            <Image src="/marketing/app-screens/09-offer-detail-1920x1080.png" alt={t('openingAlt')} width={1920} height={1080} unoptimized priority />
            <figcaption>{t('openingCaption')}</figcaption>
          </figure>
        </div>
      </div>
      <a className="opening-invitation" href="#fonctionnalites"><span>{t('openingLine')}</span><ArrowDown size={22} aria-hidden="true" /></a>
      <div className="opening-route" aria-label={t('workflowLabel')}>
        {[t('actionWrite'), t('actionSort'), t('actionPrepare')].map((label, index) => (
          <a href={`#recruit-step-${index}`} key={label}><span className="route-station" aria-hidden="true" />{label}<small>0{index + 1}</small></a>
        ))}
      </div>
    </section>
  )
}

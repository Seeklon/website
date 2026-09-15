"use client"

import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const packKeys = ['brise', 'bourrasque', 'rafale', 'tornade', 'cyclone'] as const

export default function Pricing() {
  const t = useTranslations('Pricing')

  return (
    <div className="pricing-readable">
      <section className="secondary-opening" aria-labelledby="pricing-title">
        <div className="secondary-container">
          <h1 id="pricing-title">{t('titleLead')}<span>{t('titleAccent')}</span></h1>
          <div className="secondary-intro"><p>{t('subtitle')}</p><Link href="/contact" className="button-on-dark">{t('talkToUs')}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          <ul className="pack-name-strip" aria-label={t('packsLabel')}>{packKeys.map(pack => <li key={pack}><a href={`#pack-${pack}`}>{t(`${pack}Name`)}</a></li>)}</ul>
        </div>
      </section>
      <section className="secondary-container pack-exploration" aria-labelledby="packs-title">
        <div className="pack-context">
          <h2 id="packs-title">{t('exploreTitle')}</h2>
          <p className="pack-coming-soon">{t('comingSoon')}</p>
          <p>{t('configurationText')}</p>
          <ul className="pack-criteria"><li>{t('parameter1')}</li><li>{t('parameter2')}</li><li>{t('parameter3')}</li></ul>
          <p className="secondary-note">{t('customNote')}</p>
        </div>
        <div className="pack-directory">{packKeys.map(pack => <article id={`pack-${pack}`} key={pack}>
          <h3>{t(`${pack}Name`)}</h3>
          <Link href="/contact">{t('cta')}<ArrowUpRight size={20} aria-hidden="true" /></Link>
        </article>)}</div>
      </section>
    </div>
  )
}

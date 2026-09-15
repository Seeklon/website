"use client"

import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const previews = [
  { key: 'write', image: '/marketing/app-screens/09-offer-detail-1920x1080.png' },
  { key: 'sort', image: '/marketing/app-screens/10-applications-table-1920x1080.png' },
  { key: 'prepare', image: '/marketing/app-screens/17-interview-guide-1920x1080.png' },
] as const

export default function Hero() {
  const t = useTranslations('Hero')
  const [active, setActive] = useState(0)
  return (
    <section className="recruit-opening" aria-labelledby="hero-title">
      <div className="opening-heading">
        <div><h1 id="hero-title">{t('title')}</h1><p className="opening-promise">{t('better')}</p></div>
        <div className="opening-context">
          <p>{t('subtitle')}</p>
          <Link href="/contact" className="button-primary">{t('requestDemo')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="opening-stage">
        <div className="opening-stage-inner">
          <div className="opening-choices" role="group" aria-label={t('workflowLabel')} data-active={active}>
            {previews.map((preview, index) => (
              <button key={preview.key} type="button" aria-pressed={active === index} aria-controls="opening-preview" onClick={() => setActive(index)}>
                <span className="opening-choice-title">{t(`${preview.key}Action`)}<ArrowUpRight size={22} aria-hidden="true" /></span>
                <span className="opening-choice-question">{t(`${preview.key}Question`)}</span>
              </button>
            ))}
            <span className="opening-choice-cursor" aria-hidden="true" />
          </div>
          <figure className="opening-proof">
            <div className="opening-preview" id="opening-preview">
              {previews.map((preview, index) => (
                <div className="opening-preview-frame" data-visible={active === index} aria-hidden={active !== index} key={preview.key}>
                  <Image src={preview.image} alt={t(`${preview.key}Alt`)} width={1920} height={1080} unoptimized priority={index === 0} loading={index === 0 ? undefined : 'eager'} />
                </div>
              ))}
            </div>
            <figcaption><span>{t('openingCaption')}</span><a href={previews[active].image} target="_blank" rel="noreferrer">{t('openScreen')}<ArrowUpRight size={15} aria-hidden="true" /></a></figcaption>
          </figure>
        </div>
      </div>
      <a className="opening-invitation" href="#fonctionnalites"><span>{t('openingLine')}</span><ArrowDown size={22} aria-hidden="true" /></a>
    </section>
  )
}

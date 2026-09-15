"use client"

import { ArrowDown, ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const backdropScreens = [
  '/marketing/app-screens/10-applications-table-1920x1080.png',
  '/marketing/app-screens/17-interview-guide-1920x1080.png',
  '/marketing/app-screens/09-offer-detail-1920x1080.png',
  '/marketing/app-screens/13-recruitment-pipeline-1920x1080.png',
]
const productScreen = '/marketing/app-screens/09-offer-detail-1920x1080.png'

export default function Hero() {
  const t = useTranslations('Hero')
  const [take, setTake] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const opening = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = opening.current
    if (!element) return
    let intersecting = true
    const update = () => setVisible(intersecting && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting
      update()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])

  return (
    <section ref={opening} className="recruit-opening" data-paused={paused || !visible} aria-labelledby="hero-title">
      <div className="opening-controls">
        <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}{t('pauseMotion')}</button>
        <button className="opening-replay" type="button" onClick={() => setTake(value => value + 1)}><RotateCcw size={16} aria-hidden="true" />{t('replay')}</button>
      </div>
      <div className="opening-scene" key={take}>
        <div className="opening-current" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => <i key={index} style={{ left: `${8 + index * 12}%`, top: `${90 + (index % 3) * 145}px`, animationDelay: `${index * -1.7}s` }} />)}
        </div>
        <div className="opening-backdrop" aria-hidden="true">
          {backdropScreens.map((src, index) => (
            <div className={`opening-depth-screen opening-depth-screen-${index}`} key={src}>
              <div className="opening-float"><Image src={src} alt="" width={1920} height={1080} unoptimized /></div>
            </div>
          ))}
        </div>
        <div className="opening-heading">
          <h1 id="hero-title" aria-label={t('title')}>
            <span className="opening-title-lead" aria-hidden="true">{t('titleLead')}</span>
            <span className="opening-title-motion" aria-hidden="true">
              {Array.from(t('titleEnd')).map((letter, index) => <span key={index} style={{ animationDelay: `${120 + index * 35}ms` }}>{letter === ' ' ? '\u00a0' : letter}</span>)}
            </span>
          </h1>
          <p className="opening-promise">{t('better')}</p>
          <p className="opening-description">{t('subtitle')}</p>
          <Link href="/contact" className="button-on-dark">{t('requestDemo')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <figure className="opening-proof">
          <a className="opening-preview" href={productScreen} target="_blank" rel="noreferrer" aria-label={t('openScreen')}>
            <Image src={productScreen} alt={t('writeAlt')} width={1920} height={1080} unoptimized priority />
          </a>
          <figcaption><span>{t('openingCaption')}</span><a href={productScreen} target="_blank" rel="noreferrer">{t('openScreen')}<ArrowUpRight size={15} aria-hidden="true" /></a></figcaption>
        </figure>
      </div>
      <div className="opening-footer">
        <a className="opening-invitation" href="#fonctionnalites"><span>{t('openingLine')}</span><ArrowDown size={20} aria-hidden="true" /></a>
      </div>
    </section>
  )
}

"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const chapters = [
  { key: 'write', image: '/marketing/app-screens/06-create-offer-form-1920x1080.png' },
  { key: 'sort', image: '/marketing/app-screens/10-applications-table-1920x1080.png' },
  { key: 'prepare', image: '/marketing/app-screens/17-interview-guide-1920x1080.png' },
] as const

export default function Features() {
  const t = useTranslations('Features')
  const root = useRef<HTMLDivElement>(null)
  const interview = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [questionEntered, setQuestionEntered] = useState(false)
  const [motionReady, setMotionReady] = useState(false)

  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>('[data-chapter]')
    if (!nodes || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter))
      }
    }, { rootMargin: '-30% 0px -40% 0px', threshold: 0 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const target = interview.current
    if (!target || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setMotionReady(true)
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setQuestionEntered(true)
        observer.disconnect()
      }
    }, { threshold: 0, rootMargin: '0px 0px -22% 0px' })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="fonctionnalites" className="recruit-story" aria-labelledby="story-title">
      <div className="story-prologue">
        <h2 id="story-title">{t('title')}</h2>
        <div><p>{t('subtitle')}</p><p className="prologue-answer">{t('promise')}</p></div>
      </div>
      <div className="recruit-sequence" ref={root}>
        <div className="sequence-narrative">
          {chapters.map((chapter, index) => (
            <article id={`recruit-step-${index}`} data-chapter={index} className="sequence-chapter" key={chapter.key}>
              <h3><span className="chapter-number" aria-hidden="true">0{index + 1} /</span>{t(`${chapter.key}Title`)}</h3>
              <p>{t(`${chapter.key}Description`)}</p>
              <p className="chapter-outcome"><Check size={18} aria-hidden="true" />{t(`${chapter.key}Outcome`)}</p>
              <figure className="sequence-mobile-screen">
                <div className="sequence-image">
                  <Image src={chapter.image} alt={t(`${chapter.key}Alt`)} width={1920} height={1080} unoptimized />
                  {chapter.key === 'prepare' && <svg className="guide-focus" viewBox="0 0 1920 1080" aria-hidden="true"><rect x="330" y="618" width="900" height="42" rx="8" pathLength="1" /></svg>}
                </div>
                <figcaption><span>{t(`${chapter.key}Step`)}</span><a href={chapter.image} target="_blank" rel="noreferrer">{t('openScreen')}<ArrowUpRight size={15} aria-hidden="true" /></a></figcaption>
              </figure>
            </article>
          ))}
        </div>
        <div className="sequence-stage">
          <div className="sequence-sticky">
            <nav className="sequence-tabs" data-active={active} aria-label={t('journeyLabel')}>
              {chapters.map((chapter, index) => <a href={`#recruit-step-${index}`} key={chapter.key} aria-current={active === index ? 'step' : undefined}><span>0{index + 1}</span>{t(`${chapter.key}Step`)}</a>)}
              <span className="sequence-cursor" aria-hidden="true" />
            </nav>
            <div className="sequence-display" data-active={active}>
              {chapters.map((chapter, index) => (
                <div key={chapter.key} className="sequence-frame" data-visible={active === index} aria-hidden={active !== index}>
                  <Image src={chapter.image} alt={t(`${chapter.key}Alt`)} width={1920} height={1080} unoptimized loading="eager" />
                  {chapter.key === 'prepare' && <svg className="guide-focus" viewBox="0 0 1920 1080" aria-hidden="true"><rect x="330" y="618" width="900" height="42" rx="8" pathLength="1" /></svg>}
                </div>
              ))}
            </div>
            <div className="sequence-caption"><span>{t('screenNote')}</span><a href={chapters[active].image} target="_blank" rel="noreferrer">{t('openScreen')}<ArrowUpRight size={15} aria-hidden="true" /></a></div>
            <div className="sequence-result" aria-hidden="true"><span>{t('resultLabel')}</span><p key={active}>{t(`${chapters[active].key}Outcome`)}</p></div>
          </div>
        </div>
      </div>
      <figure className="interview-moment" ref={interview} data-motion-ready={motionReady} data-entered={questionEntered}>
        <div className="interview-panel">
          <blockquote>{t('interviewQuestion')}</blockquote>
          <p className="interview-source">{t('interviewSource')}</p>
          <p className="interview-meaning">{t('interviewMeaning')}</p>
        </div>
        <div className="interview-panel interview-panel-reveal" aria-hidden="true">
          <p className="interview-quotation">{t('interviewQuestion')}</p>
          <p className="interview-source">{t('interviewSource')}</p>
          <p className="interview-meaning">{t('interviewMeaning')}</p>
        </div>
      </figure>
      <div className="story-resolution">
        <p className="resolution-lead">{t('resolutionLead')}</p>
        <h2>{t('transparencyTitle')}</h2>
        <div className="resolution-bottom"><p>{t('transparencyDescription')}</p><Link href="/contact" className="button-primary">{t('transparencyCta')}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>
  )
}

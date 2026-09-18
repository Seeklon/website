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
  const prologueTitle = useRef<HTMLHeadingElement>(null)
  const sequenceTitle = useRef<HTMLHeadingElement>(null)
  const interview = useRef<HTMLElement>(null)
  const resolutionTitle = useRef<HTMLHeadingElement>(null)
  const activeRef = useRef(0)
  const previousActive = useRef(0)
  const [active, setActive] = useState(0)
  const [prologueEntered, setPrologueEntered] = useState(false)
  const [sequenceEntered, setSequenceEntered] = useState(false)
  const [questionEntered, setQuestionEntered] = useState(false)
  const [resolutionEntered, setResolutionEntered] = useState(false)
  const [motionReady, setMotionReady] = useState(false)

  useEffect(() => {
    const nodes = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? [])
    if (!nodes.length) return

    let frame = 0
    const updateActiveChapter = () => {
      frame = 0
      const display = root.current?.querySelector<HTMLElement>('.sequence-display')
      const readingLine = display?.getBoundingClientRect().top ?? window.innerHeight * 0.24
      const nextActive = nodes.reduce((next, node, index) => {
        const title = node.querySelector<HTMLElement>('h3')
        return title && title.getBoundingClientRect().top <= readingLine + 1 ? index : next
      }, 0)
      if (activeRef.current === nextActive) return
      previousActive.current = activeRef.current
      activeRef.current = nextActive
      setActive(nextActive)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveChapter)
    }

    updateActiveChapter()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const prologueTarget = prologueTitle.current
    const sequenceTarget = sequenceTitle.current
    const interviewTarget = interview.current
    const resolutionTarget = resolutionTitle.current
    if ((!prologueTarget && !sequenceTarget && !interviewTarget && !resolutionTarget) || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setMotionReady(true)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        if (entry.target === prologueTarget) setPrologueEntered(true)
        if (entry.target === sequenceTarget) setSequenceEntered(true)
        if (entry.target === interviewTarget) setQuestionEntered(true)
        if (entry.target === resolutionTarget) setResolutionEntered(true)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0, rootMargin: '0px 0px -22% 0px' })
    if (prologueTarget) observer.observe(prologueTarget)
    if (sequenceTarget) observer.observe(sequenceTarget)
    if (interviewTarget) observer.observe(interviewTarget)
    if (resolutionTarget) observer.observe(resolutionTarget)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="fonctionnalites" className="recruit-story" aria-labelledby="story-title">
      <div className="story-prologue" data-motion-ready={motionReady} data-entered={prologueEntered}>
        <h2 ref={prologueTitle} id="story-title" aria-label={t('title')}>
          {t('title').split(' ').map((word, index) => <span className="story-title-word" aria-hidden="true" style={{ animationDelay: `${index * 65}ms` }} key={`${word}-${index}`}>{word}</span>)}
        </h2>
        <div><p>{t('subtitle')}</p><p className="prologue-answer">{t('promise')}</p></div>
      </div>
      <div className="recruit-sequence" ref={root} data-motion-ready={motionReady} data-entered={sequenceEntered}>
        <div className="sequence-narrative">
          {chapters.map((chapter, index) => (
            <article id={`recruit-step-${index}`} data-chapter={index} data-active={active === index} className="sequence-chapter" key={chapter.key}>
              <h3 ref={index === 0 ? sequenceTitle : undefined}><span className="chapter-marker"><span className="chapter-action">{t(`${chapter.key}Action`)}</span><span className="chapter-number" aria-hidden="true">0{index + 1} / 03</span></span><span className="chapter-title-text">{t(`${chapter.key}Title`)}</span></h3>
              <p>{t(`${chapter.key}Description`)}</p>
              <p className="chapter-outcome"><Check size={18} aria-hidden="true" />{t(`${chapter.key}Outcome`)}</p>
              <figure className="sequence-mobile-screen">
                <div className="sequence-image">
                  <Image src={chapter.image} alt={t(`${chapter.key}Alt`)} width={1920} height={1080} unoptimized />
                  {chapter.key === 'prepare' && <svg className="guide-focus" viewBox="0 0 1920 1080" aria-hidden="true"><rect x="330" y="618" width="900" height="42" rx="8" pathLength="1" /></svg>}
                </div>
                <figcaption><span>{t(`${chapter.key}Step`)}</span><a href={chapter.image} target="_blank" rel="noreferrer" aria-label={`${t('openScreen')} — ${t('newTab')}`}>{t('openScreen')}<ArrowUpRight size={15} aria-hidden="true" /></a></figcaption>
              </figure>
            </article>
          ))}
        </div>
        <div className="sequence-stage">
          <div className="sequence-sticky">
            <div className="sequence-layout">
              <nav className="sequence-tabs" data-active={active} aria-label={t('journeyLabel')}>
                {chapters.map((chapter, index) => <a href={`#recruit-step-${index}`} key={chapter.key} aria-current={active === index ? 'step' : undefined}><span className="sequence-tab-index" aria-hidden="true">0{index + 1}</span><span>{t(`${chapter.key}Action`)}</span></a>)}
                <span className="sequence-cursor" aria-hidden="true" />
              </nav>
              <div className="sequence-visual">
                <div className="sequence-display" data-active={active}>
                  {chapters.map((chapter, index) => (
                    <div key={chapter.key} className="sequence-frame" data-position={index < active ? 'before' : index > active ? 'after' : 'active'} data-transition={index === active || index === previousActive.current} aria-hidden={active !== index}>
                      <Image src={chapter.image} alt={t(`${chapter.key}Alt`)} width={1920} height={1080} unoptimized loading="eager" />
                      {chapter.key === 'prepare' && <svg className="guide-focus" viewBox="0 0 1920 1080" aria-hidden="true"><rect x="330" y="618" width="900" height="42" rx="8" pathLength="1" /></svg>}
                    </div>
                  ))}
                </div>
                <div className="sequence-caption"><span>{t('screenNote')}</span><a href={chapters[active].image} target="_blank" rel="noreferrer" aria-label={`${t('openScreen')} — ${t('newTab')}`}>{t('openScreen')}<ArrowUpRight size={15} aria-hidden="true" /></a></div>
                <div className="sequence-result"><span>{t('resultLabel')}</span><p key={active}>{t(`${chapters[active].key}Outcome`)}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="story-conclusion" data-motion-ready={motionReady} data-entered={resolutionEntered}>
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
          <h2 ref={resolutionTitle}><span>{t('transparencyTitleLead')}</span><span>{t('transparencyTitleEnd')}</span></h2>
          <div className="resolution-bottom"><p>{t('transparencyDescription')}</p><Link href="/contact" className="button-on-dark">{t('transparencyCta')}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </section>
  )
}

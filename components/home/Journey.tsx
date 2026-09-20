'use client'

import { getImageProps, type StaticImageData } from 'next/image'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import Reveal from './Reveal'
import ImageZoom from './ImageZoom'
import offerShot from '@/public/home/capture-offre.png'
import offerCrop from '@/public/home/capture-offre-mobile.png'
import candidatesShot from '@/public/home/capture-candidatures.png'
import candidatesCrop from '@/public/home/capture-candidatures-mobile.png'
import interviewShot from '@/public/home/capture-entretien.png'
import interviewCrop from '@/public/home/capture-entretien-mobile.png'

const STEPS = [
  { key: 'draft', image: offerShot, crop: offerCrop },
  { key: 'sort', image: candidatesShot, crop: candidatesCrop },
  { key: 'prepare', image: interviewShot, crop: interviewCrop },
] as const

// Keep in sync with the `lg` and `pin` screens in tailwind.config.js.
// How much wheel it takes to move one step, and how long the panel rests afterwards, so
// one flick of a trackpad does not run through the whole slide.
const WHEEL_PER_STEP = 90
const WHEEL_REST_MS = 420

const PANEL_QUERY = '(min-width: 1024px)'
const PIN_QUERY = '(min-width: 1024px) and (min-height: 620px)'
const pad = (n: number) => String(n).padStart(2, '0')
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Swipe: phones and tablets scroll the cards natively (snap, next card peeking).
 * Panel: laptops too short to pin show one slide at a time, driven by tabs/buttons.
 * Pinned: the panel sticks while the page scrolls through a runway; progress fills the
 * step bars and switches slides.
 */
type Mode = 'swipe' | 'panel' | 'pinned'

export default function Journey() {
  const t = useTranslations('Home.journey')
  const tClosing = useTranslations('Home.closing')
  const uid = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const runwayRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const overRef = useRef(false)
  const armedRef = useRef(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  // Unknown until the first media query check; rendered like 'swipe' meanwhile.
  const [mode, setMode] = useState<Mode | null>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const lastModeRef = useRef<Mode | null>(null)
  // While a tab click scrolls the pinned runway, ignore the steps it passes on the way.
  const lockRef = useRef<{ step: number; until: number } | null>(null)
  const inViewRef = useRef(false)
  activeRef.current = active

  useEffect(() => {
    const panel = window.matchMedia(PANEL_QUERY)
    const pin = window.matchMedia(PIN_QUERY)
    // The pinned runway made the page scroll to change step, so the background slid by
    // while only the picture was meant to change. Steps are driven by the tabs and the
    // arrows now; `pinned` stays in the file because the runway is what the section falls
    // back to if we ever want scroll-driven steps again.
    const usePinned = false
    const update = () => setMode(usePinned && pin.matches ? 'pinned' : panel.matches ? 'panel' : 'swipe')
    update()
    panel.addEventListener('change', update)
    pin.addEventListener('change', update)
    return () => {
      panel.removeEventListener('change', update)
      pin.removeEventListener('change', update)
    }
  }, [])

  // Remember whether the reader is in this section, to put them back after a layout switch.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Progress (0 → STEPS.length) goes to a CSS variable so the bars follow without
  // re-rendering; React only hears about step changes.
  useEffect(() => {
    const runway = runwayRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!runway || !viewport || !track || !mode) return
    let frame = 0

    const setProgress = (value: number) => runway.style.setProperty('--journey-progress', value.toFixed(4))

    const measure = () => {
      frame = 0
      if (mode === 'pinned') {
        const travel = runway.offsetHeight - window.innerHeight
        const value = (travel > 0 ? Math.min(Math.max(-runway.getBoundingClientRect().top / travel, 0), 1) : 0) * STEPS.length
        setProgress(value)
        const step = Math.min(STEPS.length - 1, Math.floor(value))
        const lock = lockRef.current
        if (lock) {
          if (step !== lock.step && performance.now() < lock.until) return
          lockRef.current = null
        }
        // A little dead zone around each inner boundary, so a scroll that stops there can't
        // flicker (not at the ends: a fast scroll past the runway must land on the last step).
        const boundary = Math.round(value)
        const nearInnerBoundary = boundary > 0 && boundary < STEPS.length && Math.abs(value - boundary) < 0.06
        if (step !== activeRef.current && nearInnerBoundary) return
        setActive(step)
      } else if (mode === 'swipe') {
        const pitch = slidePitch(track)
        const position = pitch ? viewport.scrollLeft / pitch : 0
        setProgress(position + 1)
        setActive(Math.min(STEPS.length - 1, Math.max(0, Math.round(position))))
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    // After a layout switch (rotation, resize), bring the reader back to the same step.
    const switched = lastModeRef.current !== null && lastModeRef.current !== mode
    lastModeRef.current = mode
    const step = activeRef.current
    if (mode === 'swipe') viewport.scrollLeft = step * slidePitch(track)
    if (switched && inViewRef.current) {
      if (mode === 'pinned') {
        const travel = runway.offsetHeight - window.innerHeight
        const top = runway.getBoundingClientRect().top + window.scrollY + ((step + 0.1) / STEPS.length) * travel
        window.scrollTo({ top, behavior: 'auto' })
      } else {
        sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
    }
    if (mode === 'panel') setProgress(step + 1)
    measure()

    const scroller: HTMLElement | Window = mode === 'swipe' ? viewport : window
    if (mode !== 'panel') scroller.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [mode])

  // Panel mode has no scroll to follow: the bars simply fill up to the current step.
  useEffect(() => {
    if (mode === 'panel') runwayRef.current?.style.setProperty('--journey-progress', String(active + 1))
  }, [mode, active])

  // First time the cards come into view on a phone, nudge them to show they swipe.
  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (mode !== 'swipe' || !viewport || !track || reducedMotion()) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        if (viewport.scrollLeft > 0) return
        track.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-28px)' }, { transform: 'translateX(0)' }],
          { duration: 900, delay: 250, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        )
      },
      { threshold: 0.6 },
    )
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [mode])

  const goTo = (index: number) => {
    const target = Math.min(Math.max(index, 0), STEPS.length - 1)
    const behavior = reducedMotion() ? 'auto' : 'smooth'
    const runway = runwayRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!runway || !viewport || !track) return
    if (mode === 'pinned') {
      lockRef.current = { step: target, until: performance.now() + 1500 }
      setActive(target)
      const travel = runway.offsetHeight - window.innerHeight
      const top = runway.getBoundingClientRect().top + window.scrollY + ((target + 0.1) / STEPS.length) * travel
      window.scrollTo({ top, behavior })
    } else if (mode === 'panel') {
      setActive(target)
    } else {
      viewport.scrollTo({ left: target * slidePitch(track), behavior })
    }
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = STEPS.length - 1
    const next =
      event.key === 'ArrowRight' ? Math.min(index + 1, last)
      : event.key === 'ArrowLeft' ? Math.max(index - 1, 0)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (next === null) return
    event.preventDefault()
    tabRefs.current[next]?.focus()
    goTo(next)
  }

  // The wheel changes step only while the pointer rests on the panel, and only while
  // there is a step left in that direction: everywhere else, and at either end, the page
  // scrolls as usual. Arriving at the section never traps the reader.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || mode !== 'panel') return

    // Hovering has to outlive a render: a step change re-runs this effect, and a local
    // flag would come back false — the next turn of the wheel then scrolled the page.
    //
    // And hovering is not enough. While the page scrolls, the panel slides under a
    // motionless cursor; taking the wheel then would stop the page mid-gesture, which is
    // exactly what it must never do. The panel only arms itself when the pointer actually
    // moves over it, and any scroll disarms it again.
    let travelled = 0
    let restUntil = 0

    const enter = () => {
      overRef.current = true
    }
    const leave = () => {
      overRef.current = false
      armedRef.current = false
      travelled = 0
    }
    const move = () => {
      overRef.current = true
      armedRef.current = true
    }
    const onScroll = () => {
      armedRef.current = false
      travelled = 0
    }
    const onWheel = (event: WheelEvent) => {
      if (!overRef.current || !armedRef.current || document.querySelector('dialog[open]')) return
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      const direction = Math.sign(delta)
      if (direction === 0) return
      const next = activeRef.current + direction
      // Let the page have the wheel back at the first and last step.
      if (next < 0 || next > STEPS.length - 1) return
      event.preventDefault()
      const now = performance.now()
      if (now < restUntil) return
      travelled += delta
      if (Math.abs(travelled) < WHEEL_PER_STEP) return
      travelled = 0
      restUntil = now + WHEEL_REST_MS
      goTo(next)
    }

    panel.addEventListener('pointerenter', enter)
    panel.addEventListener('pointerleave', leave)
    panel.addEventListener('pointermove', move)
    panel.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      panel.removeEventListener('pointerenter', enter)
      panel.removeEventListener('pointerleave', leave)
      panel.removeEventListener('pointermove', move)
      panel.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
    }
  }, [mode])

  const titleId = `${uid}-title`
  const counter = `${pad(active + 1)} / ${pad(STEPS.length)}`

  return (
    <section ref={sectionRef} id="parcours" aria-labelledby={titleId} className="scroll-mt-24 pt-24 md:pt-[180px]">
      <Reveal>
        <h2
          id={titleId}
          className="px-6 md:text-center text-[clamp(1.875rem,1.1rem+2.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em]"
        >
          <span className="block">{t('line1')}</span>
          <span className="block">{t('line2')}</span>
        </h2>
      </Reveal>

      <div ref={runwayRef} className="relative mt-8 md:mt-14 pin:mt-0 pin:h-[280vh]">
        <div className="pin:sticky pin:top-0 pin:flex pin:h-screen pin:flex-col pin:justify-center pin:pb-5 pin:pt-[88px]">
          <div className="mx-auto w-full max-w-[1344px] px-6 md:px-10 lg:px-8">
            <div ref={panelRef} className="lg:rounded-[28px] lg:bg-white/75 lg:px-8 lg:py-[clamp(20px,3.5vh,40px)] lg:shadow-[0_30px_60px_-40px_rgba(10,86,196,0.35)] xl:px-[52px]">
              <div role="tablist" aria-label={t('tabsLabel')} className="grid grid-cols-3 gap-3 md:gap-6 lg:gap-10">
                {STEPS.map(({ key }, i) => (
                  <button
                    key={key}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${i}`}
                    aria-selected={i === active}
                    aria-controls={`${uid}-panel-${i}`}
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => goTo(i)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                    className="group rounded-md pb-1 pt-3 text-left"
                  >
                    <span aria-hidden="true" className="block h-[3px] overflow-hidden rounded-full bg-[#D9DDE5]">
                      <span
                        className="block h-full origin-left bg-azure"
                        style={{ transform: `scaleX(clamp(0, calc(var(--journey-progress, 1) - ${i}), 1))` }}
                      />
                    </span>
                    <span
                      className={`mt-3 block text-sm transition-colors duration-200 md:text-[15px] ${
                        i === active ? 'text-ink' : 'text-ink-faint group-hover:text-ink'
                      }`}
                    >
                      {t(`steps.${key}.tab`)}
                    </span>
                  </button>
                ))}
              </div>

              <div
                ref={viewportRef}
                className="no-scrollbar -mx-6 mt-5 snap-x snap-mandatory scroll-px-6 overflow-x-auto overscroll-x-contain px-6 md:-mx-10 md:scroll-px-10 md:px-10 lg:mx-0 lg:mt-[clamp(16px,3.5vh,32px)] lg:snap-none lg:scroll-px-0 lg:overflow-hidden lg:px-0"
              >
                <div
                  ref={trackRef}
                  // The ::after spacer lets the last card snap like the others: browsers leave
                  // the scroller's end padding out of the scroll range.
                  className="flex gap-3 after:w-7 after:shrink-0 after:content-[''] md:after:w-11 lg:gap-0 lg:after:hidden motion-safe:lg:transition-transform motion-safe:lg:duration-700 motion-safe:lg:ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={mode === 'panel' || mode === 'pinned' ? { transform: `translateX(-${active * 100}%)` } : undefined}
                >
                  {STEPS.map((step, i) => (
                    <article
                      key={step.key}
                      role="tabpanel"
                      id={`${uid}-panel-${i}`}
                      aria-labelledby={`${uid}-tab-${i}`}
                      aria-hidden={i !== active}
                      className="flex w-[calc(100%-16px)] shrink-0 snap-start snap-always flex-col overflow-hidden rounded-[20px] bg-white/85 md:grid md:grid-cols-2 lg:w-full lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-[52px] lg:overflow-visible lg:rounded-none lg:bg-transparent"
                    >
                      <StepMedia
                        step={step}
                        alt={t(`steps.${step.key}.alt`)}
                        caption={t(`steps.${step.key}.caption`)}
                        active={i === active}
                        offset={i - active}
                        openLabel={t('zoom')}
                        closeLabel={t('close')}
                      />

                      <div className="flex flex-1 flex-col p-5 md:p-7 lg:justify-center lg:p-0">
                        <p className="hidden text-base lg:block">
                          <span className="text-azure-deep">{t(`steps.${step.key}.tab`)}</span>
                          <span className="ml-3 tabular-nums text-ink-faint">
                            {pad(i + 1)} / {pad(STEPS.length)}
                          </span>
                        </p>
                        <h3 className="text-[26px] font-medium leading-[1.12] tracking-[-0.03em] md:text-[32px] lg:mt-[clamp(12px,3vh,28px)] lg:text-[clamp(2rem,4.6vh,2.75rem)] lg:leading-[1.06]">
                          <span className="block">{t(`steps.${step.key}.title1`)}</span>
                          <span className="block">{t(`steps.${step.key}.title2`)}</span>
                        </h3>
                        <p className="mb-5 mt-3 max-w-[27rem] text-[15px] leading-[1.6] text-ink-soft md:mt-5 md:text-base lg:my-[clamp(12px,3vh,28px)] lg:text-[clamp(15px,1.9vh,17px)]">
                          {t(`steps.${step.key}.body`)}
                        </p>
                        <p className="mt-auto border-t border-[#D6D8DE] pt-4 text-[15px] text-ink md:text-base lg:mt-0 lg:pt-5 lg:text-lg">
                          {t(`steps.${step.key}.outcome`)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 lg:mt-5">
              <p className="text-sm text-ink-faint">
                <span className="hidden pin:inline">{t('hintScroll')}</span>
                <span className="tabular-nums pin:hidden">{counter}</span>
              </p>
              <div className="flex gap-2">
                <StepButton label={t('prev')} disabled={active === 0} onClick={() => goTo(active - 1)}>
                  <ChevronLeft aria-hidden="true" className="h-5 w-5 transition-transform duration-200 motion-safe:group-hover:-translate-x-0.5" strokeWidth={1.75} />
                </StepButton>
                <StepButton label={t('next')} disabled={active === STEPS.length - 1} onClick={() => goTo(active + 1)}>
                  <ChevronRight aria-hidden="true" className="h-5 w-5 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" strokeWidth={1.75} />
                </StepButton>
              </div>
            </div>
            <p aria-live="polite" className="sr-only">
              {t('announce', { current: active + 1, total: STEPS.length, name: t(`steps.${STEPS[active].key}.tab`) })}
            </p>

            <div className="mt-8 text-center lg:hidden">
              <Link
                href="/contact"
                className="sheen relative inline-flex h-[52px] items-center overflow-hidden rounded-[10px] bg-azure px-7 text-base font-medium text-white transition-colors duration-150 hover:bg-azure-deep"
              >
                {tClosing('cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepMedia({
  step,
  alt,
  caption,
  active,
  offset,
  openLabel,
  closeLabel,
}: {
  step: { image: StaticImageData; crop: StaticImageData }
  alt: string
  caption: string
  active: boolean
  openLabel: string
  closeLabel: string
  /** Where this step sits relative to the current one: the capture waits on the side it
   *  will come from, so the slide moves with the gesture instead of dissolving. */
  offset: number
}) {
  // Phones and tablets get a readable crop; wide screens the whole screen. Both load
  // up front so a slide never arrives empty.
  const { props: wide } = getImageProps({ src: step.image, alt, sizes: '(min-width: 1280px) 640px, 50vw' })
  const { props: narrow } = getImageProps({
    src: step.crop,
    alt,
    sizes: '(min-width: 768px) 45vw, calc(100vw - 64px)',
    loading: 'eager',
  })

  return (
    <figure className="md:order-last lg:flex lg:flex-col">
      <div className="lg:rounded-[24px] lg:bg-[linear-gradient(135deg,#EAF2FF_0%,#D4E4FE_100%)] lg:p-6 xl:p-8">
        <div className="lg:mx-auto lg:rounded-[14px] lg:bg-white/80 lg:p-2 pin:max-w-[calc((100vh-400px)*16/9)]">
          <ImageZoom
            src={wide.src}
            srcSet={wide.srcSet}
            alt={alt}
            caption={caption}
            openLabel={openLabel}
            closeLabel={closeLabel}
            focusable={active}
          >
          <picture
            data-active={active}
            style={{ '--shift': offset === 0 ? '0px' : offset < 0 ? '-18px' : '18px' } as React.CSSProperties}
            className="block aspect-[4/3] overflow-hidden bg-white md:h-full lg:aspect-[16/9] lg:h-auto lg:rounded-[8px] motion-safe:lg:translate-x-[var(--shift)] motion-safe:lg:scale-[1.03] motion-safe:lg:opacity-60 motion-safe:lg:transition-[transform,opacity] motion-safe:lg:duration-700 motion-safe:lg:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:lg:data-[active=true]:translate-x-0 motion-safe:lg:data-[active=true]:scale-100 motion-safe:lg:data-[active=true]:opacity-100"
          >
            <source media="(min-width: 1024px)" srcSet={wide.srcSet} sizes={wide.sizes} />
            <img {...narrow} alt={alt} className="h-full w-full object-cover object-left-top" />
          </picture>
          </ImageZoom>
        </div>
      </div>
      <figcaption className="hidden text-sm text-ink-faint lg:mt-3 lg:block lg:self-end">{caption}</figcaption>
    </figure>
  )
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/85 text-ink transition-colors duration-150 hover:border-azure/40 hover:text-azure-deep disabled:cursor-default disabled:opacity-40 disabled:hover:border-ink/10 disabled:hover:text-ink"
    >
      {children}
    </button>
  )
}

function slidePitch(track: HTMLElement) {
  const [first, second] = Array.from(track.children) as HTMLElement[]
  return first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth
}

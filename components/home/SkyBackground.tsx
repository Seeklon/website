'use client'

import { useEffect, useRef } from 'react'

// Share of the painted sky's height above the point where its blue begins.
const BLUE_AT = 0.86

/**
 * The sky is the painted one from the design canvas: pale and hazy at the top, thickening
 * into cumulus, then turning over into a deep blue that still carries clouds. One 39KB
 * image pinned to the document — scrolling stays the browser's, so it can never lag behind
 * the text — with three soft lights drifting across it for movement, as the design does.
 *
 * It is stretched so the blue in the painting lands exactly where the page turns blue
 * (`[data-sky-deep]`), and faded out over its last stretch, where the closing section's
 * own gradient carries the colour down to the footer.
 */
export default function SkyBackground() {
  const skyRef = useRef<HTMLDivElement>(null)
  const deepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sky = skyRef.current
    const deep = deepRef.current
    const host = sky?.parentElement
    if (!sky || !deep || !host) return

    let frame = 0
    const fit = () => {
      frame = 0
      const height = host.offsetHeight
      const marker = host.querySelector<HTMLElement>('[data-sky-deep]')
      if (!marker) {
        sky.style.height = `${Math.round(height)}px`
        sky.style.backgroundSize = `100% ${Math.round(height)}px`
        return
      }
      const hostTop = host.getBoundingClientRect().top + window.scrollY
      const lead = parseFloat(getComputedStyle(marker).getPropertyValue('--deep-lead')) || 0
      const deepStart = Math.max(height * 0.4, marker.getBoundingClientRect().top + window.scrollY - hostTop - lead)
      // Above: the painting from its top down to the moment it turns blue.
      sky.style.height = `${Math.round(deepStart)}px`
      sky.style.backgroundSize = `100% ${Math.round(deepStart / BLUE_AT)}px`
      // Below: the same painting's blue stretch, so the end of the page keeps its clouds
      // instead of falling back to a flat fill.
      const rest = height - deepStart
      const scale = rest / (1 - BLUE_AT)
      deep.style.top = `${Math.round(deepStart)}px`
      deep.style.height = `${Math.round(rest)}px`
      deep.style.backgroundSize = `100% ${Math.round(scale)}px`
      deep.style.backgroundPosition = `0 -${Math.round(scale * BLUE_AT)}px`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(fit)
    }

    fit()
    const observer = new ResizeObserver(schedule)
    observer.observe(host)
    window.addEventListener('resize', schedule)
    document.fonts.ready.then(schedule)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={skyRef} aria-hidden="true" className="sky-paint pointer-events-none absolute inset-x-0 top-0 -z-10" />
      <div ref={deepRef} aria-hidden="true" className="sky-paint sky-paint-deep pointer-events-none absolute inset-x-0 -z-10" />
      <div
        aria-hidden="true"
        className="sky-light sky-light-a pointer-events-none absolute -left-[16%] top-[4%] -z-10 h-[62vh] w-[62%] rounded-full"
      />
      <div
        aria-hidden="true"
        className="sky-light sky-light-b pointer-events-none absolute -right-[14%] top-[34%] -z-10 h-[58vh] w-[56%] rounded-full"
      />
      <div
        aria-hidden="true"
        className="sky-light sky-light-c pointer-events-none absolute left-[8%] top-[66%] -z-10 h-[64vh] w-[64%] rounded-full"
      />
    </>
  )
}

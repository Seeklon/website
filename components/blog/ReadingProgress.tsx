'use client'

import { useEffect, useRef } from 'react'

/**
 * How far through the article the reader is, as a hairline of the site's blue. It follows
 * the body of the article, not the document, so the closing section and the footer do not
 * count as reading. Written straight to a CSS variable on a scroll frame — no React state.
 */
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = ref.current
    const article = bar?.closest('article')
    if (!bar || !article) return

    let frame = 0
    const update = () => {
      frame = 0
      const body = (article.querySelector('.prose') as HTMLElement | null) ?? article
      const start = body.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4
      const end = start + body.offsetHeight
      const progress = (window.scrollY - start) / Math.max(1, end - start)
      bar.style.setProperty('--progress', String(Math.min(1, Math.max(0, progress))))
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className="reading-progress" />
}

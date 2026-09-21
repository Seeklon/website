'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Marks its content as revealed the first time it scrolls into view, for the CSS in
 * globals.css to animate. Server-rendered markup carries no marker, so the content is
 * visible if scripts never run; only used below the fold, where the swap isn't seen.
 */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    element.dataset.reveal = ''
    // A quarter of the element, but never more than a quarter of a screen: the blog grid is
    // several screens tall, and a fixed 0.25 threshold could never be reached — its cards
    // stayed invisible for good.
    const threshold = Math.min(0.25, (window.innerHeight * 0.25) / Math.max(1, element.offsetHeight))
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.dataset.visible = 'true'
        observer.disconnect()
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

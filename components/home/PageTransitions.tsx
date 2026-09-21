'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => { finished: Promise<void> }
}

/**
 * Page to page, the sky and the nav stay where they are and only `main` changes hands.
 * Browsers without the View Transitions API, and readers who asked for less motion, get
 * the ordinary instant swap — the handler simply does not run.
 */
export default function PageTransitions() {
  const router = useRouter()
  const pathname = usePathname()
  const resolveRef = useRef<(() => void) | null>(null)

  // The transition ends when the new route has actually rendered, not after a guessed delay.
  useEffect(() => {
    resolveRef.current?.()
    resolveRef.current = null
  }, [pathname])

  useEffect(() => {
    const doc = document as ViewTransitionDocument
    if (typeof doc.startViewTransition !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return

      event.preventDefault()
      doc.startViewTransition?.(
        () =>
          new Promise<void>((resolve) => {
            const done = () => {
              window.clearTimeout(timer)
              resolve()
            }
            // A slow route must not leave the page frozen under a snapshot.
            const timer = window.setTimeout(done, 700)
            resolveRef.current = done
            router.push(url.pathname + url.search + url.hash)
          }),
      )
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  return null
}

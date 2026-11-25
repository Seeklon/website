'use client'

import { useRef, type ComponentProps, type MouseEvent } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { canTrack } from '@/lib/analytics'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { placement: string }

// "Demandez une démo": a localized link to the contact page that reports `demo_click`
// once audience measurement was accepted. The site's router keeps this page's document
// alive, so GA4 sends the hit without holding the navigation (unlike AppLink).
// A second click within this delay (double-click) is not counted again.
const REPEAT_CLICK_MS = 1000

export default function DemoLink({ placement, onClick, ...props }: Props) {
  const locale = useLocale()
  const lastClickRef = useRef(0)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (!canTrack()) return
    const now = Date.now()
    if (now - lastClickRef.current < REPEAT_CLICK_MS) return
    lastClickRef.current = now
    window.gtag?.('event', 'demo_click', { placement, site_locale: locale })
  }

  return <Link {...props} href="/contact" onClick={handleClick} />
}

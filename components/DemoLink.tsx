'use client'

import type { ComponentProps, MouseEvent } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { canTrack } from '@/lib/analytics'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { placement: string }

// "Demandez une démo": a localized link to the contact page that reports `demo_click`
// once audience measurement was accepted. The site's router keeps this page's document
// alive, so GA4 sends the hit without holding the navigation (unlike AppLink).
export default function DemoLink({ placement, onClick, ...props }: Props) {
  const locale = useLocale()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (canTrack()) window.gtag?.('event', 'demo_click', { placement, site_locale: locale })
  }

  return <Link {...props} href="/contact" onClick={handleClick} />
}

'use client'

import { useRef, type ComponentPropsWithoutRef, type MouseEvent } from 'react'
import { useLocale } from 'next-intl'
import { canTrack } from '@/lib/analytics'

type Props = ComponentPropsWithoutRef<'a'> & {
  href: string
  /** GA4 event sent on click, e.g. `signup_click`. */
  event: string
  /** Fixed name of the entry point, e.g. `home-hero`. */
  placement: string
}

// Longest a click waits for GA before the browser follows the link anyway.
const TRACKING_TIMEOUT_MS = 400

// A regular link to the app (outside the site's locale router), followed in the same tab
// and working without JavaScript, that reports the click to GA4 once measurement is accepted.
export default function AppLink({ href, event: eventName, placement, onClick, children, ...props }: Props) {
  const locale = useLocale()
  // A click is already being held: a second one (double-click) waits for it, untracked.
  const holdingRef = useRef(false)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (holdingRef.current) {
      event.preventDefault()
      return
    }
    // Not accepted, or withdrawn since: a plain link, followed at once.
    if (!canTrack()) return

    // GA4 batches hits, so one queued right before leaving the page can be dropped. Hold a
    // plain same-tab click until GA confirms the hit (or the timeout), then follow the link.
    // Modified and middle clicks open a new tab: this page stays, nothing to hold.
    const opensElsewhere =
      event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      || Boolean(props.target && props.target !== '_self')

    let followed = false
    const follow = () => {
      if (followed || opensElsewhere) return
      followed = true
      // Released here so the link works again if the visitor comes back to this page
      // from the browser's cache.
      holdingRef.current = false
      window.location.assign(href)
    }
    if (!opensElsewhere) {
      event.preventDefault()
      holdingRef.current = true
    }

    // `site_locale` rather than `language`, which GA4 already fills with the browser's.
    window.gtag?.('event', eventName, {
      placement,
      site_locale: locale,
      link_url: href,
      transport_type: 'beacon',
      event_callback: follow,
      event_timeout: TRACKING_TIMEOUT_MS,
    })
    // Safety net if gtag.js never loaded (blocked by an extension): the callback never runs.
    window.setTimeout(follow, TRACKING_TIMEOUT_MS + 100)
  }

  return <a {...props} href={href} onClick={handleClick}>{children}</a>
}

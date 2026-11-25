// GA4 for the website's own property ("Seeklon - Site vitrine"), separate from the app's.
// Visits sent on to the app are attributed there by the sign-up links' UTM parameters
// (lib/app-links.ts).
//
// Without NEXT_PUBLIC_GA_MEASUREMENT_ID, only the Vercel production deployment measures:
// preview deployments and local builds (`next dev`, `next build && next start`) send nothing,
// so tests never reach the real property. VERCEL_ENV is inlined by next.config.js.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  || (process.env.VERCEL_ENV === 'production' ? 'G-269CM30LS9' : '')

export const CONSENT_STORAGE_KEY = 'seeklon_analytics_consent'
export const CONSENT_VERSION = '2026-08-11'
export const CONSENT_ACCEPTED = 'accepted'
export const CONSENT_DECLINED = 'declined'

export type ConsentStatus = typeof CONSENT_ACCEPTED | typeof CONSENT_DECLINED

export type StoredConsent = {
  status: ConsentStatus
  version: string
  source: 'cookie-banner'
  updatedAt: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean
  }
}

// The choice made during this page's life. It also covers browsers where storage is
// blocked: the choice then holds until the page is left, and the banner returns next visit.
let sessionConsent: StoredConsent | null | undefined

function parseStoredConsent(value: string | null): StoredConsent | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(value) as Partial<StoredConsent>
    if (
      (parsed.status === CONSENT_ACCEPTED || parsed.status === CONSENT_DECLINED)
      && parsed.version === CONSENT_VERSION
      && parsed.source === 'cookie-banner'
    ) {
      return parsed as StoredConsent
    }
  } catch {
    return null
  }
  return null
}

export function readConsent(): StoredConsent | null {
  if (sessionConsent !== undefined) return sessionConsent
  try {
    // Throws a SecurityError when the browser blocks site data.
    return parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeConsent(status: ConsentStatus): StoredConsent {
  const consent: StoredConsent = {
    status,
    version: CONSENT_VERSION,
    source: 'cookie-banner',
    updatedAt: new Date().toISOString(),
  }
  sessionConsent = consent
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  } catch {
    // Storage blocked: the choice only lasts for this page (see sessionConsent).
  }
  return consent
}

/**
 * True when an event may be sent: an ID is set, the visitor accepted, and gtag exists.
 * `window.gtag` alone is not enough: it stays defined after a withdrawal.
 */
export function canTrack(): boolean {
  return Boolean(GA_MEASUREMENT_ID) && readConsent()?.status === CONSENT_ACCEPTED && typeof window.gtag === 'function'
}

function deleteCookie(name: string, domain?: string) {
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`
}

/**
 * Removes the website's GA cookies. `_ga_<id>` belongs to the site's property only. `_ga`
 * (the client id, on .seeklon.com) is shared with app.seeklon.com: it is only removed when
 * no other GA property still keeps a `_ga_*` session cookie, so declining here does not wipe
 * the analytics a visitor accepted in the app.
 */
export function deleteWebsiteAnalyticsCookies() {
  const hostname = window.location.hostname
  const domainParts = hostname.split('.')
  const candidateDomains = new Set<string | undefined>([undefined, hostname])
  if (domainParts.length >= 2) candidateDomains.add(`.${domainParts.slice(-2).join('.')}`)
  if (hostname.startsWith('www.')) candidateDomains.add(`.${hostname.replace(/^www\./, '')}`)

  const cookieNames = () => document.cookie.split(';').map((cookie) => cookie.trim().split('=')[0])
  const siteSessionCookie = `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, '')}`

  candidateDomains.forEach((domain) => deleteCookie(siteSessionCookie, domain))
  const otherPropertyCookies = cookieNames().filter((name) => name.startsWith('_ga_'))
  if (otherPropertyCookies.length === 0) {
    candidateDomains.forEach((domain) => deleteCookie('_ga', domain))
  }
}

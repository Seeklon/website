"use client"

import Script from 'next/script'
import { Cookie } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const GA_MEASUREMENT_ID = 'G-YT9YC2FR33'
const CONSENT_STORAGE_KEY = 'seeklon_analytics_consent'
const CONSENT_VERSION = '2026-08-11'
const CONSENT_ACCEPTED = 'accepted'
const CONSENT_DECLINED = 'declined'

type ConsentStatus = typeof CONSENT_ACCEPTED | typeof CONSENT_DECLINED

type StoredConsent = {
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

function deleteCookie(name: string, domain?: string) {
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`
}

function deleteGoogleAnalyticsCookies() {
  const hostname = window.location.hostname
  const domainParts = hostname.split('.')
  const candidateDomains = new Set<string | undefined>([undefined, hostname])

  if (domainParts.length >= 2) {
    candidateDomains.add(`.${domainParts.slice(-2).join('.')}`)
  }
  if (hostname.startsWith('www.')) {
    candidateDomains.add(`.${hostname.replace(/^www\./, '')}`)
  }

  document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))
    .forEach((name) => {
      candidateDomains.forEach((domain) => deleteCookie(name, domain))
    })
}

export default function CookieConsentAnalytics() {
  const t = useTranslations('CookieConsent')
  const pathname = usePathname()
  const [consent, setConsent] = useState<StoredConsent | null>(null)
  const [isManagerOpen, setIsManagerOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isGaReady, setIsGaReady] = useState(false)
  const managerButtonRef = useRef<HTMLButtonElement>(null)
  const managerPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setConsent(parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY)))
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = consent?.status !== CONSENT_ACCEPTED
  }, [consent?.status])

  useEffect(() => {
    if (!isGaReady || consent?.status !== CONSENT_ACCEPTED || !window.gtag) return
    window.gtag('event', 'page_view', {
      page_path: `${pathname}${window.location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [consent?.status, isGaReady, pathname])

  useEffect(() => {
    if (!isManagerOpen) return

    managerPanelRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsManagerOpen(false)
      window.requestAnimationFrame(() => managerButtonRef.current?.focus())
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isManagerOpen])

  const saveConsent = (status: ConsentStatus) => {
    const nextConsent: StoredConsent = {
      status,
      version: CONSENT_VERSION,
      source: 'cookie-banner',
      updatedAt: new Date().toISOString(),
    }
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextConsent))
    setConsent(nextConsent)
    setIsManagerOpen(false)
    if (isManagerOpen) {
      window.requestAnimationFrame(() => managerButtonRef.current?.focus())
    }

    if (status === CONSENT_DECLINED) {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
      deleteGoogleAnalyticsCookies()
    } else {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = false
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    }
  }

  const hasAccepted = consent?.status === CONSENT_ACCEPTED
  const shouldShowBanner = isLoaded && consent === null
  const shouldShowManager = isLoaded && consent !== null
  const normalizedPathname = pathname.replace(/^\/(?:fr|en)(?=\/|$)/, '') || '/'
  const hasMobileStickyCta = normalizedPathname !== '/pricing' && normalizedPathname !== '/contact' && normalizedPathname !== '/thank-you'

  return (
    <>
      {hasAccepted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            onReady={() => setIsGaReady(true)}
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                send_page_view: false
              });
            `}
          </Script>
        </>
      )}

      {(shouldShowBanner || isManagerOpen) && (
        <div
          ref={managerPanelRef}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/15 md:bottom-6 md:flex md:items-center md:gap-5 md:p-5"
          role={isManagerOpen ? 'dialog' : undefined}
          aria-modal={isManagerOpen ? true : undefined}
          aria-labelledby="cookie-consent-title"
          tabIndex={isManagerOpen ? -1 : undefined}
        >
          <div className="flex-1">
            <p id="cookie-consent-title" className="font-heading text-base font-bold text-text-main">
              {t('title')}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              {t('description')}{' '}
              <Link href="/rgpd" className="font-semibold text-primary hover:underline">
                {t('learnMore')}
              </Link>
            </p>
            {consent && (
              <p className="mt-2 text-xs font-medium text-slate-500">
                {consent.status === CONSENT_ACCEPTED ? t('statusAccepted') : t('statusDeclined')}
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row md:mt-0">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-semibold text-text-muted transition-colors hover:border-primary/30 hover:text-primary"
              onClick={() => saveConsent(CONSENT_DECLINED)}
            >
              {consent?.status === CONSENT_ACCEPTED ? t('withdraw') : t('decline')}
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              onClick={() => saveConsent(CONSENT_ACCEPTED)}
            >
              {t('accept')}
            </button>
          </div>
        </div>
      )}

      {shouldShowManager && !isManagerOpen && (
        <button
          ref={managerButtonRef}
          type="button"
          className={`fixed left-4 z-[55] flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-text-muted shadow-lg shadow-slate-900/10 transition-colors hover:border-primary/30 hover:text-primary md:bottom-4 ${hasMobileStickyCta ? 'bottom-20' : 'bottom-4'}`}
          onClick={() => setIsManagerOpen(true)}
          aria-label={t('manage')}
          title={t('manage')}
        >
          <Cookie size={18} aria-hidden="true" />
        </button>
      )}
    </>
  )
}

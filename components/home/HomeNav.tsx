'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import SeeklonWordmark from './SeeklonWordmark'

const LINKS = [
  { key: 'journey', href: '/#parcours' },
  { key: 'pricing', href: '/pricing' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/about' },
] as const

// Language names are written in their own language, whatever the page locale.
const LANGUAGE_NAMES: Record<string, string> = { fr: 'Français', en: 'English' }

export default function HomeNav() {
  const t = useTranslations('Home.nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const close = () => setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && close()
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', close, { passive: true })
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', close)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const localeSwitch = (
    <ul className="flex items-center gap-1 text-sm" aria-label={t('language')}>
      {routing.locales.map((loc) => (
        <li key={loc}>
          <Link
            href={pathname}
            locale={loc}
            lang={loc}
            hrefLang={loc}
            aria-label={LANGUAGE_NAMES[loc]}
            aria-current={loc === locale ? 'true' : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-1.5 uppercase transition-colors duration-150 ${
              loc === locale ? 'text-ink' : 'text-ink-faint hover:text-ink'
            }`}
          >
            {loc}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 lg:top-5">
      <nav
        ref={navRef}
        aria-label={t('label')}
        className="mx-auto max-w-[1040px] rounded-[14px] bg-white shadow-[0_14px_34px_-20px_rgba(11,11,12,0.45)]"
      >
        <div className="flex h-14 items-center justify-between pl-5 pr-2 lg:grid lg:h-[60px] lg:grid-cols-[1fr_auto_1fr] lg:pl-6 lg:pr-3">
          <Link href="/" aria-label={t('home')} className="flex h-10 items-center text-ink" onClick={() => setOpen(false)}>
            <SeeklonWordmark className="h-[15px] w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map(({ key, href }) => {
              const current = pathname === href
              return (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={current ? 'page' : undefined}
                    className={`rounded-lg px-3.5 py-2 text-[15px] leading-none transition-colors duration-150 ${
                      current ? 'bg-[#EEF4FF] text-ink' : 'text-ink hover:bg-azure/[0.07] hover:text-azure-deep'
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center justify-end gap-3 lg:flex">
            {localeSwitch}
            <Link
              href="/contact"
              className="rounded-[10px] bg-azure px-4 py-2.5 text-sm leading-none text-white transition-colors duration-150 hover:bg-azure-deep"
            >
              {t('demo')}
            </Link>
          </div>

          <Link
            href="/contact"
            aria-label={t('demo')}
            className="ml-auto mr-1 whitespace-nowrap rounded-[10px] bg-azure px-4 py-2.5 text-sm leading-none text-white transition-colors duration-150 hover:bg-azure-deep lg:hidden"
          >
            {t('demoShort')}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-[10px] lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-[22px] rounded-full bg-ink transition-transform duration-200 ${open ? 'rotate-45' : '-translate-y-1'}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-[22px] rounded-full bg-ink transition-transform duration-200 ${open ? '-rotate-45' : 'translate-y-1'}`}
            />
          </button>
        </div>

        <div id={menuId} hidden={!open} className="border-t border-ink/[0.06] px-3 pb-4 pt-2 lg:hidden">
          <ul>
            {LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={`flex min-h-12 items-center rounded-[10px] px-3 text-lg text-ink transition-colors duration-150 hover:bg-azure/[0.07] ${
                    pathname === href ? 'bg-[#EEF4FF]' : ''
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 px-1">{localeSwitch}</div>
        </div>
      </nav>
    </header>
  )
}

"use client"

import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'

export default function Header() {
  const t = useTranslations('Header')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: t('features'), href: '/#fonctionnalites' },
    { label: t('pricing'), href: '/pricing' },
    { label: t('blog'), href: '/blog' },
    { label: t('about'), href: '/about' },
  ]

  useEffect(() => {
    const closeOnDesktop = () => window.innerWidth >= 768 && setIsOpen(false)
    window.addEventListener('resize', closeOnDesktop)
    return () => window.removeEventListener('resize', closeOnDesktop)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper ${['/', '/pricing', '/about', '/blog'].includes(pathname) ? 'header-home' : ''}`}>
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <Image src="/logo.png" alt="" width={34} height={34} priority className="transition-transform group-hover:rotate-6" />
          <span className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">Seeklon</span>
          <span className="sr-only">{t('home')}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label={t('mainNavigation')}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex border border-ink/15 p-1" aria-label={t('language')}>
            {(['fr', 'en'] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => router.replace(pathname, { locale: loc })}
                className={`min-w-9 px-2 py-1 text-xs font-bold transition-colors ${locale === loc ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink'}`}
                aria-pressed={locale === loc}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/contact" className="button-primary button-small">{t('requestDemo')}</Link>
        </div>

        <button
          type="button"
          className="focus-ring p-2 text-ink md:hidden"
          aria-label={isOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <div id="mobile-navigation" className={`${isOpen ? 'block' : 'hidden'} border-t border-ink/10 bg-paper md:hidden`}>
        <nav className="flex flex-col px-5 py-5" aria-label={t('mobileNavigation')}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="border-b border-ink/10 py-4 text-lg font-semibold text-ink">
              {item.label}
            </Link>
          ))}
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex border border-ink/15 p-1">
              {(['fr', 'en'] as const).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => { router.replace(pathname, { locale: loc }); setIsOpen(false) }}
                  className={`min-w-11 px-2 py-2 text-xs font-bold ${locale === loc ? 'bg-ink text-white' : 'text-ink-muted'}`}
                  aria-pressed={locale === loc}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="button-primary button-small">{t('requestDemo')}</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

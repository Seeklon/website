"use client"

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

export default function Footer() {
  const t = useTranslations('Footer')
  const pathname = usePathname()

  return (
    <footer className={`border-t border-white/15 bg-ink px-5 py-14 text-blue-100 md:px-8 ${pathname.startsWith('/blog/') ? '' : 'footer-readable'}`}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 text-white">
              <Image src="/logo.png" alt="" width={36} height={36} className="brightness-0 invert" />
              <span className="font-display text-3xl font-bold tracking-[-0.03em]">Seeklon</span>
            </Link>
            <p className="mt-5 max-w-sm leading-7 text-blue-100">{t('tagline')}</p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">{t('product')}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/#fonctionnalites" className="footer-link">{t('features')}</Link></li>
              <li><Link href="/pricing" className="footer-link">{t('pricing')}</Link></li>
              <li><Link href="/contact" className="footer-link">{t('requestDemo')}</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">{t('company')}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/about" className="footer-link">{t('about')}</Link></li>
              <li><Link href="/blog" className="footer-link">{t('blog')}</Link></li>
              <li><Link href="/contact" className="footer-link">{t('contact')}</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">{t('legal')}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/legal" className="footer-link">{t('legalMentions')}</Link></li>
              <li><Link href="/privacy" className="footer-link">{t('privacy')}</Link></li>
              <li><Link href="/rgpd" className="footer-link">{t('cookies')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-xs text-blue-200 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Seeklon. {t('copyright')}</span>
          <a href="https://www.linkedin.com/company/seeklon/" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

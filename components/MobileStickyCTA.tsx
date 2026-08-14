"use client"

import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'

export default function MobileStickyCTA() {
  const t = useTranslations('MobileCTA')
  const pathname = usePathname()

  if (pathname === '/pricing' || pathname === '/contact' || pathname === '/thank-you') return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <Link
        href="/contact"
        className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-primary/30 transition-colors hover:bg-primary-dark"
      >
        {t('label')}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  )
}

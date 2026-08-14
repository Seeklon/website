'use client'

import { Plus } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

const FAQ_ITEMS = ['1', '2', '3', '4', '5'] as const
const PRICING_FAQ_ITEMS = ['1', '2', '3', '4'] as const

type FAQProps = {
  namespace?: 'FAQ' | 'PricingFAQ'
}

export default function FAQ({ namespace = 'FAQ' }: FAQProps) {
  const t = useTranslations(namespace)
  const items = namespace === 'PricingFAQ' ? PRICING_FAQ_ITEMS : FAQ_ITEMS

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary md:text-4xl">
              {t('title')}
            </h2>
          </div>
          <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {items.map((item) => (
              <details key={item} className="group p-6">
                <summary className="cursor-pointer list-none rounded-sm font-heading text-lg font-bold text-text-main transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                  <span className="flex items-center justify-between gap-4">
                    {t(`q${item}`)}
                    <Plus className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden="true" />
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {t(`a${item}`)}
                </p>
              </details>
            ))}
          </div>
          {namespace === 'PricingFAQ' && (
            <div className="mt-8 text-center">
              <Link
                href="/contact?plan=beta"
                className="inline-flex rounded-lg bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                {t('cta')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

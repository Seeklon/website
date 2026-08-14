'use client'

import { useTranslations } from 'next-intl'

const TESTIMONIALS = [
  { insight: 'insight1', author: 'author1', role: 'role1' },
  { insight: 'insight2', author: 'author2', role: 'role2' },
  { insight: 'insight3', author: 'author3', role: 'role3' },
] as const

export default function SocialProof() {
  const t = useTranslations('SocialProof')

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase text-primary">{t('eyebrow')}</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-text-main md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-text-muted">{t('subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article key={item.insight} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-5">
                <h3 className="font-heading font-bold text-primary">{t(item.author)}</h3>
                <div className="mt-1 text-sm font-medium text-text-muted">{t(item.role)}</div>
              </div>

              <p className="flex-grow text-base leading-relaxed text-text-main">
                {t(item.insight)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

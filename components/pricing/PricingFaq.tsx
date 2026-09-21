import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'

type Item = { q: string; a: string }

export default function PricingFaq() {
  const t = useTranslations('Pricing.faq')
  const items = t.raw('items') as Item[]

  // The questions are already a static list on the page; declaring them lets them show up
  // as answers in search results without adding a pixel.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-[180px] xl:px-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="lg:grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em]">
            {t('title')}
          </h2>
        </Reveal>

        <dl className="mt-8 rounded-[24px] bg-white/85 px-7 py-2 md:px-10 lg:mt-0">
          {items.map((item) => (
            <div
              key={item.q}
              className="border-t border-[#DDDBD5] py-7 first:border-t-0 lg:grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-10 lg:first:border-t lg:first:pt-7"
            >
              <dt className="text-xl md:text-[22px]">{item.q}</dt>
              <dd className="mt-3 max-w-[34rem] text-base leading-[1.6] text-ink-soft md:text-[17px] lg:mt-0">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'
import { Link } from '@/i18n/navigation'

// The only plan on sale today: free while Seeklon is in beta.
export default function BetaPlan() {
  const t = useTranslations('Pricing.beta')
  const features = t.raw('features') as string[]

  return (
    <section className="mx-auto mt-12 max-w-[1440px] px-6 md:mt-20 md:px-10 xl:px-20">
      <article className="rounded-[24px] border border-azure bg-white/90 p-7 shadow-[0_40px_70px_-50px_rgba(12,109,248,0.7)] md:p-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:p-12">
        <div>
          <p className="inline-flex items-center rounded-full bg-azure/10 px-3 py-1.5 text-[13px] text-azure-deep">
            {t('badge')}
          </p>
          <h2 className="mt-5 text-[28px] md:text-[32px]">{t('name')}</h2>
          <p className="mt-3 max-w-[26rem] text-base leading-[1.6] text-ink-soft md:text-[17px]">{t('description')}</p>

          <p className="mt-7 flex flex-wrap items-baseline gap-x-3 md:mt-9">
            <span className="text-[clamp(3.5rem,2.4rem+2.6vw,5rem)] leading-none text-azure">{t('price')}</span>
            <span className="text-[15px] text-ink-soft">{t('period')}</span>
          </p>

          <Link
            href="/contact"
            className="sheen relative mt-8 inline-flex h-[54px] items-center overflow-hidden rounded-[10px] bg-azure px-8 text-base font-medium text-white transition-colors duration-150 hover:bg-azure-deep"
          >
            {t('cta')}
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-3.5 text-base sm:grid-cols-2 lg:mt-2 lg:grid-cols-1 lg:self-center xl:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-azure" strokeWidth={2.25} />
              {feature}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

import { useTranslations } from 'next-intl'

export default function PricingHero() {
  const t = useTranslations('Pricing.hero')

  return (
    <section className="px-6 pt-[136px] text-center md:pt-[180px]">
      <h1 className="text-[clamp(2.25rem,0.9rem+5.9vw,6rem)] font-medium leading-[1.02] tracking-[-0.045em] md:leading-[0.98] md:tracking-[-0.05em]">
        <span className="block">{t('line1')}</span>
        <span className="block text-azure">{t('line2')}</span>
      </h1>
      <p className="mx-auto mt-8 max-w-[44rem] text-balance text-base leading-[1.6] text-ink-soft md:mt-9 md:text-[19px]">
        {t('body')}
      </p>
      <p className="mx-auto mt-7 max-w-[18rem] text-xs text-ink-faint md:mt-8 md:max-w-none md:text-sm">{t('note')}</p>
    </section>
  )
}

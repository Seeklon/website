import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Reveal from '@/components/home/Reveal'

// Named after rising winds: Brise → Tempête → Cyclone. No prices yet, on purpose.
const PACKS = ['breeze', 'storm', 'cyclone'] as const

export default function PackCards() {
  const t = useTranslations('Pricing.packs')

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-[150px] xl:px-20">
      <Reveal>
        <h2 className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em]">
          {t('title')}
        </h2>
      </Reveal>

      <ul className="mt-8 grid gap-5 md:mt-12 lg:grid-cols-3 lg:gap-6">
        {PACKS.map((key) => {
          const features = t.raw(`items.${key}.features`) as string[]
          return (
            <li key={key} className="flex flex-col rounded-[20px] border border-white bg-white/85 p-7 md:p-9">
              <h3 className="text-2xl md:text-[26px]">{t(`items.${key}.name`)}</h3>
              <p className="mt-3 max-w-[18rem] text-base text-ink-soft">{t(`items.${key}.description`)}</p>
              <p className="mt-7 text-lg text-ink-faint md:mt-8">{t('soon')}</p>

              <ul className="mt-7 flex-1 divide-y divide-[#DDDBD5] border-t border-[#DDDBD5] text-base">
                {features.map((feature) => (
                  <li key={feature} className="py-3">
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-8 flex h-[54px] items-center justify-center rounded-[10px] border border-ink-faint/80 bg-white text-base text-ink transition-colors duration-150 hover:border-ink hover:bg-[#F6F9FF]"
              >
                {t('cta')}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

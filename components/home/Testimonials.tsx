import { useTranslations } from 'next-intl'
import Reveal from './Reveal'

const ITEMS = ['one', 'two', 'three'] as const

export default function Testimonials() {
  const t = useTranslations('Home.testimonials')

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-[104px] md:px-10 md:pt-[220px] xl:px-20">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <Reveal>
          <h2 className="text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.045em] lg:leading-none">
            <span className="block">{t('line1')}</span>
            <span className="block">{t('line2')}</span>
          </h2>
        </Reveal>
        <p className="max-w-[17rem] text-balance text-xs leading-relaxed text-ink-faint md:text-sm lg:mb-1.5">
          {t('note')}
        </p>
      </div>

      {/* Two shared rows (quote, author) so the names line up across the cards. */}
      <ul className="mt-8 grid gap-4 md:mt-14 lg:grid-cols-3 lg:grid-rows-[auto_auto] lg:gap-x-6 lg:gap-y-12">
        {ITEMS.map((key) => (
          <li key={key} className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
            <figure className="flex h-full flex-col gap-7 rounded-[20px] bg-white/80 p-6 md:p-9 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-12">
              <blockquote className="text-lg leading-[1.4] md:text-2xl md:leading-[1.33]">
                {t(`items.${key}.quote`)}
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <span aria-hidden="true" className="h-11 w-11 shrink-0 rounded-full bg-azure-mist" />
                <span>
                  <span className="block text-[15px] text-ink">{t(`items.${key}.name`)}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-ink-soft">{t(`items.${key}.role`)}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}

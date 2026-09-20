import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Reveal from '@/components/home/Reveal'
import PlanDetails from './PlanDetails'

// Named after rising winds, and drawn that way: the card gains surface, weight and shadow
// from Brise to Cyclone. No prices yet, on purpose — the detail lives in the table below,
// so the cards carry only what separates one pack from the next.
const PACKS = [
  { key: 'breeze', card: 'border-white bg-white/70', name: 'text-2xl' },
  {
    key: 'storm',
    card: 'border-azure/30 bg-white/90 shadow-[0_24px_48px_-28px_rgba(12,109,248,0.35)]',
    name: 'text-[26px]',
  },
  {
    key: 'cyclone',
    card: 'border-ink/15 bg-white/95 shadow-[0_28px_56px_-30px_rgba(11,11,12,0.3)]',
    name: 'text-[28px]',
  },
] as const

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
        {PACKS.map(({ key, card, name }) => (
          <li key={key} className={`flex flex-col rounded-[20px] border p-7 md:p-8 ${card}`}>
            <h3 className={name}>{t(`items.${key}.name`)}</h3>
            <p className="mt-3 max-w-[20rem] text-base leading-[1.6] text-ink-soft">{t(`items.${key}.description`)}</p>
            <p className="mt-6 mb-7 border-t border-[#DDDBD5] pt-5 text-base">{t(`items.${key}.highlight`)}</p>

            <Link
              href="/contact#newsletter"
              className="mt-auto flex h-[54px] items-center justify-center rounded-[10px] border border-ink-faint/80 bg-white text-base text-ink transition-colors duration-150 hover:border-ink hover:bg-[#F6F9FF]"
            >
              {t('cta')}
            </Link>
          </li>
        ))}
      </ul>

      <PlanDetails />
    </section>
  )
}

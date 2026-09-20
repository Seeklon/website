import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'

type Pillar = { title: string; body: string }

// Pourquoi / Comment / Quoi — the golden-circle columns from the Figma, opened by the
// section headline the rest of the site uses. A hairline above each column does the
// separating, so the sky stays visible between the texts.
export default function AboutPillars() {
  const t = useTranslations('About.pillars')
  const items = t.raw('items') as Pillar[]

  return (
    <section className="mx-auto mt-12 max-w-[1440px] px-6 md:mt-20 md:px-10 xl:px-20">
      <Reveal>
        <h2 className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] leading-[1.04] tracking-[-0.04em]">{t('title')}</h2>
      </Reveal>

      <ul className="mt-8 grid gap-10 md:mt-12 md:grid-cols-3 md:gap-8">
        {items.map((item) => (
          <li key={item.title} className="border-t border-ink/20 pt-6 md:pt-7">
            <h3 className="text-[26px] tracking-[-0.03em] md:text-[32px]">{item.title}</h3>
            <p className="mt-4 max-w-[24rem] text-base leading-[1.6] text-ink-soft md:text-[17px]">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'

type Pillar = { title: string; body: string }

// Pourquoi / Comment / Quoi — the golden-circle columns from the Figma. A hairline above
// each one does the separating, so the sky stays visible between the texts.
export default function AboutPillars() {
  const t = useTranslations('About.pillars')
  const items = t.raw('items') as Pillar[]

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-20 md:px-10 md:pt-[150px] xl:px-20">
      <Reveal>
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <li key={item.title} className="border-t border-ink/20 pt-6 md:pt-7">
              <h2 className="text-[26px] tracking-[-0.03em] md:text-[32px]">{item.title}</h2>
              <p className="mt-4 max-w-[24rem] text-base leading-[1.6] text-ink-soft md:text-[17px]">{item.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

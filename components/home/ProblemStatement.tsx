import { useTranslations } from 'next-intl'
import Reveal from './Reveal'

export default function ProblemStatement() {
  const t = useTranslations('Home.problem')

  // Left-aligned on phones: centred multi-line paragraphs are hard to read at that width.
  return (
    <section className="px-6 pt-24 md:pt-[190px] md:text-center">
      <Reveal>
        <h2 className="text-[clamp(2.25rem,0.9rem+5.9vw,6rem)] font-medium leading-[1.02] tracking-[-0.045em] md:leading-[0.98] md:tracking-[-0.05em]">
          <span className="block">{t('line1')}</span>
          <span className="block">{t('line2')}</span>
        </h2>
      </Reveal>
      <p className="mt-7 max-w-[36rem] text-base leading-[1.6] text-ink-soft md:mx-auto md:mt-9 md:text-balance md:text-[19px]">
        {t('body')}
      </p>
      <p className="mt-5 max-w-[33rem] text-base leading-[1.6] text-ink md:mx-auto md:mt-6 md:text-balance md:text-[19px]">
        {t('strong')}
      </p>
    </section>
  )
}

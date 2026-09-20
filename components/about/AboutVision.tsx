import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'

// The one sentence the whole product is measured against. The section headline names it,
// so the card carries the sentence alone — no label sitting above a title.
export default function AboutVision() {
  const t = useTranslations('About.vision')

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-[150px] xl:px-20">
      <Reveal>
        <h2 className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] leading-[1.04] tracking-[-0.04em]">{t('title')}</h2>
      </Reveal>

      <div className="mt-8 rounded-[24px] bg-white/85 px-7 py-12 md:mt-12 md:px-16 md:py-16">
        <p className="max-w-[58rem] text-balance text-[clamp(1.5rem,1rem+2.1vw,2.75rem)] leading-[1.22] tracking-[-0.03em]">
          {t('quote')}
        </p>
      </div>
    </section>
  )
}

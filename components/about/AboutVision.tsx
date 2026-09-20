import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'

// The one sentence the whole product is measured against. It sits on white so it reads as
// a statement rather than another paragraph of the page.
export default function AboutVision() {
  const t = useTranslations('About.vision')

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-[150px] xl:px-20">
      <Reveal>
        <div className="mx-auto max-w-[1080px] rounded-[24px] bg-white/85 px-7 py-12 text-center md:px-16 md:py-16">
          <p className="text-[15px] text-ink-faint">{t('label')}</p>
          <p className="mt-6 text-balance text-[clamp(1.5rem,1rem+2.1vw,2.75rem)] leading-[1.22] tracking-[-0.03em] md:mt-8">
            {t('quote')}
          </p>
        </div>
      </Reveal>
    </section>
  )
}

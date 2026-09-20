import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'

// The Figma fills this card with a stock sky. Drawing a fake one in CSS put a second blue
// block a few hundred pixels from the real clouds, and spent the deep blue the closing
// section is supposed to earn — so the prize sits on the same translucent white as the
// rest of the site, and the page's own sky shows through it.
export default function AboutHackathon() {
  const t = useTranslations('About.hackathon')

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-[150px] xl:px-20">
      <Reveal>
        <h2 className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] leading-[1.04] tracking-[-0.04em]">
          <span className="block">{t('line1')}</span>
          <span className="block">{t('line2')}</span>
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,608fr)_minmax(0,540fr)] lg:items-start lg:gap-20">
        <div className="flex min-h-[260px] flex-col justify-center rounded-[24px] bg-white/75 p-8 md:min-h-[400px] md:p-10 lg:aspect-[608/460] lg:min-h-0">
          <p className="max-w-[14ch] text-[clamp(1.75rem,1.2rem+1.7vw,2.75rem)] leading-[1.1] tracking-[-0.03em]">
            {t('award')}
          </p>
          <p className="mt-5 text-[15px] text-ink-soft md:text-base">{t('caption')}</p>
        </div>

        <div>
          <p className="max-w-[34rem] text-base leading-[1.6] text-ink-soft md:text-[19px]">{t('body')}</p>
          <p className="mt-5 max-w-[34rem] text-base leading-[1.6] text-ink-soft md:text-[19px]">{t('after')}</p>
        </div>
      </div>
    </section>
  )
}

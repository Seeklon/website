import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'

// The Figma fills this card with a stock sky; ours is drawn in CSS from the same blue as
// the rest of the site, so there is no photo to load and no second blue to justify.
export default function AboutHackathon() {
  const t = useTranslations('About.hackathon')

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-[150px] xl:px-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,608fr)_minmax(0,540fr)] lg:items-center lg:gap-20">
        <div className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[24px] bg-[linear-gradient(168deg,#2C86FF_0%,#0E62E6_45%,#0A4EBC_100%)] p-8 text-white md:min-h-[400px] md:p-10 lg:aspect-[608/460] lg:min-h-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background:radial-gradient(58%_42%_at_16%_18%,rgba(255,255,255,0.42),transparent_68%),radial-gradient(52%_36%_at_88%_10%,rgba(255,255,255,0.32),transparent_70%),radial-gradient(64%_40%_at_70%_96%,rgba(255,255,255,0.22),transparent_72%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(180deg,rgba(10,78,188,0)_0%,rgba(10,78,188,0.55)_58%,rgba(9,66,160,0.8)_100%)]"
          />
          <div className="relative">
            <p className="max-w-[14ch] text-[clamp(1.75rem,1.2rem+1.7vw,2.75rem)] leading-[1.1] tracking-[-0.03em]">
              {t('award')}
            </p>
            <p className="mt-5 text-[15px] text-white md:text-base">{t('caption')}</p>
          </div>
        </div>

        <div>
          <Reveal>
            <h2 className="text-[clamp(2rem,1.2rem+2.8vw,4rem)] leading-[1.04] tracking-[-0.04em]">
              <span className="block">{t('line1')}</span>
              <span className="block">{t('line2')}</span>
            </h2>
          </Reveal>
          <p className="mt-6 max-w-[34rem] text-base leading-[1.6] text-ink-soft md:mt-8 md:text-[19px]">{t('body')}</p>
          <p className="mt-5 max-w-[34rem] text-base leading-[1.6] text-ink-soft md:text-[19px]">{t('after')}</p>
        </div>
      </div>
    </section>
  )
}

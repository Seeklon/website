import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Reveal from './Reveal'

// First section of the deep-blue sky. SkyBackground reads `data-sky-deep` and
// `--deep-full` to blend its clouds into this blue; the blue itself is plain CSS so the
// white copy keeps its contrast with or without WebGL.
export default function ClosingCta({ namespace = 'Home.closing' }: { namespace?: string }) {
  const t = useTranslations(namespace)

  return (
    <section data-sky-deep className="relative text-white [--deep-full:150px] md:[--deep-full:240px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(14,98,230,0)_0px,#0E62E6_var(--deep-full),#0C5AD9_100%)]"
      />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 pt-[200px] md:px-10 md:pt-[300px] lg:flex-row lg:items-end lg:justify-between xl:px-20">
        <div>
          <Reveal>
            <h2 className="text-[clamp(2.625rem,1rem+6.7vw,7rem)] font-medium leading-none tracking-[-0.045em] md:leading-[0.95] md:tracking-[-0.05em]">
              <span className="block">{t('line1')}</span>
              <span className="accent-shine-soft block">{t('line2')}</span>
            </h2>
          </Reveal>
          <p className="mt-8 max-w-[34rem] text-base leading-[1.6] md:text-[19px]">{t('body')}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
          <Link
            href="/contact"
            className="inline-flex h-[52px] items-center justify-center rounded-[10px] bg-white px-8 text-base text-ink transition-colors duration-150 hover:bg-[#EAF2FF]"
          >
            {t('cta')}
          </Link>
          <p className="text-sm text-white/90">{t('note')}</p>
        </div>
      </div>
    </section>
  )
}

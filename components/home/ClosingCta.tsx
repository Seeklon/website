import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Reveal from './Reveal'

// First section of the deep-blue sky. SkyBackground reads `data-sky-deep` and
// `--deep-full` to blend its clouds into this blue; the blue itself is plain CSS so the
// white copy keeps its contrast with or without WebGL.
export default function ClosingCta({
  namespace = 'Home.closing',
  href = '/contact',
}: {
  namespace?: string
  href?: string
}) {
  const t = useTranslations(namespace)

  return (
    <section data-sky-deep className="relative text-white [--deep-full:260px] [--deep-lead:340px] md:[--deep-full:420px] md:[--deep-lead:560px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[calc(-1*var(--deep-lead))] -z-20 bg-[linear-gradient(180deg,rgba(14,98,230,0)_0px,rgba(14,98,230,0.22)_calc(var(--deep-lead)*0.55),rgba(14,98,230,0.72)_calc(var(--deep-lead)+var(--deep-full)*0.45),#0E62E6_calc(var(--deep-lead)+var(--deep-full)),#0C5AD9_100%)]"
      />
      {/* One column, in reading order: the headline, what it means, then the way out.
          The button used to face the headline across the page, which read as two
          unrelated blocks on the one screen people leave with. */}
      <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-[300px] md:px-10 md:pb-32 md:pt-[460px] xl:px-20">
        <Reveal>
          <h2 className="text-[clamp(2.625rem,1rem+6.7vw,7rem)] font-medium leading-none tracking-[-0.045em] md:leading-[0.95] md:tracking-[-0.05em]">
            <span className="block">{t('line1')}</span>
            <span className="accent-shine-soft block">{t('line2')}</span>
          </h2>
        </Reveal>
        <p className="mt-8 max-w-[34rem] text-base leading-[1.6] md:text-[19px]">{t('body')}</p>
        <Link
          href={href}
          className="mt-9 inline-flex h-[52px] items-center justify-center rounded-[10px] bg-white px-8 text-base text-ink transition-colors duration-150 hover:bg-[#EAF2FF]"
        >
          {t('cta')}
        </Link>
        <p className="mt-3 text-sm text-white/90">{t('note')}</p>
      </div>
    </section>
  )
}

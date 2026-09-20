import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import SkyShell from '@/components/home/SkyShell'
import ClosingCta from '@/components/home/ClosingCta'
import { ArrowRight } from 'lucide-react'

const EXITS = [
  { key: 'home', href: '/' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const

// A missing page is still a page of this site: same sky, same nav, same way out. Next's
// own 404 is white, English and has no link at all.
export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <SkyShell>
      <section className="px-6 pt-[136px] md:pt-[180px] md:text-center">
        <p className="text-[15px] text-ink-faint">{t('code')}</p>
        <h1 className="mt-4 text-balance text-[clamp(2.25rem,0.9rem+5.9vw,6rem)] font-medium leading-[1.02] tracking-[-0.045em] md:leading-[0.98] md:tracking-[-0.05em]">
          <span className="block">{t('line1')}</span>
          <span className="block font-genoid text-[0.85em] font-bold tracking-[0.03em] text-azure">{t('line2')}</span>
        </h1>
        <p className="mt-8 max-w-[44rem] text-base leading-[1.6] text-ink-soft md:mx-auto md:mt-9 md:text-balance md:text-[19px]">
          {t('body')}
        </p>
      </section>

      <nav aria-label={t('exitsLabel')} className="mx-auto mt-12 max-w-[1440px] px-6 md:mt-16 md:px-10 xl:px-20">
        <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {EXITS.map(({ key, href }) => (
            <li key={key} className="flex">
              <Link
                href={href}
                className="group flex w-full flex-col rounded-[24px] border border-white bg-white/85 p-7 transition-colors duration-150 hover:bg-white md:p-9"
              >
                <span className="text-[26px] tracking-[-0.03em]">{t(`exits.${key}.title`)}</span>
                <span className="mt-3 text-base leading-[1.6] text-ink-soft">{t(`exits.${key}.body`)}</span>
                <span className="mt-6 flex items-center gap-2 text-base text-azure-deep">
                  {t(`exits.${key}.action`)}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-150 motion-safe:group-hover:translate-x-1"
                    strokeWidth={1.8}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ClosingCta namespace="NotFound.closing" href="/contact" />
    </SkyShell>
  )
}

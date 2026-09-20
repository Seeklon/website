import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import SeeklonWordmark from './SeeklonWordmark'

const COLUMNS = [
  { title: 'product', links: [['journey', '/#parcours'], ['pricing', '/pricing'], ['demo', '/contact']] },
  { title: 'company', links: [['about', '/about'], ['blog', '/blog'], ['contact', '/contact']] },
  { title: 'legal', links: [['legalNotice', '/legal'], ['privacy', '/privacy'], ['cookies', '/rgpd']] },
] as const

export default function HomeFooter() {
  const t = useTranslations('Home.footer')

  // White copy throughout: light blues fall under 4.5:1 once a cloud drifts behind them.
  return (
    <footer className="relative text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,#0C5AD9_0%,#0A52CC_100%)]"
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-[140px] md:px-10 md:pt-[220px] xl:px-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,710px)] lg:gap-10">
          <div>
            <Link href="/" aria-label={t('home')} className="inline-flex text-white">
              <SeeklonWordmark className="h-[22px] w-auto" />
            </Link>
            <p className="mt-8 text-[15px]">{t('tagline')}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
            {COLUMNS.map(({ title, links }) => (
              <nav key={title} aria-labelledby={`footer-${title}`}>
                <h3 id={`footer-${title}`} className="text-sm font-medium">
                  {t(title)}
                </h3>
                <ul className="mt-4 space-y-1">
                  {links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="inline-block py-1.5 text-[15px] underline-offset-4 hover:underline">
                        {t(label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-start justify-between gap-6 border-t border-white/25 pt-6 text-sm md:mt-24">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <a
            href="https://www.linkedin.com/company/seeklon/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 underline-offset-4 hover:underline"
          >
            {t('linkedin')}
          </a>
        </div>
      </div>
    </footer>
  )
}

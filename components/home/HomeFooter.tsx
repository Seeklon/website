import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import SeeklonWordmark from './SeeklonWordmark'

const COLUMNS = [
  { title: 'product', links: [['journey', '/#parcours'], ['pricing', '/pricing'], ['demo', '/contact']] },
  { title: 'company', links: [['about', '/about'], ['blog', '/blog'], ['contact', '/contact']] },
  { title: 'legal', links: [['legalNotice', '/legal'], ['privacy', '/privacy'], ['cookies', '/rgpd']] },
] as const

export default function HomeFooter() {
  const t = useTranslations('Home.footer')

  // The page ends at night: the sky goes pale blue, deep blue, then this navy, which is what
  // says "footer" without a line or a box. It comes in over the first 220px so the blue
  // above melts into it, and it sits over the clouds (-z-[5], the sky is at -10) — weather
  // belongs to the page, not to the list of links under it.
  return (
    <footer className="relative text-white">
      {/* Two grounds. The blue one lies under the sky, as the closing section's does, so the
          clouds that cross into the footer still have their blue behind them; the navy one
          lies over the sky and takes over from it. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[#0C5AD9]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(7,24,64,0)_0px,rgba(7,24,64,0.55)_90px,#071840_220px,#05112E_100%)]"
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-[150px] md:px-10 md:pt-[210px] xl:px-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,710px)] lg:gap-10">
          {/* A column: as two inline links they sat side by side, and the margin between them
              did nothing. */}
          <div className="flex flex-col items-start">
            <Link href="/" aria-label={t('home')} className="inline-flex text-white">
              <SeeklonWordmark className="h-[22px] w-auto" />
            </Link>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-[15px] underline-offset-4 hover:underline"
            >
              {t('tagline')}
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </Link>
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

        <div className="mt-16 flex items-start justify-between gap-6 border-t border-white/15 pt-6 text-sm md:mt-24">
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

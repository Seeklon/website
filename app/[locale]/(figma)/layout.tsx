import { useTranslations } from 'next-intl'
import { hostGrotesk, genoid } from '@/app/fonts'
import SkyBackground from '@/components/home/SkyBackground'
import HomeNav from '@/components/home/HomeNav'
import HomeFooter from '@/components/home/HomeFooter'

// Pages rebuilt from the Figma file share one shell: the procedural sky, the floating
// nav and the footer. Each page ends with its own ClosingCta, which marks where the sky
// turns deep blue.
export default function FigmaLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Home.nav')

  return (
    <div
      className={`home ${hostGrotesk.variable} ${genoid.variable} relative isolate overflow-x-clip bg-[linear-gradient(180deg,#F4F8FF_0%,#E4EDFC_55%,#DAE7FB_100%)] font-grotesk text-ink`}
    >
      <SkyBackground />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[10px] focus:bg-white focus:px-4 focus:py-3 focus:text-ink focus:shadow-[0_14px_34px_-20px_rgba(11,11,12,0.45)]"
      >
        {t('skip')}
      </a>
      <HomeNav />
      <main id="contenu">{children}</main>
      <HomeFooter />
    </div>
  )
}

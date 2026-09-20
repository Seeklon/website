import { hostGrotesk, genoid } from '@/app/fonts'
import SkyBackground from '@/components/home/SkyBackground'
import HomeNav from '@/components/home/HomeNav'
import HomeFooter from '@/components/home/HomeFooter'

// Pages rebuilt from the Figma file share one shell: the procedural sky, the floating
// nav and the footer. Each page ends with its own ClosingCta, which marks where the sky
// turns deep blue.
export default function FigmaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`home ${hostGrotesk.variable} ${genoid.variable} relative isolate overflow-x-clip bg-[linear-gradient(180deg,#F4F8FF_0%,#E4EDFC_55%,#DAE7FB_100%)] font-grotesk text-ink`}
    >
      <SkyBackground />
      <HomeNav />
      <main>{children}</main>
      <HomeFooter />
    </div>
  )
}

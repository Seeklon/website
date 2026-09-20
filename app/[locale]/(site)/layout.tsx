import { cabinetGrotesk, jakarta } from '@/app/fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${jakarta.variable} ${cabinetGrotesk.variable} font-sans`}>
      <Header />
      <main className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

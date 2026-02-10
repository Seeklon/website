import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import Button from '@/components/Button'
import { Bot, Share2, MessageSquare, CheckCircle2, XCircle, ArrowRight, Star } from 'lucide-react'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export default async function ProductPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <div className="bg-background overflow-hidden">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-8 leading-tight">
              Une suite complète pour <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                piloter vos recrutements.
              </span>
            </h1>
            <p className="font-sans text-xl text-text-muted mb-10 leading-relaxed">
              De la rédaction de l&apos;offre à l&apos;entretien final, Seeklon automatise vos tâches les plus chronophages.
            </p>
            <div className="relative w-full aspect-video bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden group">
              <div className="absolute inset-0 bg-slate-800/50 flex flex-col p-6">
                <div className="h-12 w-full border-b border-white/10 flex items-center justify-between px-4 mb-6">
                  <div className="flex gap-4">
                    <div className="w-32 h-4 bg-white/10 rounded"></div>
                    <div className="w-20 h-4 bg-white/5 rounded"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary"></div>
                </div>
                <div className="flex gap-6 h-full">
                  <div className="w-64 h-full bg-white/5 rounded-lg p-4 space-y-3 hidden md:block">
                    {[1,2,3,4].map(i => <div key={i} className="w-full h-8 bg-white/5 rounded"></div>)}
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between">
                      <div className="w-48 h-8 bg-white/10 rounded"></div>
                      <div className="w-24 h-8 bg-primary/20 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[1,2,3].map(i => <div key={i} className="h-24 bg-white/5 rounded-lg border border-white/5"></div>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 bg-white text-text-main px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2 animate-bounce-slow">
                <Bot className="text-primary" size={20} />
                <span>IA Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold mb-12">Pourquoi changer ?</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm relative overflow-hidden">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle size={20}/></span>
                Recrutement Traditionnel
              </h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3"><span className="text-red-400">✕</span> Rédaction d&apos;offre laborieuse</li>
                <li className="flex gap-3"><span className="text-red-400">✕</span> Multidiffusion manuelle</li>
                <li className="flex gap-3"><span className="text-red-400">✕</span> Tri manuel sur Excel</li>
                <li className="flex gap-3"><span className="text-red-400">✕</span> Entretiens mal préparés</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-lg relative overflow-hidden ring-1 ring-green-500/20">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={20}/></span>
                Avec Seeklon
              </h3>
              <ul className="space-y-4 text-slate-700 font-medium">
                <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> Aide à la rédaction par IA</li>
                <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> 1 clic pour diffuser partout</li>
                <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> L&apos;IA pré-sélectionne le Top 10%</li>
                <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> Guide d&apos;entretien généré automatiquement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-main mb-8">
            Prêt à moderniser votre recrutement ?
          </h2>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 text-xl rounded-full shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform">
              Démarrer la Bêta Gratuite
            </Button>
          </Link>
          <p className="mt-6 text-text-muted text-sm">Aucune carte bancaire requise • Installation en 2 min</p>
        </div>
      </section>
    </div>
  )
}

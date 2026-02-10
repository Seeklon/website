import { Link } from '@/i18n/navigation'
import Button from '@/components/Button'
import { Bot, Share2, MessageSquare, CheckCircle2, XCircle, Star, ArrowRight } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export default async function ProductPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Product')

  return (
    <div className="bg-background overflow-hidden">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-8 leading-tight">
              {t('titleLine1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                {t('titleLine2')}
              </span>
            </h1>
            <p className="font-sans text-xl text-text-muted mb-10 leading-relaxed">
              {t('intro')}
            </p>
            <div className="relative w-full aspect-video bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden group">
              <video
                src="/prez.webm"
                poster="/capdshbrdseeklon.png"
                muted
                autoPlay
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                aria-label={t('aiActive')}
              />
              <div className="absolute bottom-6 right-6 bg-white text-text-main px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
                <Bot className="text-primary" size={20} />
                <span>{t('aiActive')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold mb-12">{t('whyChange')}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-lg relative overflow-hidden ring-1 ring-green-500/20">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={20}/></span>
                {t('withSeeklon')}
              </h3>
              <ul className="space-y-4 text-slate-700 font-medium">
                <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> {t('s1')}</li>
                <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> {t('s2')}</li>
                <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> {t('s3')}</li>
                <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> {t('s4')}</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm relative overflow-hidden">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle size={20}/></span>
                {t('traditional')}
              </h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3"><span className="text-red-400">✕</span> {t('t1')}</li>
                <li className="flex gap-3"><span className="text-red-400">✕</span> {t('t2')}</li>
                <li className="flex gap-3"><span className="text-red-400">✕</span> {t('t3')}</li>
                <li className="flex gap-3"><span className="text-red-400">✕</span> {t('t4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES */}
      <section className="py-24">
        <div className="container mx-auto px-4 space-y-24">

          {/* Feature 1 : IA */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] bg-gradient-to-br from-primary/5 to-blue-50 rounded-3xl border border-primary/10 flex items-center justify-center p-8">
              <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-4 max-w-sm border border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <span className="font-bold text-slate-700">{t('candidateCardTitle')}</span>
                  <div className="flex gap-0.5 items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-100 rounded w-3/4" />
                  <div className="h-2 bg-slate-100 rounded w-1/2" />
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-primary uppercase mb-2">{t('candidateCardLabel')}</p>
                  <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg leading-relaxed">
                    &quot;{t('candidateCardQuote')}&quot;
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Bot size={24} />
              </div>
              <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">{t('aiProfilesTitle')}</h2>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                {t('aiProfilesDesc')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-main"><CheckCircle2 size={18} className="text-primary" /> {t('aiProfilesBullet1')}</li>
                <li className="flex items-center gap-2 text-text-main"><CheckCircle2 size={18} className="text-primary" /> {t('aiProfilesBullet2')}</li>
              </ul>
            </div>
          </div>

          {/* Feature 2 : Centralisation */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Share2 size={24} />
              </div>
              <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">{t('diffuseTitle')}</h2>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                {t('diffuseDesc')}
              </p>
              <Link href="/contact">
                <span className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                  {t('diffuseLink').replace(/\s*→\s*$/, '')} <ArrowRight size={16} />
                </span>
              </Link>
            </div>
            <div className="relative h-[400px] bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-purple-100 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold animate-pulse">in</div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-700 rounded-xl shadow-lg flex items-center justify-center text-white font-bold animate-pulse" style={{ animationDelay: '0.5s' }}>in</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-white border-4 border-primary rounded-full shadow-2xl flex items-center justify-center z-10">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">
                    <Share2 size={20} />
                  </div>
                </div>
                <svg className="absolute inset-0 w-full h-full text-slate-300 -z-0" viewBox="0 0 100 100" aria-hidden>
                  <line x1="20" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                  <line x1="80" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Feature 3 : Aide à l'entretien */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden flex items-center justify-center">
              <div className="w-3/4 bg-white shadow-xl rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t('interviewCardTitle')}</h4>
                    <p className="text-xs text-slate-400">{t('interviewCardSubtitle')}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-700 mb-1">{t('interviewSuggestedLabel')}</p>
                    <p className="text-sm text-slate-600 italic">&quot;{t('interviewSuggestedQuestion')}&quot;</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-700 mb-1">{t('interviewVigilanceLabel')}</p>
                    <p className="text-sm text-slate-600 italic">&quot;{t('interviewVigilancePoint')}&quot;</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <MessageSquare size={24} />
              </div>
              <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">{t('interviewTitle')}</h2>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                {t('interviewDesc')}
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-main mb-8">
            {t('ctaTitle')}
          </h2>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 text-xl rounded-full shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform">
              {t('ctaButton')}
            </Button>
          </Link>
          <p className="mt-6 text-text-muted text-sm">{t('ctaNote')}</p>
        </div>
      </section>
    </div>
  )
}

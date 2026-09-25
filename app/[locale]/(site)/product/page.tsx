import { Link } from '@/i18n/navigation'
import Button from '@/components/Button'
import { Bot, Share2, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return pageMetadata({ locale, path: '/product', title: t('homeTitle'), description: t('homeDescription') })
}

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
              <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                {t('titleLine2')}
              </span>
            </h1>
            <p className="font-sans text-xl text-text-muted mb-10 leading-relaxed">
              {t('intro')}
            </p>
            <div className="relative w-full aspect-video bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden group">
              {/* 7.3 MB of video used to download on arrival. It now waits for a play,
                  behind a poster. */}
              <video
                src="/prez.webm"
                poster="/capdshbrdseeklon.png"
                controls
                muted
                loop
                playsInline
                preload="none"
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

      {/* 3. DEEP DIVE FEATURES */}
      <section className="py-24">
        <div className="container mx-auto px-4 space-y-24">

          {/* Feature 1 : IA */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] bg-gradient-to-br from-primary/5 to-blue-50 rounded-3xl border border-primary/10 flex items-center justify-center p-8">
              <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-4 max-w-sm border border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <span className="font-bold text-slate-700">{t('candidateCardTitle')}</span>
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
              <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">{t('aiProfilesTitleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('aiProfilesTitleAccent')}</span></h2>
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
          <div className="max-w-3xl mx-auto">
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Share2 size={24} />
              </div>
              <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">{t('diffuseTitleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('diffuseTitleAccent')}</span></h2>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                {t('diffuseDesc')}
              </p>
              <Link href="/contact">
                <span className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                  {t('diffuseLink').replace(/\s*→\s*$/, '')} <ArrowRight size={16} />
                </span>
              </Link>
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
              <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">{t('interviewTitleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('interviewTitleAccent')}</span></h2>
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
            {t('ctaTitleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('ctaTitleAccent')}</span>
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

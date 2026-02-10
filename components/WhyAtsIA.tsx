"use client"

import { Clock, PiggyBank, Trophy, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function WhyAtsIA() {
  const t = useTranslations('WhyAtsIA')
  return (
    <section className="py-20 bg-gradient-to-b from-white to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 -left-20 w-[500px] h-[500px] bg-primary-light/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-main mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-text-muted leading-relaxed max-w-3xl mx-auto">
              {t('intro')} <span className="font-bold text-green-600">{t('highlight')}</span> {t('introEnd')}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-glass-border p-8 md:p-12 mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-main leading-relaxed mb-6">
                <span className="font-bold text-primary">{t('bodyStart')}</span>, {t('bodyMiddle')} <span className="font-semibold text-green-600">{t('zeroFalseNegative')}</span> {t('bodyEnd')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                  <Clock className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">{t('savingsTitle')}</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed">{t('savingsDesc')}</p>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                  <PiggyBank className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">{t('costTitle')}</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed">{t('costDesc')}</p>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                  <Trophy className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">{t('qualityTitle')}</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed">{t('qualityDesc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-text-main rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-primary/30">
                    <Shield className="text-primary-light" size={32} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold mb-2">{t('trustTitle')}</h3>
                  <p className="text-slate-300 leading-relaxed">{t('trustDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

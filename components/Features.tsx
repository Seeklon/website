"use client"

import { FileText, Share2, Sparkles, MessageSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'

const stepKeys = ['step1', 'step2', 'step3', 'step4'] as const
const icons = [FileText, Share2, Sparkles, MessageSquare]

export default function Features() {
  const t = useTranslations('Features')
  return (
      <section id="product" className="py-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-primary-light/15 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('titleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('titleAccent')}</span>
            </h2>
            <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-10">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10"></div>

            {stepKeys.map((key, index) => {
              const Icon = icons[index]
              return (
                <div key={key} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-3xl bg-white border-4 border-background shadow-xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl group-hover:bg-primary/10 transition-colors"></div>
                    <Icon size={32} className="text-primary" strokeWidth={1.5} />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text-main mb-3">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="font-sans text-text-muted leading-relaxed text-sm max-w-xs">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
  )
}

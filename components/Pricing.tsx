'use client'

import Button from './Button'
import { Check } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function Pricing() {
    const t = useTranslations('Pricing')
    return (
        <section id="pricing" className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-6">
                        {t('titleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('titleAccent')}</span>
                    </h2>
                    <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h3 className="font-heading text-xl font-bold text-text-main mb-2"><span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('beta')}</span></h3>
                        <div className="text-3xl font-bold text-primary mb-6">{t('free')}</div>
                        <p className="text-sm text-text-muted mb-6 h-10">{t('betaDesc')}</p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-text-muted"><Check size={18} className="text-green-500" /> {t('beta1')}</li>
                            <li className="flex items-center gap-3 text-sm text-text-muted"><Check size={18} className="text-green-500" /> {t('beta2')}</li>
                            <li className="flex items-center gap-3 text-sm text-text-muted"><Check size={18} className="text-green-500" /> {t('beta3')}</li>
                        </ul>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full py-3 rounded-xl border-primary text-primary hover:bg-primary/5">{t('betaCta')}</Button>
                        </Link>
                    </div>

                    <div className="relative p-8 rounded-3xl bg-white border-2 border-primary shadow-xl scale-105 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                            {t('recommended')}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-text-main mb-2"><span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('standard')}</span></h3>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-primary">49€</span>
                            <span className="text-sm text-text-muted"> / {t('month')}</span>
                        </div>
                        <p className="text-sm text-text-muted mb-6 h-10">{t('standardDesc')}</p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-text-main font-medium"><Check size={18} className="text-primary" /> {t('standard1')}</li>
                            <li className="flex items-center gap-3 text-sm text-text-main font-medium"><Check size={18} className="text-primary" /> {t('standard2')}</li>
                            <li className="flex items-center gap-3 text-sm text-text-main font-medium"><Check size={18} className="text-primary" /> {t('standard3')}</li>
                            <li className="flex items-center gap-3 text-sm text-text-main font-medium"><Check size={18} className="text-primary" /> {t('standard4')}</li>
                        </ul>
                        <Link href="/contact">
                            <Button className="w-full py-3 rounded-xl bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20">{t('standardCta')}</Button>
                        </Link>
                    </div>

                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h3 className="font-heading text-xl font-bold text-text-main mb-2"><span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('enterprise')}</span></h3>
                        <div className="text-3xl font-bold text-primary mb-6">{t('custom')}</div>
                        <p className="text-sm text-text-muted mb-6 h-10">{t('enterpriseDesc')}</p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-text-muted"><Check size={18} className="text-green-500" /> {t('enterprise1')}</li>
                            <li className="flex items-center gap-3 text-sm text-text-muted"><Check size={18} className="text-green-500" /> {t('enterprise2')}</li>
                            <li className="flex items-center gap-3 text-sm text-text-muted"><Check size={18} className="text-green-500" /> {t('enterprise3')}</li>
                        </ul>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full py-3 rounded-xl border-primary text-primary hover:bg-primary/5">{t('enterpriseCta')}</Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

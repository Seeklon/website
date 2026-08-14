'use client'

import Image from 'next/image'
import { ArrowRight, Check, CreditCard, Mail } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

const BETA_FEATURES = ['beta1', 'beta2', 'beta3', 'beta4', 'beta5', 'beta6'] as const

export default function Pricing() {
    const t = useTranslations('Pricing')

    return (
        <section id="pricing" className="bg-background pb-16 pt-10 md:pb-20 md:pt-14">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <div className="mb-4 flex items-center justify-center gap-2 text-sm font-bold text-primary">
                        <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
                        {t('betaBadge')}
                    </div>
                    <h1 className="mb-5 font-heading text-4xl font-bold text-text-main md:text-5xl">
                        {t('title')}
                    </h1>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <article className="rounded-lg border border-primary bg-white p-6 md:p-10">
                        <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="mb-2 text-sm font-bold uppercase text-primary">{t('currentOffer')}</p>
                                <h2 className="font-heading text-3xl font-bold text-text-main">{t('beta')}</h2>
                            </div>
                            <div className="shrink-0 sm:text-right">
                                <div className="mb-1 text-sm font-medium text-text-muted">
                                    <span className="mb-1 block text-xs font-semibold">{t('referencePriceLabel')}</span>
                                    <span className="text-lg">{t('referencePrice')}</span>
                                </div>
                                <div className="flex items-baseline gap-2 sm:justify-end">
                                    <span className="text-5xl font-extrabold text-primary">{t('currentPrice')}</span>
                                    <span className="font-bold text-primary">{t('duringBeta')}</span>
                                </div>
                            </div>
                        </div>

                        <ul className="mb-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                            {BETA_FEATURES.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm font-medium text-text-main">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                                    </span>
                                    {t(feature)}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/contact?plan=beta"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 sm:inline-flex sm:w-auto"
                        >
                            {t('betaCta')}
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>

                        <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-sm text-text-muted sm:grid-cols-3">
                            <p className="flex items-center gap-2"><CreditCard size={17} className="text-primary" aria-hidden="true" /> {t('noCard')}</p>
                            <p className="flex items-center gap-2"><Mail size={17} className="text-primary" aria-hidden="true" /> {t('replyTime')}</p>
                            <p className="flex items-center gap-2"><Check size={17} className="text-primary" aria-hidden="true" /> {t('noCommitment')}</p>
                        </div>
                    </article>

                    <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-text-muted">
                        {t('priceNote')}
                    </p>

                    <figure className="mt-10 overflow-hidden rounded-lg border border-slate-200 bg-white">
                        <Image
                            src="/product/capture-synthetic.webp"
                            alt={t('productPreviewAlt')}
                            width={1902}
                            height={827}
                            className="h-auto w-full"
                        />
                        <figcaption className="border-t border-slate-200 px-4 py-3 text-sm text-text-muted">
                            {t('productPreviewCaption')}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    )
}

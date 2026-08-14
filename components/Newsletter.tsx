'use client'

import { CheckCircle, Loader2 } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const FORMSPREE_NEWSLETTER_ID = 'xdaaoooe'
const PRIVACY_NOTICE_VERSION = '2026-08-11'

export default function Newsletter() {
    const t = useTranslations('Newsletter')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_NEWSLETTER_ID}`, {
                method: 'POST',
                body: new FormData(event.currentTarget),
                headers: { Accept: 'application/json' },
            })

            if (!response.ok) throw new Error('newsletter_submission_failed')
            setIsSuccess(true)
        } catch {
            setError(t('error'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="relative overflow-hidden bg-background py-12">
            <div className="container relative z-10 mx-auto px-4">
                <div className="mx-auto max-w-3xl rounded-lg border border-white/60 bg-white/50 p-8 text-center shadow-sm backdrop-blur-sm md:p-12">
                    <h2 className="mb-4 font-heading text-3xl font-bold text-primary">
                        {t('titleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('titleAccent')}</span>
                    </h2>
                    <p className="mb-8 font-sans text-lg text-text-muted">{t('subtitle')}</p>

                    {isSuccess ? (
                        <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-lg border border-green-200 bg-green-50 px-5 py-4 font-semibold text-green-800" role="status">
                            <CheckCircle size={20} aria-hidden="true" />
                            {t('success')}
                        </div>
                    ) : (
                        <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row" onSubmit={handleSubmit}>
                            <input type="hidden" name="consent_version" value={PRIVACY_NOTICE_VERSION} />
                            <input type="hidden" name="consent_source" value="website_footer_newsletter" />
                            <label htmlFor="newsletter-email" className="sr-only">{t('placeholder')}</label>
                            <input
                                id="newsletter-email"
                                name="email"
                                type="email"
                                placeholder={t('placeholder')}
                                className="flex-grow rounded-full border border-slate-200 bg-white px-6 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
                                {isSubmitting ? t('submitting') : t('submit')}
                            </button>
                        </form>
                    )}

                    <div aria-live="polite">
                        {error && <p className="mt-4 text-sm font-medium text-red-700">{error}</p>}
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                        {t('disclaimer')}{' '}
                        <Link href="/privacy" className="font-semibold text-primary hover:underline">{t('privacyLink')}</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

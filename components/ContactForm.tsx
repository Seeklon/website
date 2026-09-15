"use client"

import { Check, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Button from '@/components/Button'

export default function ContactForm() {
  const t = useTranslations('Contact')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    const response = await fetch('https://formspree.io/f/xpqqzzan', {
      method: 'POST',
      body: new FormData(event.currentTarget),
      headers: { Accept: 'application/json' },
    }).catch(() => null)
    setStatus(response?.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[32rem] flex-col items-start justify-center bg-white p-8 md:p-12" role="status">
        <span className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-electric"><Check size={24} /></span>
        <h2 className="font-display text-4xl font-bold tracking-[-0.03em]">{t('successTitle')}</h2>
        <p className="mt-4 max-w-md text-lg leading-8 text-ink-muted">{t('successMessage')}</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-8 font-bold text-electric underline">{t('sendAnother')}</button>
      </div>
    )
  }

  const fieldClass = 'w-full rounded-[12px] border border-ink/20 bg-paper px-4 py-3.5 text-base font-normal leading-7 text-ink placeholder:text-ink-muted transition-colors hover:border-ink/35 focus:border-electric focus:outline-none'

  return (
    <form className="bg-white p-8 md:p-12" onSubmit={handleSubmit} aria-describedby={status === 'error' ? 'contact-error' : undefined}>
      <h2 className="font-display text-3xl font-bold tracking-[-0.03em]">{t('sendMessage')}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <label className="grid gap-2 text-base font-bold" htmlFor="name">{t('name')}<input required id="name" name="name" autoComplete="name" className={fieldClass} placeholder={t('namePlaceholder')} /></label>
        <label className="grid gap-2 text-base font-bold" htmlFor="company">{t('company')}<input id="company" name="company" autoComplete="organization" className={fieldClass} placeholder={t('companyPlaceholder')} /></label>
        <label className="grid gap-2 text-base font-bold md:col-span-2" htmlFor="email">{t('email')}<input required id="email" name="email" type="email" autoComplete="email" className={fieldClass} placeholder={t('emailPlaceholder')} /></label>
        <label className="grid gap-2 text-base font-bold md:col-span-2" htmlFor="message">{t('message')}<textarea required id="message" name="message" rows={6} className={`${fieldClass} resize-y`} placeholder={t('messagePlaceholder')} /></label>
      </div>
      {status === 'error' && <p id="contact-error" className="mt-5 font-semibold text-red-700" role="alert">{t('errorConnection')}</p>}
      <Button type="submit" disabled={status === 'submitting'} className="mt-8 w-full md:w-auto">
        {status === 'submitting' ? <Loader2 size={19} className="animate-spin" aria-hidden="true" /> : <Send size={19} aria-hidden="true" />}
        {status === 'submitting' ? t('sending') : t('submit')}
      </Button>
    </form>
  )
}

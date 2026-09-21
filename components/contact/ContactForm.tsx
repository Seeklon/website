'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Check } from 'lucide-react'

const FORMSPREE_CONTACT_ID = 'xpqqzzan'

const FIELD =
  'w-full rounded-[10px] border border-[#DDDBD5] bg-white px-4 py-3.5 text-base text-ink placeholder:text-ink-faint focus:border-azure focus-visible:outline-none'

export default function ContactForm() {
  const t = useTranslations('Contact.form')
  const locale = useLocale()
  const uid = useId()
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const successRef = useRef<HTMLHeadingElement>(null)

  // The form is replaced by the confirmation, so without this a screen reader is left on
  // a page whose content changed under it silently.
  useEffect(() => {
    if (state === 'sent') successRef.current?.focus()
  }, [state])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = new FormData(event.currentTarget)
    setState('sending')
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT_ID}`, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      })
      setState(response.ok ? 'sent' : 'failed')
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') {
    return (
      <div role="status" aria-live="polite" className="rounded-[24px] bg-white/90 p-7 md:p-10">
        <p className="flex h-12 w-12 items-center justify-center rounded-full bg-azure/10">
          <Check aria-hidden="true" className="h-6 w-6 text-azure-deep" strokeWidth={2} />
        </p>
        <h2 ref={successRef} tabIndex={-1} className="mt-6 text-[26px] focus-visible:outline-none">
          {t('successTitle')}
        </h2>
        <p className="mt-3 max-w-[26rem] text-base leading-[1.6] text-ink-soft">{t('successBody')}</p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-8 rounded-[10px] border border-ink-faint/80 bg-white px-6 py-3 text-base text-ink transition-colors duration-150 hover:border-ink hover:bg-[#F6F9FF]"
        >
          {t('again')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[24px] bg-white/90 p-7 md:p-10">
      <h2 className="text-[26px]">{t('title')}</h2>

      <input type="hidden" name="_subject" value={t('subject')} />
      <input type="hidden" name="_language" value={locale} />
      <p className="hidden" aria-hidden="true">
        <label>
          {t('honeypot')}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <p className="flex flex-col gap-2">
          <label htmlFor={`${uid}-name`} className="text-[15px] text-ink-soft">
            {t('name')}
          </label>
          <input id={`${uid}-name`} name="name" type="text" required autoComplete="name" placeholder={t('namePlaceholder')} className={FIELD} />
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor={`${uid}-company`} className="text-[15px] text-ink-soft">
            {t('company')} <span className="text-ink-faint">({t('optional')})</span>
          </label>
          <input id={`${uid}-company`} name="company" type="text" autoComplete="organization" placeholder={t('companyPlaceholder')} className={FIELD} />
        </p>
      </div>

      <p className="mt-5 flex flex-col gap-2">
        <label htmlFor={`${uid}-email`} className="text-[15px] text-ink-soft">
          {t('email')}
        </label>
        <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" placeholder={t('emailPlaceholder')} className={FIELD} />
      </p>

      <p className="mt-5 flex flex-col gap-2">
        <label htmlFor={`${uid}-message`} className="text-[15px] text-ink-soft">
          {t('message')}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          required
          rows={5}
          placeholder={t('messagePlaceholder')}
          className={`${FIELD} resize-y`}
        />
      </p>

      {state === 'failed' ? (
        <p role="alert" className="mt-5 rounded-[10px] border border-azure/40 bg-[#F6F9FF] px-4 py-3 text-[15px] text-ink">
          {t('error')}
        </p>
      ) : null}

      <p className="mt-6 text-[14px] leading-[1.6] text-ink-soft">
        {t.rich('consent', {
          privacy: (chunks) => (
            <Link href="/privacy" className="text-azure-deep underline underline-offset-4">
              {chunks}
            </Link>
          ),
        })}
      </p>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="sheen relative mt-7 flex h-[54px] w-full items-center justify-center overflow-hidden rounded-[10px] bg-azure text-base font-medium text-white transition-colors duration-150 hover:bg-azure-deep disabled:bg-azure/70"
      >
        {state === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  )
}

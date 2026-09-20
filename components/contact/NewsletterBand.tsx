'use client'

import { useId, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'

const FORMSPREE_NEWSLETTER_ID = 'xdaaoooe'

// Closing band of the contact page: it carries `data-sky-deep`, so the sky turns blue here
// the way it does under the other pages' final call to action.
export default function NewsletterBand() {
  const t = useTranslations('Contact.news')
  const uid = useId()
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = new FormData(event.currentTarget)
    setState('sending')
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_NEWSLETTER_ID}`, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      })
      setState(response.ok ? 'sent' : 'failed')
    } catch {
      setState('failed')
    }
  }

  return (
    <section data-sky-deep className="relative text-white [--deep-full:150px] [--deep-lead:200px] md:[--deep-full:240px] md:[--deep-lead:300px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[calc(-1*var(--deep-lead))] -z-20 bg-[linear-gradient(180deg,rgba(14,98,230,0)_0px,rgba(14,98,230,0.22)_calc(var(--deep-lead)*0.55),rgba(14,98,230,0.72)_calc(var(--deep-lead)+var(--deep-full)*0.45),#0E62E6_calc(var(--deep-lead)+var(--deep-full)),#0C5AD9_100%)]"
      />
      <div className="mx-auto max-w-[1440px] px-6 pt-[200px] md:px-10 md:pt-[300px] xl:px-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-[18ch] text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              {t('title')}
            </h2>
            <p className="mt-5 max-w-[32rem] text-base leading-[1.6] md:text-[17px]">{t('body')}</p>
          </div>

          {state === 'sent' ? (
            <p className="mt-8 flex items-center gap-3 text-base lg:mt-0">
              <Check aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={2} />
              {t('success')}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 lg:mt-0">
              <label htmlFor={`${uid}-email`} className="block text-[15px] text-white/90">
                {t('label')}
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t('placeholder')}
                  className="h-[52px] flex-1 rounded-[10px] border border-white/40 bg-white/10 px-4 text-base text-white placeholder:text-white/70 focus:border-white focus-visible:outline-none"
                />
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="h-[52px] shrink-0 rounded-[10px] bg-white px-7 text-base text-ink transition-colors duration-150 hover:bg-[#EAF2FF] disabled:bg-white/70"
                >
                  {state === 'sending' ? t('sending') : t('submit')}
                </button>
              </div>
              {state === 'failed' ? (
                <p role="alert" className="mt-3 text-[15px] text-white">
                  {t('error')}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

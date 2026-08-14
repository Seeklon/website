'use client'

import Button from '@/components/Button'
import { Linkedin, MapPin, Send, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'

const PRIVACY_NOTICE_VERSION = '2026-08-11'

export default function ContactPage() {
  const t = useTranslations('Contact')
  const router = useRouter()
  const FORMSPREE_CONTACT_ID = 'xpqqzzan'
  const FORMSPREE_NEWSLETTER_ID = 'xdaaoooe'

  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [isSubmittingNews, setIsSubmittingNews] = useState(false)
  const [isSuccessNews, setIsSuccessNews] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get('plan')
    if (plan === 'beta' || plan === 'enterprise') setSelectedPlan(plan)
  }, [])

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingContact(true)
    const formData = new FormData(e.currentTarget)
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT_ID}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        window.gtag?.('event', 'generate_lead', {
          lead_source: 'website_contact',
          lead_type: selectedPlan || 'general',
        })
        router.push('/thank-you')
      }
      else alert(t('errorSend'))
    } catch {
      alert(t('errorConnection'))
    } finally {
      setIsSubmittingContact(false)
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingNews(true)
    const formData = new FormData(e.currentTarget)
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_NEWSLETTER_ID}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (response.ok) setIsSuccessNews(true)
      else alert(t('errorSubscribe'))
    } catch {
      alert(t('errorConnection'))
    } finally {
      setIsSubmittingNews(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[100px] animate-pulse duration-[5000ms]"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse duration-[7000ms]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-6">
            {t('title')} <br className="hidden md:block" />
            <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              {t('titleHighlight')}
            </span>
          </h1>
          <p className="font-sans text-xl text-text-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="mt-4 inline-flex rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-sm font-bold text-primary shadow-sm">
            {t('responseTime')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-text-main mb-6">{t('coordinates')}</h2>
              <a href="https://www.linkedin.com/company/seeklon" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/80 hover:scale-102 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 bg-[#0077b5] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">{t('social')}</p>
                  <p className="text-text-main font-medium group-hover:text-[#0077b5] transition-colors">{t('linkedin')}</p>
                </div>
              </a>
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all duration-300">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white shadow-md">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">{t('office')}</p>
                  <p className="text-text-main font-medium">Paris, France</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl shadow-blue-900/10 group">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <h3 className="font-heading text-xl font-bold mb-2 relative z-10">{t('stayInformedBefore')}<span className="font-accent italic text-white" style={{ fontWeight: 600 }}>{t('stayInformedAccent')}</span></h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">{t('stayInformedDesc')}</p>
              {!isSuccessNews ? (
                <form className="relative z-10" onSubmit={handleNewsletterSubmit}>
                  <input type="hidden" name="consent_version" value={PRIVACY_NOTICE_VERSION} />
                  <input type="hidden" name="consent_source" value="website_contact_newsletter" />
                  <div className="flex gap-2">
                  <label htmlFor="contact-newsletter-email" className="sr-only">{t('emailPlaceholder')}</label>
                  <input
                    id="contact-newsletter-email"
                    required
                    name="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-white/20 focus:border-primary transition-all text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNews}
                    aria-label={t('newsletterSubmitLabel')}
                    className="bg-primary hover:bg-primary-light text-white p-3 rounded-xl transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingNews ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                  </button>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    {t('newsletterPrivacyNotice')}{' '}
                    <Link href="/privacy" className="font-semibold text-slate-300 hover:text-white hover:underline">{t('privacyLink')}</Link>
                  </p>
                </form>
              ) : (
                <div className="relative z-10 flex items-center gap-3 text-green-400 font-medium animate-in fade-in slide-in-from-left-4">
                  <CheckCircle size={20} />
                  <span>{t('subscribed')}</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 h-full">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
              <h2 className="text-2xl font-bold text-text-main mb-8 flex items-center gap-2">
                {t('sendMessage')}
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </h2>
              {selectedPlan && (
                <p className="mb-6 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary">
                  {selectedPlan === 'beta' ? t('betaPlan') : t('enterprisePlan')}
                </p>
              )}
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <input type="hidden" name="offer" value={selectedPlan || 'general'} />
                <input type="hidden" name="privacy_notice_version" value={PRIVACY_NOTICE_VERSION} />
                <input type="hidden" name="submission_source" value="website_contact_form" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-text-muted ml-1">{t('name')}</label>
                    <input required name="name" id="name" type="text" className="w-full px-5 py-4 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium text-text-main placeholder-slate-400 shadow-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-semibold text-text-muted ml-1">{t('company')}</label>
                    <input name="company" id="company" type="text" className="w-full px-5 py-4 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium text-text-main placeholder-slate-400 shadow-sm" placeholder={t('companyPlaceholder')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-text-muted ml-1">{t('email')}</label>
                  <input required name="email" id="email" type="email" className="w-full px-5 py-4 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium text-text-main placeholder-slate-400 shadow-sm" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-text-muted ml-1">{t('message')}</label>
                  <textarea required name="message" id="message" rows={5} className="w-full px-5 py-4 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium text-text-main placeholder-slate-400 shadow-sm resize-none" placeholder={t('messagePlaceholder')}></textarea>
                </div>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-4 text-lg font-bold text-primary rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingContact ? t('sending') : (
                      <>
                        <Send size={20} />
                        {t('submit')}
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs leading-relaxed text-text-muted">
                  {t('privacyNotice')}{' '}
                  <Link href="/privacy" className="font-semibold text-primary hover:underline">
                    {t('privacyLink')}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

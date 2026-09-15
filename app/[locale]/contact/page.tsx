import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Contact' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: locale === 'fr' ? '/contact' : `/${locale}/contact`,
      languages: { fr: '/contact', en: '/en/contact', 'x-default': '/contact' },
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Contact')

  return (
    <div className="contact-readable bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <header className="grid gap-8 border-b border-ink/15 pb-12 md:grid-cols-12 md:items-end">
          <h1 className="display-title max-w-[10ch] md:col-span-7">{t('title')}</h1>
          <p className="max-w-xl text-lg leading-8 text-ink-muted md:col-span-5">{t('subtitle')}</p>
        </header>
        <div className="mt-12 grid overflow-hidden rounded-[16px] border border-ink/15 md:grid-cols-[0.8fr_1.2fr]">
          <aside className="bg-electric p-8 text-white md:p-12">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em]">{t('beforeDemoTitle')}</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-white">{t('beforeDemoText')}</p>
            <dl className="mt-10 space-y-7 border-t border-white/25 pt-7">
              <div><dt className="text-sm font-bold uppercase tracking-[0.12em] text-white">{t('emailLabel')}</dt><dd className="mt-1"><a className="font-bold underline" href="mailto:contact@seeklon.com">contact@seeklon.com</a></dd></div>
              <div><dt className="text-sm font-bold uppercase tracking-[0.12em] text-white">{t('office')}</dt><dd className="mt-1 font-bold">Paris, France</dd></div>
              <div><dt className="text-sm font-bold uppercase tracking-[0.12em] text-white">{t('social')}</dt><dd className="mt-1"><a className="font-bold underline" href="https://www.linkedin.com/company/seeklon" target="_blank" rel="noreferrer">LinkedIn</a></dd></div>
            </dl>
          </aside>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

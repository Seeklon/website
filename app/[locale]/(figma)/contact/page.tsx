import { setRequestLocale, getTranslations } from 'next-intl/server'
import { pageMetadata } from '@/lib/metadata'
import { useTranslations } from 'next-intl'
import ContactForm from '@/components/contact/ContactForm'
import ContactAside from '@/components/contact/ContactAside'
import NewsletterBand from '@/components/contact/NewsletterBand'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return pageMetadata({
    locale,
    path: '/contact',
    title: t('contactTitle'),
    description: t('contactDescription'),
    image: 'contact',
  })
}

function ContactHero() {
  const t = useTranslations('Contact.hero')
  return (
    <section className="px-6 pt-[136px] md:pt-[180px] md:text-center">
      <h1 className="text-balance text-[clamp(2.25rem,0.9rem+4.2vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.045em]">
        <span className="block">{t('line1')}</span>
        <span className="block font-genoid text-[0.85em] font-bold tracking-[0.03em] text-azure">{t('line2')}</span>
      </h1>
      <p className="mt-7 max-w-[40rem] text-base leading-[1.6] text-ink-soft md:mx-auto md:mt-8 md:text-balance md:text-[19px]">
        {t('body')}
      </p>
    </section>
  )
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <ContactHero />
      <section className="mx-auto mb-20 mt-12 max-w-[1440px] px-6 md:mb-32 md:mt-20 md:px-10 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <ContactForm />
          <ContactAside />
        </div>
      </section>
      <NewsletterBand />
    </>
  )
}

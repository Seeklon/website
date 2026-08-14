import { CheckCircle2, ArrowRight } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { buildPageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    ...buildPageMetadata({
    title: t('thankYouTitle'),
    description: t('thankYouDescription'),
    locale,
    path: '/thank-you',
    }),
    robots: { index: false, follow: false },
  }
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('ThankYou')

  return (
    <div className="min-h-screen bg-background px-4 py-24">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={34} />
        </div>
        <h1 className="font-heading text-4xl font-bold text-text-main md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
          {t('description')}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/product"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark"
          >
            {t('primaryCta')}
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-primary/20 px-7 py-3 font-bold text-primary transition-colors hover:bg-primary/5"
          >
            {t('secondaryCta')}
          </Link>
        </div>
      </section>
    </div>
  )
}

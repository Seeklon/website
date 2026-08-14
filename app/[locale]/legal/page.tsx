import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return buildPageMetadata({
    title: t('legalTitle'),
    description: t('legalDescription'),
    locale,
    path: '/legal',
  })
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Legal')

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold mb-8 text-primary">{t('titleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('titleAccent')}</span></h1>
      <div className="space-y-8 text-text-main font-sans">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('editorTitle')}</h2>
          <p className="whitespace-pre-line">{t('editorContent')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('hostingTitle')}</h2>
          <p className="whitespace-pre-line">{t('hostingContent')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('ipTitle')}</h2>
          <p>{t('ipContent')}</p>
        </section>
      </div>
    </div>
  )
}

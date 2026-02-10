import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Privacy')

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold mb-8 text-primary">{t('title')}</h1>
      <div className="space-y-8 text-text-main font-sans">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('collectTitle')}</h2>
          <p>{t('collectContent')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('useTitle')}</h2>
          <p className="mb-2">{t('useIntro')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('useLi1')}</li>
            <li>{t('useLi2')}</li>
            <li>{t('useLi3')}</li>
            <li>{t('useLi4')}</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('securityTitle')}</h2>
          <p>{t('securityContent')}</p>
        </section>
      </div>
    </div>
  )
}

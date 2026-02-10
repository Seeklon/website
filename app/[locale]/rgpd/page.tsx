import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export default async function RgpdPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Rgpd')

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold mb-8 text-primary">{t('title')}</h1>
      <div className="space-y-8 text-text-main font-sans">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('rightsTitle')}</h2>
          <p className="mb-2">{t('rightsContent')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('rightsLi1')}</li>
            <li>{t('rightsLi2')}</li>
            <li>{t('rightsLi3')}</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('cookiesTitle')}</h2>
          <p>{t('cookiesContent')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('dpoTitle')}</h2>
          <p>{t('dpoContent')}</p>
        </section>
      </div>
    </div>
  )
}

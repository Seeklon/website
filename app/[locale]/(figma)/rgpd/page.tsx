import { setRequestLocale, getTranslations } from 'next-intl/server'
import LegalPage from '@/components/legal/LegalPage'
import { pageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Rgpd' })
  return pageMetadata({ locale, path: '/rgpd', title: t('title'), description: t('rightsContent').slice(0, 155) })
}

export default async function Rgpd({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Rgpd')

  return (
    <LegalPage
      title1={t('titleBefore')}
      title2={t('titleAccent')}
      sections={[
        {
          title: t('rightsTitle'),
          content: t('rightsContent'),
          items: [t('rightsLi1'), t('rightsLi2'), t('rightsLi3')],
        },
        { title: t('cookiesTitle'), content: t('cookiesContent') },
        { title: t('dpoTitle'), content: t('dpoContent') },
      ]}
    />
  )
}

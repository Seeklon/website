import { setRequestLocale, getTranslations } from 'next-intl/server'
import LegalPage from '@/components/legal/LegalPage'
import { pageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Privacy' })
  return pageMetadata({ locale, path: '/privacy', title: t('title'), description: t('collectContent').slice(0, 155) })
}

export default async function Privacy({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Privacy')

  return (
    <LegalPage
      title1={t('titleBefore')}
      title2={t('titleAccent')}
      sections={[
        { title: t('collectTitle'), content: t('collectContent') },
        {
          title: t('useTitle'),
          content: t('useIntro'),
          items: [t('useLi1'), t('useLi2'), t('useLi3'), t('useLi4')],
        },
        { title: t('formsTitle'), content: t('formsContent') },
        { title: t('securityTitle'), content: t('securityContent') },
      ]}
    />
  )
}

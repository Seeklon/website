import { setRequestLocale, getTranslations } from 'next-intl/server'
import LegalPage from '@/components/legal/LegalPage'
import { pageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Legal' })
  return pageMetadata({ locale, path: '/legal', title: t('title'), description: t('editorContent').slice(0, 155) })
}

export default async function Legal({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Legal')

  return (
    <LegalPage
      title1={t('titleBefore')}
      title2={t('titleAccent')}
      sections={[
        { title: t('editorTitle'), content: t('editorContent') },
        { title: t('hostingTitle'), content: t('hostingContent') },
        { title: t('ipTitle'), content: t('ipContent') },
      ]}
    />
  )
}

import { getTranslations } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/seo'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return buildPageMetadata({
    title: t('contactTitle'),
    description: t('contactDescription'),
    locale,
    path: '/contact',
  })
}

export default function ContactLayout({ children }: Props) {
  return children
}

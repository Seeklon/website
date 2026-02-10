import Pricing from '@/components/Pricing'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export default async function PricingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="pt-20">
      <Pricing />
    </div>
  )
}

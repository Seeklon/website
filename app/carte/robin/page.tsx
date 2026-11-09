import BusinessCardPage, { businessCardMetadata } from '@/components/business-card/BusinessCardPage'
import { robinCard } from '@/lib/business-card'

export const metadata = businessCardMetadata(robinCard)

export default function RobinCardPage() {
  return <BusinessCardPage card={robinCard} />
}

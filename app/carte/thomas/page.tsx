import BusinessCardPage, { businessCardMetadata } from '@/components/business-card/BusinessCardPage'
import { thomasCard } from '@/lib/business-card'

export const metadata = businessCardMetadata(thomasCard)

export default function ThomasCardPage() {
  return <BusinessCardPage card={thomasCard} />
}

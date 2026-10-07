import QRCode from 'qrcode'
import type { Metadata } from 'next'
import ThomasCard from '@/components/business-card/ThomasCard'
import { cardIdentity, thomasCard, THOMAS_CARD_PATH } from '@/lib/business-card'
import { pageMetadata } from '@/lib/metadata'
import { createVCard } from '@/lib/vcard'

const { name, role } = cardIdentity(thomasCard)

export const metadata: Metadata = {
  ...pageMetadata({
    locale: 'fr',
    path: THOMAS_CARD_PATH,
    languages: ['fr'],
    title: `${name} — ${role}`,
    description: thomasCard.description,
  }),
  title: { absolute: `${name} — ${role}` },
  openGraph: {
    type: 'profile',
    title: `${name} — ${role}`,
    description: thomasCard.description,
    url: thomasCard.publicUrl,
    images: [{ url: thomasCard.artwork, width: 1280, height: 857, alt: thomasCard.artworkAlt }],
    firstName: thomasCard.firstName,
    lastName: thomasCard.lastName,
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${name} — ${role}`,
    description: thomasCard.description,
    images: [thomasCard.artwork],
  },
}

export default async function ThomasCardPage() {
  const qrDataUrl = await QRCode.toDataURL(thomasCard.publicUrl, {
    errorCorrectionLevel: 'M',
    margin: 4,
    scale: 16,
    color: { dark: '#111827ff', light: '#ffffffff' },
  })

  return (
    <ThomasCard
      card={thomasCard}
      qrDataUrl={qrDataUrl}
      vCardHref={`data:text/vcard;charset=utf-8,${encodeURIComponent(createVCard(thomasCard))}`}
    />
  )
}

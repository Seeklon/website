import QRCode from 'qrcode'
import type { Metadata } from 'next'
import ThomasCard from '@/components/business-card/ThomasCard'
import { cardIdentity, type BusinessCard } from '@/lib/business-card'
import { pageMetadata } from '@/lib/metadata'
import { createVCard } from '@/lib/vcard'

export function businessCardMetadata(card: BusinessCard): Metadata {
  const { name, role } = cardIdentity(card)

  return {
    ...pageMetadata({
      locale: 'fr',
      path: new URL(card.publicUrl).pathname,
      languages: ['fr'],
      title: `${name} — ${role}`,
      description: card.description,
    }),
    title: { absolute: `${name} — ${role}` },
    openGraph: {
      type: 'profile',
      title: `${name} — ${role}`,
      description: card.description,
      url: card.publicUrl,
      images: [{ url: card.artwork, width: 1280, height: 857, alt: card.artworkAlt }],
      firstName: card.firstName,
      lastName: card.lastName,
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} — ${role}`,
      description: card.description,
      images: [card.artwork],
    },
  }
}

export default async function BusinessCardPage({ card }: { card: BusinessCard }) {
  const qrDataUrl = await QRCode.toDataURL(card.publicUrl, {
    errorCorrectionLevel: 'M',
    margin: 4,
    scale: 16,
    color: { dark: '#111827ff', light: '#ffffffff' },
  })

  return (
    <ThomasCard
      card={card}
      qrDataUrl={qrDataUrl}
      vCardHref={`data:text/vcard;charset=utf-8,${encodeURIComponent(createVCard(card))}`}
    />
  )
}

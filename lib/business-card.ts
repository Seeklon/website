import { SITE_URL } from './site'

export type BusinessCard = {
  firstName: string
  lastName: string
  organization: string
  role: string
  description: string
  email: string | null
  phone: string | null
  linkedin: string | null
  website: string
  publicUrl: string
  artwork: string
  artworkAlt: string
  filename: string
}

export const THOMAS_CARD_PATH = '/carte/thomas'
export const ROBIN_CARD_PATH = '/carte/robin'

// Only use contact details supplied by Thomas or published in this repository.
// The production origin is maintained in lib/site.ts, never taken from the browser.
export const thomasCard: BusinessCard = {
  firstName: 'Thomas',
  lastName: 'Briand',
  organization: 'Seeklon',
  role: 'Cofondateur',
  description: 'Avec Seeklon, nous aidons les entreprises à comprendre et améliorer leurs décisions de recrutement grâce à une IA explicable.',
  email: 'Thomas.briand@seeklon.com',
  phone: null,
  linkedin: 'https://www.linkedin.com/in/thomas-briand-5ab11725b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  website: SITE_URL,
  publicUrl: new URL(THOMAS_CARD_PATH, SITE_URL).href,
  artwork: '/cards/thomas/seeklon-sky.jpg',
  artworkAlt: 'Seeklon — Recruter plus vite. Même sans équipe RH.',
  filename: 'thomas-briand-seeklon',
}

// Robin's name and LinkedIn were supplied by the user; his role is published in About.
// Email and phone remain hidden until explicitly confirmed.
export const robinCard: BusinessCard = {
  firstName: 'Robin',
  lastName: 'Biard',
  organization: 'Seeklon',
  role: 'Lead DevOps & SysAdmin',
  description: 'Avec Seeklon, nous aidons les entreprises à comprendre et améliorer leurs décisions de recrutement grâce à une IA explicable.',
  email: null,
  phone: null,
  linkedin: 'https://www.linkedin.com/in/robin-biard-262248260?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  website: SITE_URL,
  publicUrl: new URL(ROBIN_CARD_PATH, SITE_URL).href,
  artwork: '/cards/thomas/seeklon-sky.jpg',
  artworkAlt: 'Seeklon — Recruter plus vite. Même sans équipe RH.',
  filename: 'robin-biard-seeklon',
}

export const publicBusinessCards = [
  { path: THOMAS_CARD_PATH, card: thomasCard },
  { path: ROBIN_CARD_PATH, card: robinCard },
]

export function cardIdentity(card: BusinessCard) {
  return {
    name: `${card.firstName} ${card.lastName}`,
    role: `${card.role} — ${card.organization}`,
    address: card.publicUrl.replace(/^https:\/\//, ''),
  }
}

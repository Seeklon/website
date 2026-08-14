import type { Metadata } from 'next'

export const SITE_URL = 'https://www.seeklon.com'

const SOCIAL_IMAGE = {
  url: '/product/capture-synthetic.webp',
  width: 1902,
  height: 827,
  alt: 'Interface Seeklon de pilotage des candidatures',
}

type BuildMetadataOptions = {
  title: string
  description: string
  locale: string
  path?: string
  type?: 'website' | 'article'
}

export function getLocalizedPath(locale: string, path = '') {
  const normalizedPath = path === '/' ? '' : path
  const localePrefix = locale === 'fr' ? '' : `/${locale}`
  return `${localePrefix}${normalizedPath}`
}

export function buildPageMetadata({
  title,
  description,
  locale,
  path = '',
  type = 'website',
}: BuildMetadataOptions): Metadata {
  const localizedPath = getLocalizedPath(locale, path)
  const url = `${SITE_URL}${localizedPath}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Seeklon',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      type,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  }
}

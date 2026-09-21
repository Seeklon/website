import type { Metadata } from 'next'
import { SITE_URL } from './site'

/** French has no prefix (localePrefix: 'as-needed'), English does. */
export function localeUrl(locale: string, path = ''): string {
  const prefix = locale === 'en' ? '/en' : ''
  return `${SITE_URL}${prefix}${path}`
}

type Options = {
  locale: string
  /** Path without the locale prefix, e.g. '/pricing'. Empty for the home page. */
  path?: string
  title: string
  description: string
  /** File in public/og, without extension. */
  image?: string
  /** Locales where this page exists. Articles only exist in one language quite often. */
  languages?: string[]
  type?: 'website' | 'article'
}

/**
 * One place for what every page owes a crawler and a share card: a canonical URL, the
 * alternates that actually exist, and an image. The site shipped with none of it, so a
 * link posted on LinkedIn came out as bare text.
 */
export function pageMetadata({
  locale,
  path = '',
  title,
  description,
  image = 'home',
  languages = ['fr', 'en'],
  type = 'website',
}: Options): Metadata {
  const url = localeUrl(locale, path)
  const alternateLanguages = Object.fromEntries(languages.map((l) => [l, localeUrl(l, path)]))

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...alternateLanguages, 'x-default': localeUrl('fr', path) },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: 'Seeklon',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      images: [{ url: `/og/${image}.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og/${image}.png`],
    },
  }
}

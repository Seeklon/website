import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://landing.seeklon.com'
  const posts = getAllPosts()

  const routes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/pricing',
    '/product',
    '/legal',
    '/privacy',
    '/rgpd',
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}${prefix}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      })
    }
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}${prefix}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    }
  }

  return entries
}

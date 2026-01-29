import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://landing.seeklon.com'

  // Récupérer tous les articles de blog
  const posts = getAllPosts()
  
  // Créer les URLs pour les articles de blog
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Routes statiques
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...blogUrls]
}

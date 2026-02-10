import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { routing } from '@/i18n/routing'

function getPostsDirectory(locale: string): string {
  return path.join(process.cwd(), 'content/blog', locale)
}

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  category: string
  content: string
  draft?: boolean
  publishDate?: string
}

/**
 * Date utilisée pour la visibilité et l'affichage (publishDate si présent, sinon date).
 */
function getDisplayDate(post: Post): string {
  return post.publishDate ?? post.date
}

/**
 * Détermine si un article doit être publié :
 * - En production : pas de brouillon, date de publication passée ou aujourd'hui.
 * - En développement : tous les articles sont visibles (brouillons et dates futures inclus).
 */
function shouldPublish(post: Post): boolean {
  const isDev = process.env.NODE_ENV === 'development'

  if (post.draft === true) {
    return isDev
  }

  const displayDate = getDisplayDate(post)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const articleDate = new Date(displayDate)
  articleDate.setHours(0, 0, 0, 0)

  return articleDate <= today
}

export function getAllPosts(locale: string = routing.defaultLocale): Post[] {
  const postsDirectory = getPostsDirectory(locale)
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...(data as {
          title: string
          date: string
          excerpt: string
          coverImage: string
          category: string
          draft?: boolean
          publishDate?: string
        }),
      }
    })

  const published = allPostsData.filter(shouldPublish)
  return published.sort((a, b) => {
    const dateA = getDisplayDate(a)
    const dateB = getDisplayDate(b)
    return dateB.localeCompare(dateA)
  })
}

export function getPostBySlug(
  slug: string,
  locale: string = routing.defaultLocale
): Post | null {
  try {
    const postsDirectory = getPostsDirectory(locale)
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const post: Post = {
      slug,
      content,
      ...(data as {
        title: string
        date: string
        excerpt: string
        coverImage: string
        category: string
        draft?: boolean
        publishDate?: string
      }),
    }

    if (!shouldPublish(post)) {
      return null
    }
    return post
  } catch (e) {
    return null
  }
}

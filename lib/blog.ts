import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface Post {
    slug: string
    title: string
    date: string
    excerpt: string
    coverImage: string
    category: string
    content: string
    draft?: boolean      // Si true, l'article n'est pas visible
    publishDate?: string // Date de publication programmée (YYYY-MM-DD)
}

/**
 * Vérifie si un article doit être publié
 * - Ne publie pas si draft: true
 * - Ne publie pas si publishDate est dans le futur
 */
function shouldPublish(post: Post): boolean {
    // En mode développement, on peut voir tous les articles
    const isDev = process.env.NODE_ENV === 'development'
    
    // Si c'est un brouillon, ne pas publier (sauf en dev)
    if (post.draft === true) {
        return isDev
    }
    
    // Vérifier la date de publication
    const publishDate = post.publishDate || post.date
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Début de journée
    
    const articleDate = new Date(publishDate)
    articleDate.setHours(0, 0, 0, 0)
    
    // Publier si la date est passée ou aujourd'hui
    return articleDate <= today
}

/**
 * Récupère tous les articles publiés (non-brouillons et date passée)
 */
export function getAllPosts(): Post[] {
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
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

    // Filtrer les articles non publiés
    const publishedPosts = allPostsData.filter(shouldPublish)

    // Trier par date (plus récent en premier)
    return publishedPosts.sort((a, b) => {
        const dateA = a.publishDate || a.date
        const dateB = b.publishDate || b.date
        return dateB.localeCompare(dateA)
    })
}

/**
 * Récupère tous les articles (y compris brouillons) - pour le sitemap et SSG
 */
export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    return fs.readdirSync(postsDirectory)
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => fileName.replace(/\.md$/, ''))
}

/**
 * Récupère un article par son slug
 * Retourne null si l'article est un brouillon ou non encore publié (en prod)
 */
export function getPostBySlug(slug: string): Post | null {
    try {
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

        // Vérifier si l'article peut être affiché
        if (!shouldPublish(post)) {
            return null
        }

        return post
    } catch (e) {
        return null
    }
}

/**
 * Récupère les articles programmés (pour admin/preview)
 */
export function getScheduledPosts(): Post[] {
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
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

    // Retourner uniquement les articles programmés pour le futur
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return allPostsData
        .filter(post => {
            if (post.draft) return false
            const publishDate = new Date(post.publishDate || post.date)
            publishDate.setHours(0, 0, 0, 0)
            return publishDate > today
        })
        .sort((a, b) => {
            const dateA = a.publishDate || a.date
            const dateB = b.publishDate || b.date
            return dateA.localeCompare(dateB) // Plus proche en premier
        })
}

/**
 * Récupère les brouillons (pour admin/preview)
 */
export function getDraftPosts(): Post[] {
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
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
        .filter(post => post.draft === true)
}

import { getPostBySlug, getAllPosts } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of routing.locales) {
    const posts = getAllPosts(locale)
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }
  return params
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const post = getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  return (
    <div data-blog-design="true" className="min-h-screen pb-24" style={{ background: '#F4F0E8' }}>
      <div className="blog-dark pt-32 pb-20 relative overflow-hidden">
        <div className="blog-container relative z-10 max-w-3xl mx-auto text-center">
          <Link href="/blog" className="blog-nav-link inline-flex items-center mb-8">
            <ArrowLeft size={16} className="mr-2" /> {t('backToBlog')}
          </Link>
          <div className="flex items-center justify-center gap-4 blog-meta mb-6">
            <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.publishDate ?? post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="blog-headline text-3xl md:text-5xl mb-6 leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <article className="blog-container -mt-10 relative z-20 max-w-3xl mx-auto">
        <div className="blog-article-card">
          <div className="blog-prose-image-wrap relative w-full h-64 md:h-96 overflow-hidden mb-10 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="blog-prose prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="blog-dark p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0" style={{ background: 'rgba(245,243,239,0.2)' }}>
                <Image src="/logo.png" alt="Seeklon" fill className="object-contain p-2 invert" />
              </div>
              <div>
                <h3 className="blog-headline text-lg mb-1" style={{ color: 'var(--cream)' }}>{t('aboutSeeklon')}</h3>
                <p className="blog-body-text text-sm" style={{ color: 'var(--cream-dark)' }}>
                  {t('aboutSeeklonDesc')}
                  <Link href="/contact" className="blog-dark-link ml-1">{t('discoverSolution')}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

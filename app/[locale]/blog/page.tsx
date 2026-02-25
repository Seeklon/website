import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import { Calendar, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

function isPlaceholderImage(coverImage: string): boolean {
  return coverImage === '/logo.png' || (coverImage && coverImage.includes('logo'))
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const posts = getAllPosts(locale)
  const featuredPost = posts[0]
  const gridPosts = posts.slice(1)

  return (
    <div data-blog-design="true" className="min-h-screen blog-page-root" style={{ background: '#F4F0E8' }}>
      {/* Hero deux blocs : noir gauche / clair droite */}
      <section className="blog-hero">
        <div className="blog-hero-left">
          <h1 className="blog-hero-title">
            {t('titleBefore')}<em>{t('titleAccent')}</em>
          </h1>
          <p className="blog-hero-descriptor">{t('subtitle')}</p>
        </div>
        <div className="blog-hero-right">
          {featuredPost ? (
            <>
              <div className="blog-hero-kicker">{featuredPost.category}</div>
              <Link href={`/blog/${featuredPost.slug}`} className="block">
                <h2 className="blog-hero-featured-title">{featuredPost.title}</h2>
              </Link>
              <p className="blog-hero-intro line-clamp-3">{featuredPost.excerpt}</p>
              <Link href={`/blog/${featuredPost.slug}`} className="blog-read-link mt-4">
                {t('readArticle')} <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <p className="blog-hero-intro">{t('subtitle')}</p>
          )}
        </div>
      </section>

      {/* Section Podcast — deux colonnes : liste (clair) à gauche | à la une (noir) à droite */}
      <section className="blog-podcast-section">
        <div className="blog-podcast-layout">
          <div className="blog-podcast-list">
            <span className="blog-podcast-label">Les épisodes</span>
            {[2, 3, 4, 5].map((n) => (
              <div key={n} className="blog-podcast-list-item">
                <span className="blog-podcast-list-num">{String(n).padStart(2, '0')}</span>
                <div className="blog-podcast-list-content">
                  <h3 className="blog-podcast-list-title">Titre épisode {n}</h3>
                  <span className="blog-read-link blog-podcast-list-cta">Écouter</span>
                </div>
              </div>
            ))}
          </div>
          <div className="blog-podcast-featured blog-dark">
            <span className="blog-podcast-label blog-podcast-label-on-dark">Podcast</span>
            <span className="blog-podcast-episode-num">Épisode 01</span>
            <h2 className="blog-podcast-featured-title">Titre de l&apos;épisode à la une</h2>
            <p className="blog-podcast-featured-desc">
              Court extrait ou description de l&apos;épisode. L&apos;interface sera reliée aux données plus tard.
            </p>
            <span className="blog-podcast-cta">Écouter l&apos;épisode</span>
          </div>
        </div>
      </section>

      {/* Grille 3 colonnes — tous les articles sauf le premier (déjà en une) */}
      <section className="pb-24">
        <div className="blog-grid">
            {gridPosts.map((post, i) => {
              const isFeaturedDark = (i + 1) % 6 === 0
              return (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className={`blog-grid-card ${isFeaturedDark ? 'blog-grid-card-featured-dark' : ''}`}
                >
                  <div
                    className="relative w-full overflow-hidden mb-5"
                    style={{
                      height: 100,
                      background: isPlaceholderImage(post.coverImage) ? '#E8E2D8' : '#F4F0E8',
                    }}
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="blog-card-tag">{post.category}</span>
                  <div className="blog-card-date flex items-center gap-2">
                    <Calendar size={12} />
                    {new Date(post.publishDate ?? post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h2 className="blog-card-title line-clamp-2">{post.title}</h2>
                  <p className="blog-card-excerpt line-clamp-3">{post.excerpt}</p>
                  <span className="blog-read-link">
                    {t('readArticle')} <ArrowRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
      </section>
    </div>
  )
}

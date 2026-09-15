import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getAllPosts } from '@/lib/blog'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'BlogIndex' })
  return {
    title: t('metaTitle'), description: t('metaDescription'),
    alternates: { canonical: locale === 'fr' ? '/blog' : `/${locale}/blog`, languages: { fr: '/blog', en: '/en/blog', 'x-default': '/blog' } },
  }
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('BlogIndex')
  const articleText = await getTranslations('Blog')
  const [featured, ...posts] = getAllPosts(locale)
  const categories = Array.from(new Set(posts.map(post => post.category)))
  const dateFormat = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

  return (
    <div className="journal-index">
      <section className="secondary-opening journal-opening">
        <div className="secondary-container">
          <h1>{t('titleLead')}<span>{t('titleAccent')}</span></h1>
          <p className="journal-intro">{t('subtitle')}</p>
          {featured && <article className="journal-featured">
            <div className="journal-meta"><span>{featured.category}</span><time dateTime={featured.publishDate ?? featured.date}>{dateFormat.format(new Date(featured.publishDate ?? featured.date))}</time></div>
            <h2><Link href={`/blog/${featured.slug}`}>{featured.title}<ArrowUpRight size={28} aria-hidden="true" /></Link></h2>
            <p>{featured.excerpt}</p>
            <Link href={`/blog/${featured.slug}`} className="button-on-dark">{articleText('readArticle')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </article>}
        </div>
      </section>
      {categories.length > 0 && <div className="secondary-container journal-library">
        <nav className="journal-topics" aria-label={t('themesLabel')}>
          <h2>{t('themesTitle')}</h2>
          {categories.map((category, index) => <a key={category} href={`#theme-${index}`}>{category}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
        </nav>
        <div>{categories.map((category, index) => <section className="journal-theme" key={category} id={`theme-${index}`} aria-labelledby={`theme-title-${index}`}>
          <h2 id={`theme-title-${index}`}>{category}</h2>
          {posts.filter(post => post.category === category).map(post => <article className="journal-entry" key={post.slug}>
            <time dateTime={post.publishDate ?? post.date}>{dateFormat.format(new Date(post.publishDate ?? post.date))}</time>
            <div><h3><Link href={`/blog/${post.slug}`}>{post.title}<ArrowUpRight size={22} aria-hidden="true" /></Link></h3><p>{post.excerpt}</p></div>
          </article>)}
        </section>)}</div>
      </div>}
      {!featured && <p className="secondary-container journal-empty">{t('empty')}</p>}
    </div>
  )
}

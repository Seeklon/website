import { getPostBySlug, getAllPosts, getRelatedPosts, hasPost, readingMinutes } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import ClosingCta from '@/components/home/ClosingCta'
import { frenchSpacing } from '@/lib/typography'
import { pageMetadata, localeUrl } from '@/lib/metadata'
import { SITE_URL } from '@/lib/site'

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

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)
  if (!post) return {}
  // Only the languages this article actually exists in: the middleware used to advertise
  // an English alternate for articles that have none, pointing crawlers at a 404.
  const languages = routing.locales.filter((l) => hasPost(slug, l))
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    image: 'article',
    type: 'article',
    languages,
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const post = getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const date = post.publishDate ?? post.date
  const dateFormat = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  // The markdown repeats the title as its first heading; the page already carries it as
  // the h1, so it is dropped here rather than hidden in CSS. The straight apostrophes the
  // articles were written with become the curly one the rest of the site uses — there is
  // no code in this content, so nothing else can be caught by the swap.
  const body = post.content.replace(/^﻿?\s*#\s+[^\n]*\n+/, '').replace(/'/g, '’')
  const article = frenchSpacing(body, locale)
  const related = getRelatedPosts(slug, locale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: date,
    inLanguage: locale,
    mainEntityOfPage: localeUrl(locale, `/blog/${slug}`),
    image: `${SITE_URL}/og/article.png`,
    author: { '@type': 'Organization', name: 'Seeklon', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Seeklon', url: SITE_URL },
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mx-auto max-w-[860px] px-6 pt-[120px] md:pt-[170px]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[15px] text-ink-soft transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          {t('backToBlog')}
        </Link>
        <p className="mt-9 flex flex-wrap items-center gap-2 text-sm text-ink-faint">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
          <span aria-hidden="true">·</span>
          <span>{t('readingTime', { minutes: readingMinutes(post.content) })}</span>
        </p>
        <h1 className="mt-4 text-balance text-[clamp(2rem,1.2rem+2.9vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.04em]">
          {frenchSpacing(post.title, locale)}
        </h1>
        <p className="mt-6 max-w-[38rem] text-base leading-[1.6] text-ink-soft md:text-[19px]">
          {frenchSpacing(post.excerpt, locale)}
        </p>
      </header>

      <div className="mx-auto max-w-[860px] px-6 pt-10 md:pt-14">
        <div className="rounded-[24px] bg-white/90 px-6 py-10 md:px-14 md:py-14">
          <div className="prose prose-lg max-w-none">
            {/* remark-gfm: several articles compare options in a table, which needs room
                to scroll sideways on a phone rather than push the page out of shape.
                The link override keeps the 41 in-article CTAs inside the router — and so
                inside the reader's language. */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node, ...props }) => (
                  <div className="not-prose my-8 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-[15px] leading-[1.5]" {...props} />
                  </div>
                ),
                a: ({ href, children }) => {
                  const target = href ?? ''
                  return target.startsWith('/') ? (
                    <Link href={target}>{children}</Link>
                  ) : (
                    <a href={target} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  )
                },
              }}
            >
              {article}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-[150px] xl:px-20">
          <h2 className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] leading-[1.04] tracking-[-0.04em]">
            {t('relatedTitle')}
          </h2>
          <ul className="mt-8 grid gap-5 md:mt-12 md:grid-cols-3 lg:gap-6">
            {related.map((other) => {
              const otherDate = other.publishDate ?? other.date
              return (
                <li key={other.slug} className="flex">
                  <Link
                    href={`/blog/${other.slug}`}
                    className="group flex w-full flex-col rounded-[24px] border border-white bg-white/85 p-7 transition-colors duration-150 hover:bg-white md:p-8"
                  >
                    <p className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
                      <span>{other.category}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={otherDate}>{dateFormat.format(new Date(otherDate))}</time>
                    </p>
                    <h3 className="mt-4 text-[22px] leading-[1.22] tracking-[-0.025em] md:text-2xl">
                      {frenchSpacing(other.title, locale)}
                    </h3>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-base text-azure-deep">
                      {t('readArticle')}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-150 motion-safe:group-hover:translate-x-1"
                        strokeWidth={1.8}
                      />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href="/blog"
            className="mt-10 inline-flex items-center gap-2 text-base text-ink-soft transition-colors duration-150 hover:text-ink md:mt-12"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            {t('backToBlog')}
          </Link>
        </section>
      ) : null}

      <ClosingCta namespace="Blog.closing" />
    </article>
  )
}

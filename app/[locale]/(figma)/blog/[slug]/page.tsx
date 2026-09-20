import { getPostBySlug, getAllPosts } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from '@/i18n/navigation'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import ClosingCta from '@/components/home/ClosingCta'

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
  return {
    title: post.title,
    description: post.excerpt,
  }
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
  const formattedDate = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
  // The markdown repeats the title as its first heading; the page already carries it as
  // the h1, so it is dropped here rather than hidden in CSS. The straight apostrophes the
  // articles were written with become the curly one the rest of the site uses — there is
  // no code in this content, so nothing else can be caught by the swap.
  const body = post.content.replace(/^﻿?\s*#\s+[^\n]*\n+/, '').replace(/'/g, '’')

  return (
    <article>
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
          <time dateTime={date}>{formattedDate}</time>
        </p>
        <h1 className="mt-4 text-balance text-[clamp(2rem,1.2rem+2.9vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.04em]">
          {post.title}
        </h1>
        <p className="mt-6 max-w-[38rem] text-base leading-[1.6] text-ink-soft md:text-[19px]">{post.excerpt}</p>
      </header>

      <div className="mx-auto max-w-[860px] px-6 pt-10 md:pt-14">
        <div className="rounded-[24px] bg-white/90 px-6 py-10 md:px-14 md:py-14">
          <div className="prose prose-lg max-w-none">
            {/* remark-gfm: several articles compare options in a table, which needs room
                to scroll sideways on a phone rather than push the page out of shape. */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node, ...props }) => (
                  <div className="not-prose my-8 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-[15px] leading-[1.5]" {...props} />
                  </div>
                ),
              }}
            >
              {body}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <ClosingCta namespace="Blog.closing" />
    </article>
  )
}

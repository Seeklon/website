import { Link } from '@/i18n/navigation'
import { getAllPosts } from '@/lib/blog'
import { ArrowRight } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ClosingCta from '@/components/home/ClosingCta'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('blogTitle'),
    description: t('blogDescription'),
  }
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const posts = getAllPosts(locale)
  const dateFormat = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <section className="px-6 pt-[136px] md:pt-[180px] md:text-center">
        <h1 className="text-balance text-[clamp(2.25rem,0.9rem+5.2vw,6rem)] font-medium leading-[1.02] tracking-[-0.045em] md:leading-[0.98] md:tracking-[-0.05em]">
          <span className="block">{t('titleBefore')}</span>
          <span className="block font-genoid text-[0.85em] font-bold tracking-[0.03em] text-azure">{t('titleAccent')}</span>
        </h1>
        <p className="mt-7 max-w-[40rem] text-base leading-[1.6] text-ink-soft md:mx-auto md:mt-9 md:text-balance md:text-[19px]">
          {t('subtitle')}
        </p>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pt-12 md:px-10 md:pt-20 xl:px-20">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => {
            const date = post.publishDate ?? post.date
            return (
              <li key={post.slug} className="flex">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex w-full flex-col rounded-[20px] border border-white bg-white/80 p-7 transition-colors duration-150 hover:bg-white md:p-8"
                >
                  <p className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
                  </p>
                  <h2 className="mt-4 text-[22px] leading-[1.22] tracking-[-0.025em] md:text-2xl">{post.title}</h2>
                  <p className="mt-3 line-clamp-4 text-base leading-[1.6] text-ink-soft">{post.excerpt}</p>
                  <span className="mt-auto flex items-center gap-2 border-t border-[#DDDBD5] pt-5 text-base text-azure-deep">
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
      </section>

      <ClosingCta namespace="Blog.closing" />
    </>
  )
}

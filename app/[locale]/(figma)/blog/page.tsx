import { Link } from '@/i18n/navigation'
import { getAllPosts, type Post } from '@/lib/blog'
import { ArrowRight } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Reveal from '@/components/home/Reveal'
import { frenchSpacing } from '@/lib/typography'
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
  const [featured, ...rest] = posts
  const dateFormat = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const meta = (post: Post) => {
    const date = post.publishDate ?? post.date
    return (
      <p className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
        <span>{post.category}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
      </p>
    )
  }

  const readMore = (
    <span className="flex items-center gap-2 text-base text-azure-deep">
      {t('readArticle')}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-150 motion-safe:group-hover:translate-x-1"
        strokeWidth={1.8}
      />
    </span>
  )

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

      <section className="mx-auto mt-12 max-w-[1440px] px-6 md:mt-20 md:px-10 xl:px-20">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] leading-[1.04] tracking-[-0.04em]">{t('listTitle')}</h2>
        </Reveal>

        {/* The latest article gets the large surface, the way the beta plan does on Tarifs. */}
        {featured ? (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-8 block rounded-[24px] border border-white bg-white/85 p-7 transition-colors duration-150 hover:bg-white md:mt-12 md:p-10 xl:p-12"
          >
            <div className="lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
              <div>
                {meta(featured)}
                <h3 className="mt-4 text-balance text-[clamp(1.75rem,1.1rem+2vw,2.75rem)] leading-[1.1] tracking-[-0.035em]">
                  {frenchSpacing(featured.title, locale)}
                </h3>
              </div>
              <div className="mt-6 lg:mt-0">
                <p className="max-w-[34rem] text-base leading-[1.6] text-ink-soft md:text-[17px]">
                  {frenchSpacing(featured.excerpt, locale)}
                </p>
                <span className="mt-7 block">{readMore}</span>
              </div>
            </div>
          </Link>
        ) : null}

        <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:mt-6 lg:gap-6">
          {rest.map((post) => (
            <li key={post.slug} className="flex">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex w-full flex-col rounded-[24px] border border-white bg-white/85 p-7 transition-colors duration-150 hover:bg-white md:p-9"
              >
                {meta(post)}
                <h3 className="mt-4 text-[26px] leading-[1.2] tracking-[-0.03em] md:text-[28px]">{frenchSpacing(post.title, locale)}</h3>
                <p className="mt-4 text-base leading-[1.6] text-ink-soft md:text-[17px]">{frenchSpacing(post.excerpt, locale)}</p>
                <span className="mt-auto border-t border-[#DDDBD5] pt-6">{readMore}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ClosingCta namespace="Blog.closing" />
    </>
  )
}

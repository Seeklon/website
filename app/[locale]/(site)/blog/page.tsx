import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import { Calendar, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const posts = getAllPosts(locale)

  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-6">
            {t('titleBefore')}<span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>{t('titleAccent')}</span>
          </h1>
          <p className="font-sans text-xl text-text-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden bg-primary/5 p-4 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
                    <Calendar size={14} />
                    {new Date(post.publishDate ?? post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h2 className="font-heading text-xl font-bold text-text-main mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-text-muted text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center text-primary font-bold text-sm">
                    {t('readArticle')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

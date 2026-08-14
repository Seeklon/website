import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('NotFound')

  return (
    <main className="min-h-screen bg-background px-4 py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-6 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary">
          404
        </div>
        <h1 className="font-heading text-4xl font-bold text-text-main md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
          {t('description')}
        </p>
        <a
          href="/"
          className="mt-10 rounded-full bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark"
        >
          {t('cta')}
        </a>
      </div>
    </main>
  )
}

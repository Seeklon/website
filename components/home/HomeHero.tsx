import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import candidatesShot from '@/public/home/capture-candidatures.png'
import offerShot from '@/public/home/capture-offre.png'
import interviewShot from '@/public/home/capture-entretien.png'

export default function HomeHero() {
  const t = useTranslations('Home.hero')

  return (
    <section className="px-6 pt-[136px] text-center md:pt-[180px]">
      <h1>
        <span className="block text-[clamp(4rem,2.6rem+6.1vw,8rem)] font-medium leading-[0.94] tracking-[-0.05em]">
          {t('title')}
        </span>
        <span className="accent-shine mt-2.5 block font-genoid text-[clamp(3.5rem,2.3rem+5.6vw,6.5rem)] font-bold leading-none tracking-[0.03em] text-azure">
          {t('accent')}
        </span>
      </h1>

      <p className="mt-9 text-[22px] font-medium leading-[1.25] tracking-[-0.02em] md:mt-8 md:text-[30px] md:leading-[1.2]">
        {t('subtitle')}
      </p>
      <p className="mx-auto mt-4 max-w-[34rem] text-balance text-base leading-[1.6] text-ink-soft md:text-[19px] md:leading-[1.55]">
        {t('body')}
      </p>

      <Link
        href="/contact"
        className="sheen relative mt-9 inline-flex h-[52px] items-center overflow-hidden rounded-[10px] bg-azure px-[30px] text-base font-medium text-white shadow-[0_12px_24px_-12px_rgba(12,109,248,0.7)] transition-colors duration-150 hover:bg-azure-deep"
      >
        {t('cta')}
      </Link>

      <figure className="relative mx-auto mt-16 max-w-[962px] md:mt-[120px]">
        {/* Side captures peek out from behind the main one, tilted away (wide screens only). */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden [perspective:1400px] xl:block">
          <Image
            src={offerShot}
            alt=""
            sizes="312px"
            className="hero-shot-left absolute right-[calc(100%-112px)] top-[130px] w-[312px] rounded-[10px] shadow-[0_24px_48px_-20px_rgba(10,86,196,0.45)] [transform:rotateY(28deg)] [transform-origin:right_center]"
          />
          <Image
            src={interviewShot}
            alt=""
            sizes="312px"
            className="hero-shot-right absolute left-[calc(100%-112px)] top-20 w-[312px] rounded-[10px] shadow-[0_24px_48px_-20px_rgba(10,86,196,0.45)] [transform:rotateY(-28deg)] [transform-origin:left_center]"
          />
        </div>

        <Image
          src={candidatesShot}
          alt={t('shotCandidates')}
          priority
          sizes="(min-width: 1010px) 962px, calc(100vw - 48px)"
          className="hero-shot relative w-full rounded-lg shadow-[0_24px_48px_-16px_rgba(12,109,248,0.4)] md:rounded-[10px] md:shadow-[0_40px_80px_-24px_rgba(12,109,248,0.45)]"
        />
        <figcaption className="mx-auto mt-7 max-w-[15rem] text-xs text-ink-faint md:mt-10 md:max-w-none md:text-sm">
          {t('caption')}
        </figcaption>
      </figure>

    </section>
  )
}

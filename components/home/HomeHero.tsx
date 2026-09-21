import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LoopVideo from './LoopVideo'
import candidatesShot from '@/public/home/capture-candidatures.png'
import offerShot from '@/public/home/capture-offre.png'
import interviewShot from '@/public/home/capture-entretien.png'

export default function HomeHero() {
  const t = useTranslations('Home.hero')
  const accent = t('accent')

  return (
    <section className="px-6 pt-[136px] text-center md:pt-[180px]">
      <h1>
        <span className="block text-[clamp(4rem,2.6rem+6.1vw,8rem)] font-medium leading-[0.94] tracking-[-0.05em]">
          {t('title')}
        </span>
        {/* Read as one phrase; drawn letter by letter so each can arrive at speed. */}
        <span className="sr-only"> {accent}</span>
        <span
          aria-hidden="true"
          className="accent-shine accent-rush mt-2.5 block font-genoid text-[clamp(3.5rem,2.3rem+5.6vw,6.5rem)] font-bold leading-none tracking-[0.03em] text-azure"
        >
          {accent.split(' ').map((word, w, words) => {
            const start = words.slice(0, w).join('').length
            return (
              <span key={w} className="inline-block whitespace-nowrap">
                {Array.from(word).map((letter, i) => (
                  <span key={i} className="accent-rush-letter" style={{ '--i': start + i } as React.CSSProperties}>
                    {letter}
                  </span>
                ))}
                {w < words.length - 1 ? '\u00A0' : null}
              </span>
            )
          })}
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

        {/* The capture is the first frame of the loop that plays over it. */}
        <div className="hero-shot relative overflow-hidden rounded-lg shadow-[0_24px_48px_-16px_rgba(12,109,248,0.4)] md:rounded-[10px] md:shadow-[0_40px_80px_-24px_rgba(12,109,248,0.45)]">
          <Image
            src={candidatesShot}
            alt={t('shotCandidates')}
            priority
            sizes="(min-width: 1010px) 962px, calc(100vw - 48px)"
            className="block w-full"
          />
          <LoopVideo wide="/home/video/candidatures-1920.mp4" narrow="/home/video/candidatures-960.mp4" narrowBelow={768} />
        </div>
      </figure>

    </section>
  )
}

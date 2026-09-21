import Image, { type StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'
import thomas from '@/public/about/team-thomas.webp'
import ilyes from '@/public/about/team-ilyes.webp'
import deniz from '@/public/about/team-deniz.webp'
import robin from '@/public/about/team-robin.webp'

type Member = { name: string; role: string }

// Keyed by first name, which is the same in every locale. The files are 320px squares of
// 5 to 7 KB, already cropped on the face: they are served as they are, since the optimizer
// has nothing left to take off them.
const PORTRAITS: Record<string, StaticImageData> = { Thomas: thomas, Ilyes: ilyes, Deniz: deniz, Robin: robin }

// Four cards, one per founder. A member without a portrait gets an initial in the circle
// rather than a grey silhouette — it reads as a person, not as a missing image.
export default function AboutTeam() {
  const t = useTranslations('About.team')
  const members = t.raw('members') as Member[]

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-[150px] xl:px-20">
      <Reveal>
        <h2 className="text-[clamp(2.25rem,1.2rem+3.4vw,4rem)] leading-[1.04] tracking-[-0.04em]">
          <span className="block">{t('line1')}</span>
          <span className="block">{t('line2')}</span>
        </h2>
      </Reveal>

      <Reveal>
        <ul className="reveal-stagger mt-8 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-6">
          {members.map((member) => (
            <li
              key={member.name}
              className="flex flex-col items-center rounded-[20px] border border-white bg-white/80 px-6 py-9 text-center"
            >
              {PORTRAITS[member.name] ? (
                <Image
                  src={PORTRAITS[member.name]}
                  alt=""
                  unoptimized
                  sizes="132px"
                  className="h-[112px] w-[112px] rounded-full bg-[#D8E6FF] object-cover md:h-[132px] md:w-[132px]"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-[112px] w-[112px] items-center justify-center rounded-full bg-[linear-gradient(160deg,#EEF4FF_0%,#D8E6FF_100%)] text-[26px] text-azure-deep md:h-[132px] md:w-[132px] md:text-[32px]"
                >
                  {member.name.slice(0, 1)}
                </span>
              )}
              <p className="mt-6 text-[22px] tracking-[-0.02em] md:text-2xl">{member.name}</p>
              <p className="mt-1.5 text-[15px] text-ink-soft">{member.role}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

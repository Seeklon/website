import { useTranslations } from 'next-intl'
import Reveal from '@/components/home/Reveal'

type Member = { name: string; role: string }

// Four cards, one per founder. The portraits are not shot yet, so the circle holds an
// initial rather than a grey silhouette — it reads as a person, not as a missing image.
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

      <ul className="mt-9 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-6">
        {members.map((member) => (
          <li
            key={member.name}
            className="flex flex-col items-center rounded-[20px] border border-white bg-white/80 px-6 py-9 text-center"
          >
            <span
              aria-hidden="true"
              className="flex h-[112px] w-[112px] items-center justify-center rounded-full bg-[linear-gradient(160deg,#EEF4FF_0%,#D8E6FF_100%)] text-[26px] text-azure-deep md:h-[132px] md:w-[132px] md:text-[32px]"
            >
              {member.name.slice(0, 1)}
            </span>
            <p className="mt-6 text-[22px] tracking-[-0.02em] md:text-2xl">{member.name}</p>
            <p className="mt-1.5 text-[15px] text-ink-soft">{member.role}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

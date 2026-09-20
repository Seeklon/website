import Reveal from '@/components/home/Reveal'
import ClosingCta from '@/components/home/ClosingCta'

export type LegalSection = { title: string; content: string; items?: string[] }

// Mentions légales, confidentialité, cookies: three text pages that used to live on the
// old design, which meant leaving the site through its own footer. Same shell, same
// rhythm, one surface for the text.
export default function LegalPage({
  title1,
  title2,
  updated,
  sections,
}: {
  title1: string
  title2: string
  updated?: string
  sections: LegalSection[]
}) {
  return (
    <>
      <section className="px-6 pt-[136px] md:pt-[180px] md:text-center">
        <h1 className="text-balance text-[clamp(2.25rem,0.9rem+5.9vw,6rem)] font-medium leading-[1.02] tracking-[-0.045em] md:leading-[0.98] md:tracking-[-0.05em]">
          <span className="block">{title1}</span>
          <span className="block font-genoid text-[0.85em] font-bold tracking-[0.03em] text-azure">{title2}</span>
        </h1>
        {updated ? <p className="mt-8 text-[15px] text-ink-faint md:mt-9">{updated}</p> : null}
      </section>

      <div className="mx-auto mt-12 max-w-[860px] px-6 md:mt-20">
        <div className="rounded-[24px] bg-white/90 px-6 py-10 md:px-14 md:py-14">
          {sections.map((section, i) => (
            <Reveal key={section.title}>
              <section className={i === 0 ? '' : 'mt-12 border-t border-[#DDDBD5] pt-12'}>
                <h2 className="text-[26px] tracking-[-0.03em] md:text-[32px]">{section.title}</h2>
                <p className="mt-5 whitespace-pre-line text-base leading-[1.7] text-ink-soft md:text-[17px]">
                  {section.content}
                </p>
                {section.items ? (
                  <ul className="mt-5 space-y-2.5 text-base leading-[1.7] text-ink-soft md:text-[17px]">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-azure-mist" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      <ClosingCta namespace="Home.closing" />
    </>
  )
}

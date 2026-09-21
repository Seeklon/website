import { useTranslations } from 'next-intl'

export default function InterviewExcerpt() {
  const t = useTranslations('Home.excerpt')

  // Phones: a product card (source on top, question left-aligned) so it doesn't read as
  // a customer quote. Wider screens: the large centred question from the Figma.
  return (
    <section className="px-6 pt-24 md:pt-[160px] md:text-center">
      <figure className="mx-auto flex max-w-[1112px] flex-col rounded-[20px] border border-azure/35 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,86,196,0.45)] md:border-0 md:bg-transparent md:p-0 md:shadow-none">
        <figcaption className="flex items-center gap-3 text-xs leading-snug text-ink-faint md:order-last md:mx-auto md:mt-7 md:text-sm">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azure-mist text-[13px] font-medium text-azure-deep md:hidden"
          >
            LM
          </span>
          {t('source')}
        </figcaption>
        <blockquote className="mt-5 md:mt-0 md:rounded-[24px] md:border md:border-azure/35 md:bg-white md:px-16 md:py-14 md:shadow-[0_24px_60px_-40px_rgba(10,86,196,0.45)]">
          <p className="max-w-[54rem] text-2xl font-medium leading-[1.2] tracking-[-0.025em] md:mx-auto md:text-balance md:text-[clamp(2.5rem,1.4rem+2.4vw,3.25rem)] md:leading-[1.1] md:tracking-[-0.035em]">
            {t('quote')}
          </p>
        </blockquote>
      </figure>

      <p className="mt-10 max-w-[31rem] text-base leading-[1.6] text-ink-soft md:mx-auto md:mt-14 md:text-balance md:text-[19px]">
        {t('context')}
      </p>
    </section>
  )
}

import { useTranslations } from 'next-intl'

const POINTS = ['response', 'beta', 'place'] as const

export default function ContactAside() {
  const t = useTranslations('Contact.aside')

  return (
    <aside className="rounded-[24px] bg-white/75 p-7 md:p-8">
      <h2 className="text-xl md:text-2xl">{t('title')}</h2>
      <dl className="mt-6 divide-y divide-[#DDDBD5] border-t border-[#DDDBD5]">
        {POINTS.map((point) => (
          <div key={point} className="py-5">
            <dt className="text-base text-ink">{t(`${point}Title`)}</dt>
            <dd className="mt-1.5 max-w-[24rem] text-[15px] leading-[1.6] text-ink-soft">{t(`${point}Body`)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-[15px] text-ink-soft">
        {t('emailLabel')}{' '}
        <a href="mailto:contact@seeklon.com" className="text-azure-deep underline-offset-4 hover:underline">
          contact@seeklon.com
        </a>
      </p>
      <a
        href="https://www.linkedin.com/company/seeklon/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center text-[15px] text-azure-deep underline-offset-4 hover:underline"
      >
        {t('linkedin')}
      </a>
    </aside>
  )
}

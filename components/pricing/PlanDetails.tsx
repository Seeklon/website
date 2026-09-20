import { useTranslations } from 'next-intl'
import { Check, Minus } from 'lucide-react'

const PACKS = ['breeze', 'storm', 'cyclone'] as const
type Row = { label: string; values: string[] }

// The single source of truth for what each pack contains: the cards above stay short.
export default function PlanDetails() {
  const t = useTranslations('Pricing.details')
  const tPacks = useTranslations('Pricing.packs')
  const rows = t.raw('rows') as Row[]
  const names = PACKS.map((key) => tPacks(`items.${key}.name`))

  return (
    <div className="mt-14 md:mt-20">
      <h3 className="text-xl md:text-2xl">{tPacks('lead')}</h3>
      <p className="mt-3 max-w-[30rem] text-sm text-ink-soft">{t('note')}</p>

      {/* Wide screens read the comparison as a table; phones get one summary per pack. */}
      <div className="mt-6 hidden rounded-[24px] bg-white/85 px-8 py-6 md:block xl:px-10">
        <table className="w-full table-fixed border-collapse text-base">
          <caption className="sr-only">{t('caption')}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[34%] py-4 text-left font-normal">
                <span className="sr-only">{t('featureColumn')}</span>
              </th>
              {names.map((name, i) => (
                <th
                  key={name}
                  scope="col"
                  className={`py-4 text-left text-[15px] font-normal ${i === 1 ? 'text-azure-deep' : 'text-ink'}`}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-[#DDDBD5]">
                <th scope="row" className="py-4 pr-6 text-left font-normal">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={names[i]} className="py-4 pr-6 text-ink-soft">
                    {value === '—' ? (
                      <>
                        <span className="sr-only">{t('notIncluded')}</span>
                        <span aria-hidden="true">—</span>
                      </>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-6 grid gap-4 md:hidden">
        {PACKS.map((key, pack) => (
          <li key={key} className="rounded-[20px] bg-white/85 p-6">
            <p className="text-lg">{names[pack]}</p>
            {/* Same rows as the table, absences included: in a comparison they are the decision. */}
            <dl className="mt-5 space-y-3 text-[15px]">
              {rows.map((row) => {
                const value = row.values[pack]
                const included = value !== '—'
                return (
                  <div key={row.label} className="flex gap-3">
                    <dt className={`flex flex-1 items-start gap-3 ${included ? 'text-ink-soft' : 'text-ink-faint'}`}>
                      {included ? (
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-azure" strokeWidth={2} />
                      ) : (
                        <Minus aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} />
                      )}
                      {row.label}
                    </dt>
                    <dd className={`text-right ${included ? '' : 'text-ink-faint'}`}>
                      {included ? value : t('notIncluded')}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}

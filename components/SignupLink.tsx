import type { ComponentPropsWithoutRef } from 'react'
import { useLocale } from 'next-intl'
import { getSignupHref } from '@/lib/app-links'

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { placement: string }

// A regular link keeps the app's /register route outside the site's locale router
// and follows it in the same tab, including when JavaScript is unavailable.
export default function SignupLink({ placement, children, ...props }: Props) {
  const locale = useLocale()
  return <a {...props} href={getSignupHref(placement, locale)}>{children}</a>
}

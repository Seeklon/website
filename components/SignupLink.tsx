'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { useLocale } from 'next-intl'
import { getSignupHref } from '@/lib/app-links'
import AppLink from './AppLink'

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { placement: string }

// Sign-up link to the app: carries the UTM parameters and reports `signup_click`.
export default function SignupLink({ placement, ...props }: Props) {
  const locale = useLocale()
  return <AppLink {...props} href={getSignupHref(placement, locale)} event="signup_click" placement={placement} />
}

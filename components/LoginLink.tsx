'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { APP_LOGIN_URL } from '@/lib/app-links'
import AppLink from './AppLink'

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { placement: string }

// Log-in link to the app: reports `login_click`. No UTM, these visitors already have an account.
export default function LoginLink({ placement, ...props }: Props) {
  return <AppLink {...props} href={APP_LOGIN_URL} event="login_click" placement={placement} />
}

import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'
import { publicBusinessCards } from './lib/business-card'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  if (publicBusinessCards.some(({ path }) => request.nextUrl.pathname === path)) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

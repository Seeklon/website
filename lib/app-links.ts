export const APP_LOGIN_URL = 'https://app.seeklon.com/login'

// Fixed placement names identify the entry point without forwarding visitor data or
// the current page's query string. The application handles registration and consent.
export function getSignupHref(placement: string, locale: string): string {
  const url = new URL('https://app.seeklon.com/register')
  url.searchParams.set('utm_source', 'seeklon_website')
  url.searchParams.set('utm_medium', 'website')
  url.searchParams.set('utm_campaign', 'beta')
  url.searchParams.set('utm_content', `${placement}_${locale}`)
  return url.toString()
}

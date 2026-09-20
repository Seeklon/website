/**
 * The canonical origin, in one place. robots.txt, the sitemap and every canonical URL read
 * it: they used to hard-code https://landing.seeklon.com, which no longer answers, so the
 * sitemap pointed the whole blog at a dead host on a domain that did not even serve it.
 * Override with NEXT_PUBLIC_SITE_URL if the site moves.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.seeklon.com').replace(/\/$/, '')

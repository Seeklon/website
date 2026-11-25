const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    experimental: {
        webpackBuildWorker: true,
    },
    async redirects() {
        return [
            {
                source: '/demo',
                destination: '/contact',
                permanent: true,
            },
        ]
    },
}

const config = withNextIntl(nextConfig)
config.env = {
    ...config.env,
    _next_intl_trailing_slash: 'false',
    // Inlined for lib/analytics.ts: only the Vercel production deployment falls back to the
    // real GA4 ID, so preview deployments never report into the production property.
    VERCEL_ENV: process.env.VERCEL_ENV || '',
}
module.exports = config

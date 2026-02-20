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
config.env = { ...config.env, _next_intl_trailing_slash: 'false' }
module.exports = config

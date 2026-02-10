const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = withNextIntl(nextConfig)

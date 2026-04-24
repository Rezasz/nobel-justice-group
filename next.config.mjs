import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default withNextIntl(nextConfig)

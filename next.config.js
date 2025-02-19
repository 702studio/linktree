/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'linkedin.com', 'twitter.com'],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Geliştirme modunda webpack yapılandırması
      config.watchOptions = {
        poll: 800, // Yenileme süresi (ms)
        aggregateTimeout: 300, // Değişiklikler için bekleme süresi
      }
    }
    return config
  }
}

module.exports = nextConfig 
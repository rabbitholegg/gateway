/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/',
      destination: '/quests',
      permanent: false,
    },
  ],
  images: {
    domains: [
      'assets.rabbithole.gg',
      'rabbithole-assets.s3.amazonaws.com',
    ],
  },
}

export default nextConfig

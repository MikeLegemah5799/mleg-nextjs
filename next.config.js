/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.mleg.tech' }],
  },
}

module.exports = nextConfig

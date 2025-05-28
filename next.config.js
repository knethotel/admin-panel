/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com', '13.127.80.211'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig; 
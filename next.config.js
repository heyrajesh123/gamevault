/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    browsersListForSwc: true,
  },
};
module.exports = nextConfig;

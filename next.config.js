/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    baseApiURL: process.env.NEXT_PUBLIC_BASE_URL,
    apiKey: process.env.NEXT_PUBLIC_OMBD_API_KEY,
  },
};

module.exports = nextConfig;

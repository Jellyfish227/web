import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  assetPrefix: isProd ? '/web': '',
  basePath: isProd ? '/web' : '',
  output: 'export'
};

export default nextConfig;

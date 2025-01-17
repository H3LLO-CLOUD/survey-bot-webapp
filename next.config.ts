import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.vercel-storage.com',
                port: '',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                search: '',
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://snt-bot.h3llo.cloud/api/:path*',
            }
        ]
    }
};

export default nextConfig;

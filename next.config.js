/// <reference path="./env.d.ts" />
/// <reference path="./vercel.d.ts" />

// Add webpack require for CERC build script compatibility
const webpack = require('webpack');

const APP_URL =
  process.env.APP_URL ||
  (process.env.VERCEL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ||
  `${process.env.PROTOCOL || "http"}://${process.env.HOST || "localhost"}:${process.env.PORT || 3000}`;

/**
 * @type {import('next').NextConfig}
 * @see https://nextjs.org/docs/pages/api-reference/next-config-js
 */
const nextConfig = {
  env: {
    APP_URL,
  },
  eslint: {
    ignoreDuringBuilds: Boolean(process.env.VERCEL),
  },
  productionBrowserSourceMaps: true,
  rewrites: async () => [
    {
      source: "/.well-known/walletconnect.txt",
      destination: "/api/walletconnect/verify",
    },
    {
      source: "/api/rest/(.*)",
      destination: "/api/rest/handler",
    },
    {
      source: "/api/rpc/(.*)",
      destination: "/api/rpc/handler",
    },
    {
      source: "/api/skip/(.*)",
      destination: "/api/skip/handler",
    },
    {
      source: "/api/widget/skip/(.*)",
      destination: "/api/widget/skip/handler",
    },
  ],
  // Removed transpilePackages to avoid syntax issues
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Simplified webpack config that won't conflict with CERC build script
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
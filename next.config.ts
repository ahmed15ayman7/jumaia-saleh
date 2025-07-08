import type { NextConfig } from "next";
const withNextIntl = require('next-intl/plugin')

const nextConfig: NextConfig = {
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localeDetection: false,
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // تحسين حجم الباندل
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },
};

export default nextConfig;

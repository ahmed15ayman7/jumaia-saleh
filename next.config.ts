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
};

export default nextConfig;

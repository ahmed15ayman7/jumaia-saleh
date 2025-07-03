import type { NextConfig } from "next";
const withNextIntl = require('next-intl/plugin')

const nextConfig: NextConfig = {
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localeDetection: false,
  // output: 'export',
};

export default nextConfig;

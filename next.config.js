/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    unoptimized: process.env.NODE_ENV === "development",
  },
  outputFileTracingIncludes: {
    "*": ["./public/**/*", "./.next/static/**/*"],
  },
  experimental: {
    caseSensitiveRoutes: false,
  },
};
module.exports = nextConfig;

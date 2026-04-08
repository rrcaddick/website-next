/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  // Add case sensitive routing to false to handle case mismatches
  experimental: {
    caseSensitiveRoutes: false,
    outputFileTracingIncludes: {
      "*": ["./public/**/*", "./.next/static/**/*"],
    },
  },
};

module.exports = nextConfig;

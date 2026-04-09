/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    unoptimized: process.env.NODE_ENV === "development",
  },
  experimental: {
    caseSensitiveRoutes: false,
    outputFileTracingIncludes: {
      "*": ["./public/**/*", "./.next/static/**/*"],
    },
  },
};
module.exports = nextConfig;

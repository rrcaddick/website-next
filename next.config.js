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
  async rewrites() {
    return {
      afterFiles: [
        { source: '/admin', destination: '/admin/index.html' },
        { source: '/admin/:path*', destination: '/admin/:path*' },
      ],
    };
  },
};
module.exports = nextConfig;

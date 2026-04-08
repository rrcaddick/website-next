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
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "@tinacms/graphql", "better-sqlite3"];
    }
    return config;
  },
};
module.exports = nextConfig;

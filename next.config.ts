import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // add images.pexels.com to the allowed domains
  images: {
    domains: ["figma.com", "s3-alpha-sig.figma.com", "images.pexels.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // add images.pexels.com to the allowed domains
  images: {
    domains: ["figma.com", "s3-alpha-sig.figma.com", "images.pexels.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agenciaaltitude.com",
        pathname: "**", // Permite qualquer path dentro deste hostname
      },
      // Adicione outros hostnames conforme necessário
    ],
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

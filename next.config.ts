/* eslint-disable */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 환경용
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // 프로덕션 빌드용
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;

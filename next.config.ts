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
  // 보안 헤더 설정
  async headers() {
    return [
      {
        // 모든 페이지에 적용되는 보안 헤더
        source: "/(.*)",
        headers: [
          // 클릭재킹 방지
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // MIME 타입 스니핑 방지
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // 리퍼러 정책
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // 권한 정책
          {
            key: "Permissions-Policy",
            value:
              "camera=*, microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()",
          },
        ],
      },
      {
        // API 라우트에 대한 CORS 및 추가 보안 헤더
        source: "/api/(.*)",
        headers: [
          // CORS 설정
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "production"
                ? process.env.ALLOWED_ORIGINS || "https://chulcheck.klr.kr"
                : "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400", // 24시간
          },
          // API 전용 보안 헤더
          {
            key: "X-API-Version",
            value: "1.0",
          },
        ],
      },
      {
        // 정적 파일용 (Next.js 내부 정적 파일)
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // HTML 페이지용 (API와 Next.js 내부 파일 제외)
        source: "/((?!api|_next).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 스크립트 정책 - unsafe-eval 제거, 필요한 경우에만 추가
              "script-src 'unsafe-inline' 'self' https://vercel.live",
              // 스타일 정책 - Google Fonts 허용
              "style-src 'unsafe-inline' 'self' https://fonts.googleapis.com",
              // 폰트 정책
              "font-src 'self' https://fonts.gstatic.com data:",
              // 이미지 정책
              "img-src 'self' data: https: blob:",
              // 연결 정책
              "connect-src 'self' https://api.vercel.com https://vercel.live",
              // 프레임 정책
              "frame-ancestors 'none'",
              // 기본 URI 정책
              "base-uri 'self'",
              // 폼 액션 정책
              "form-action 'self'",
              // 객체 정책
              "object-src 'none'",
              // 미디어 정책
              "media-src 'self'",
              // 워커 정책
              "worker-src 'self'",
            ].join("; "),
          },
          // // HTML 파일에 대한 헤더 설정에 추가
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload',
          // },
        ],
      },
    ];
  },
  // 추가 보안 설정
  poweredByHeader: false, // X-Powered-By 헤더 제거
  compress: true, // 응답 압축 활성화
};

export default nextConfig;

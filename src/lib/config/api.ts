// src/lib/config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
  RETRY_ATTEMPTS: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || "3"),
} as const;

// 환경별 설정 (개발/프로덕션)
export const getApiBaseUrl = () => {
  // 개발 환경에서는 .env.local의 값을 우선 사용
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_API_URL || API_CONFIG.BASE_URL;
  }

  // 프로덕션 환경에서는 환경 변수 사용
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not set in production environment");
  }

  return process.env.NEXT_PUBLIC_API_URL || API_CONFIG.BASE_URL;
};

// NextAuth.js 설정 검증
export const validateAuthConfig = () => {
  const requiredAuthVars = ["AUTH_SECRET", "NEXTAUTH_URL"];

  const missingAuthVars = requiredAuthVars.filter(
    (varName) => !process.env[varName],
  );

  if (missingAuthVars.length > 0) {
    console.error(
      "Missing required NextAuth environment variables:",
      missingAuthVars,
    );
    return false;
  }

  return true;
};

// 전체 환경 변수 검증 함수
export const validateApiConfig = () => {
  const requiredEnvVars = ["NEXT_PUBLIC_API_URL"];
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName],
  );

  if (missingVars.length > 0) {
    console.error("Missing required environment variables:", missingVars);
    return false;
  }

  return true;
};

// 통합 검증 함수
export const validateAllConfig = () => {
  const apiValid = validateApiConfig();
  const authValid = validateAuthConfig();

  if (!apiValid || !authValid) {
    console.error(
      "Configuration validation failed. Please check your environment variables.",
    );
    return false;
  }

  return true;
};

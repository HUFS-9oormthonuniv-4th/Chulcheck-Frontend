// src/lib/config/api.ts
// API 관련 공통 상수들
export const API_TIMEOUTS = {
  DEFAULT: 10000, // 10초
  PROXY: 30000, // 30초 (프록시용)
  UPLOAD: 60000, // 60초 (파일 업로드용)
} as const;

export const API_RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1초
} as const;

// 에러 메시지 상수
export const API_ERROR_MESSAGES = {
  TIMEOUT: "요청이 시간 초과되었습니다",
  NETWORK: "네트워크 오류가 발생했습니다",
  UNAUTHORIZED: "인증이 필요합니다",
  SERVER_ERROR: "서버 오류가 발생했습니다",
  UNKNOWN: "알 수 없는 오류가 발생했습니다",
} as const;

export function getApiBaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_API_URL;
}

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

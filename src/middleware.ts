import { NextRequest } from "next/server";

import { auth } from "@/app/auth/auth";

// 인증이 필요한 경로들 (보호된 경로)
const PROTECTED_PATHS = [
  "/admin*", // admin으로 시작하는 모든 경로
];

// 인증 관련 페이지들 (로그인한 사용자는 접근 불가)
const AUTH_PATHS = [
  "/auth/login",
  "/auth/signup",
  "/auth/signup/basic-info",
  "/auth/password-reset",
];

// 완전 공개 경로들
const PUBLIC_PATHS = ["/", "/auth/error", "/api/auth"];

const TEMP_SIGNUP_COOKIE_NAME = "chulcheck_temp_signup";
const COOKIE_MAX_AGE = 30 * 60; // 30분

// 경로 매칭 함수
function isMatchPath(pathname: string, patterns: string[]) {
  return patterns.some((pattern) => {
    if (pattern.endsWith("*")) {
      // 와일드카드 매칭
      const prefix = pattern.slice(0, -1);
      return pathname.startsWith(prefix);
    }
    return pathname === pattern;
  });
}

// 임시 회원가입 데이터 유효성 검증
function isValidTempSignupData(req: NextRequest): boolean {
  try {
    const tempDataCookie = req.cookies.get(TEMP_SIGNUP_COOKIE_NAME);

    if (!tempDataCookie) {
      return false;
    }

    const parsedData: unknown = JSON.parse(tempDataCookie.value);

    if (
      typeof parsedData !== "object" ||
      parsedData === null ||
      !("email" in parsedData) ||
      !("password" in parsedData) ||
      !("timestamp" in parsedData) ||
      typeof (parsedData as Record<string, unknown>).email !== "string" ||
      typeof (parsedData as Record<string, unknown>).password !== "string" ||
      typeof (parsedData as Record<string, unknown>).timestamp !== "number"
    ) {
      return false;
    }

    const now = Date.now();
    const timeDiff = now - (parsedData as { timestamp: number }).timestamp;
    if (timeDiff > COOKIE_MAX_AGE * 1000) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth?.user;

  // 정적 파일과 Next.js 내부 파일들은 통과
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname.includes(".") // 확장자가 있는 파일들
  ) {
    return;
  }

  // 1. 로그인한 사용자가 인증 페이지에 접근하는 경우 → 메인으로 리다이렉트
  if (isLoggedIn && isMatchPath(pathname, AUTH_PATHS)) {
    return Response.redirect(new URL("/", req.url));
  }

  // 2. basic-info 페이지에 접근할 때 임시 데이터 검증
  if (pathname === "/auth/signup/basic-info") {
    if (!isValidTempSignupData(req)) {
      return Response.redirect(new URL("/auth/signup", req.url));
    }
  }

  // 3. 비로그인 사용자가 보호된 경로에 접근하는 경우 → 로그인으로 리다이렉트
  if (!isLoggedIn && isMatchPath(pathname, PROTECTED_PATHS)) {
    const loginUrl = new URL("/auth/login", req.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }

    return Response.redirect(loginUrl);
  }

  // 4. 공개 경로나 인증 페이지는 통과
  if (
    isMatchPath(pathname, PUBLIC_PATHS) ||
    isMatchPath(pathname, AUTH_PATHS)
  ) {
    return;
  }

  // 5. 기타 경로는 기본적으로 통과 (필요시 보호된 경로에 추가)
  return;
});

export const config = {
  matcher: [
    /*
     * 모든 요청에 대해 미들웨어 실행 (API routes와 정적 파일 제외)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

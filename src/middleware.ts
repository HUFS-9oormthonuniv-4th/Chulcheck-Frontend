import { auth } from "@/app/auth/auth";

// 인증이 필요한 경로들 (보호된 경로)
const PROTECTED_PATHS = [
  "/admin*", // admin으로 시작하는 모든 경로
  // 필요시 추가
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

// 경로 매칭 함수
function isMatchPath(pathname: string, patterns: string[]) {
  return patterns.some((pattern) => {
    if (pattern.endsWith("*")) {
      // 와일드카드 매칭
      const prefix = pattern.slice(0, -1);
      return pathname.startsWith(prefix);
    }
    // 정확한 매칭
    return pathname === pattern;
  });
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

  // 2. 비로그인 사용자가 보호된 경로에 접근하는 경우 → 로그인으로 리다이렉트
  if (!isLoggedIn && isMatchPath(pathname, PROTECTED_PATHS)) {
    console.log(`🔒 인증되지 않은 접근 시도: ${pathname}`);

    const loginUrl = new URL("/auth/login", req.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }

    return Response.redirect(loginUrl);
  }

  // 3. 공개 경로나 인증 페이지는 통과
  if (
    isMatchPath(pathname, PUBLIC_PATHS) ||
    isMatchPath(pathname, AUTH_PATHS)
  ) {
    return;
  }

  // 4. 기타 경로는 기본적으로 통과 (필요시 보호된 경로에 추가)
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

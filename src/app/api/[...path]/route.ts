// app/api/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/app/auth/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

// 인증이 불필요한 엔드포인트들
const PUBLIC_ENDPOINTS = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/validate",
  "/api/test/",
];

// 경로가 공개 엔드포인트인지 확인
function isPublicEndpoint(pathname: string): boolean {
  return PUBLIC_ENDPOINTS.some((endpoint) => pathname.startsWith(endpoint));
}

async function apiHandler(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const backendApiUrl = `${BACKEND_URL}${path}`;

  if (!BACKEND_URL) {
    // console.error("NEXT_PUBLIC_API_URL is not configured");
    return NextResponse.json(
      { error: "서버 설정 오류: API URL이 구성되지 않았습니다." },
      { status: 500 },
    );
  }

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");

  if (!isPublicEndpoint(path)) {
    const session = await auth();

    if (session?.accessToken) {
      // 1. Bearer 헤더로 전달 (API 문서의 기본 방식)
      headers.set("Authorization", `Bearer ${session.accessToken}`);

      // 2. 쿠키로도 전달 (일부 엔드포인트에서 쿠키 확인)
      headers.set("Cookie", `Authorization=${session.accessToken}`);
    } else {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 },
      );
    }
  }

  try {
    const response = await fetch(backendApiUrl, {
      method: req.method,
      headers: headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
      // @ts-expect-error - duplex는 experimental 옵션
      duplex: "half",
    });

    const contentType = response.headers.get("content-type");

    if (
      contentType?.startsWith("image/") ||
      contentType?.includes("application/octet-stream") ||
      path.includes("/qr-images/")
    ) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }

    if (contentType?.includes("application/json")) {
      const data: unknown = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        statusText: response.statusText,
      });
    }

    const text = await response.text();
    return new Response(text, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error("API Proxy Error:", {
      path,
      backendApiUrl,
      error: error instanceof Error ? error.message : String(error),
    });

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        { error: "백엔드 서버에 연결할 수 없습니다." },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "API 요청 중계 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }
}

// 모든 HTTP 메소드에 대해 이 핸들러를 사용하도록 export
export const GET = apiHandler;
export const POST = apiHandler;
export const PUT = apiHandler;
export const DELETE = apiHandler;
export const PATCH = apiHandler;

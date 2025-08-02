// app/api/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/app/auth/auth";
import { API_TIMEOUTS, API_ERROR_MESSAGES } from "@/lib/config/api";
import {
  parseResponseBody,
  createTimeoutController,
  handleNetworkError,
} from "@/lib/utils/httpUtils";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

const PUBLIC_ENDPOINTS = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/password-reset/request",
  "/api/auth/validate",
];

function isPublicEndpoint(pathname: string): boolean {
  return PUBLIC_ENDPOINTS.some((endpoint) => pathname.startsWith(endpoint));
}

function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function createResponse(response: Response, body: unknown) {
  const contentType = response.headers.get("content-type");
  if (
    contentType?.startsWith("image/") ||
    contentType?.includes("application/octet-stream") ||
    response.url.includes("/qr-images/")
  ) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }
  if (contentType?.includes("application/json")) {
    return NextResponse.json(body, {
      status: response.status,
      statusText: response.statusText,
    });
  }
  return new Response(String(body), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

async function apiHandler(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (!BACKEND_URL) {
    console.error("NEXT_PUBLIC_API_URL is not configured");
    return createErrorResponse(
      "서버 설정 오류: API URL이 구성되지 않았습니다.",
      500,
    );
  }
  const backendApiUrl = `${BACKEND_URL}${path}`;
  const { controller, timeoutId, clear } = createTimeoutController(
    API_TIMEOUTS.PROXY,
  );
  try {
    const headers = new Headers(req.headers);
    headers.delete("host");
    headers.delete("connection");
    if (!isPublicEndpoint(path)) {
      const session = await auth();
      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
        headers.set("Cookie", `Authorization=${session.accessToken}`);
      } else {
        return createErrorResponse(API_ERROR_MESSAGES.UNAUTHORIZED, 401);
      }
    }
    const response = await fetch(backendApiUrl, {
      method: req.method,
      headers: headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
      signal: controller.signal,
      // @ts-expect-error - duplex는 experimental 옵션
      duplex: "half",
    });
    clear();
    const responseBody = await parseResponseBody(response);
    return createResponse(response, responseBody);
  } catch (error) {
    clear();
    console.error("API Proxy Error:", {
      path,
      backendApiUrl,
      error: error instanceof Error ? error.message : String(error),
    });
    const { message, status } = handleNetworkError(error);
    return createErrorResponse(message, status);
  }
}

export const GET = apiHandler;
export const POST = apiHandler;
export const PUT = apiHandler;
export const DELETE = apiHandler;
export const PATCH = apiHandler;

import { API_ERROR_MESSAGES } from "@/lib/config/api";

export async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  } else {
    try {
      return await response.text();
    } catch {
      return null;
    }
  }
}

export function createTimeoutController(timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeoutId, clear: () => clearTimeout(timeoutId) };
}

export function handleNetworkError(error: unknown): {
  message: string;
  status: number;
} {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return { message: API_ERROR_MESSAGES.TIMEOUT, status: 504 };
    }
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return { message: "백엔드 서버에 연결할 수 없습니다.", status: 503 };
    }
  }
  return { message: "API 요청 중계 중 오류가 발생했습니다.", status: 502 };
}

import { getApiBaseUrl } from "@/lib/config/api";

const TIMEOUT_DURATION = 10000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RequestBody =
  | Record<string, unknown>
  | Array<unknown>
  | string
  | number
  | boolean
  | null;

interface HttpRequestConfig {
  method?: HttpMethod;
  body?: RequestBody;
  headers?: Record<string, string>;
  retries?: number;
  timeout?: number;
}

// 에러 타입들
export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response,
    public responseBody?: unknown,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends Error {
  constructor(message: string = "요청이 시간 초과되었습니다") {
    super(message);
    this.name = "TimeoutError";
  }
}

// 재시도 로직
async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(
  error: Error,
  attempt: number,
  maxRetries: number,
): boolean {
  if (attempt >= maxRetries) return false;

  // 네트워크 에러나 5xx 에러만 재시도
  if (error instanceof NetworkError) return true;
  if (error instanceof HttpError && error.status >= 500) return true;

  return false;
}

// 환경 감지 함수
function isServerEnvironment(): boolean {
  return typeof window === "undefined";
}

export class HttpService {
  private headerInterceptor?: () => Record<string, string>;

  constructor() {
    // 환경별 설정을 생성자에서 제거하고 동적으로 처리
  }

  setHeaderInterceptor(interceptor: () => Record<string, string>) {
    this.headerInterceptor = interceptor;
  }

  // 환경별 URL 생성
  private createUrl(endpoint: string): string {
    let apiPath: string;

    if (endpoint.startsWith("/")) {
      apiPath = endpoint;
    } else if (endpoint.startsWith("auth/")) {
      apiPath = `/api/${endpoint}`;
    } else if (endpoint.startsWith("test/")) {
      apiPath = `/api/${endpoint}`;
    } else if (endpoint.startsWith("save/")) {
      apiPath = `/${endpoint}`;
    } else {
      apiPath = `/api/v1/${endpoint}`;
    }

    if (isServerEnvironment()) {
      // 서버 환경: 백엔드 직접 호출
      const backendUrl = getApiBaseUrl();
      if (!backendUrl) {
        throw new Error("백엔드 URL이 설정되지 않았습니다");
      }
      return `${backendUrl}${apiPath}`;
    } else {
      // 클라이언트 환경: Next.js 프록시 사용
      return apiPath;
    }
  }

  private getHeaders(
    customHeaders?: Record<string, string>,
  ): Record<string, string> {
    const baseHeaders = { "Content-Type": "application/json" };
    const interceptedHeaders = this.headerInterceptor?.() || {};

    return {
      ...baseHeaders,
      ...interceptedHeaders,
      ...customHeaders, // 커스텀 헤더가 최우선
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let responseBody: unknown;
      try {
        responseBody = await response.json();
      } catch {
        try {
          responseBody = await response.text();
        } catch {
          responseBody = null;
        }
      }

      const message = `HTTP ${response.status}: ${response.statusText}`;
      throw new HttpError(message, response.status, response, responseBody);
    }

    try {
      const data: unknown = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError(
        "응답 파싱 중 오류가 발생했습니다",
        response.status,
        response,
      );
    }
  }

  async request<T>(
    endpoint: string,
    config: HttpRequestConfig = {},
  ): Promise<T> {
    const maxRetries = config.retries ?? MAX_RETRIES;
    const timeout = config.timeout ?? TIMEOUT_DURATION;

    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const options: RequestInit = {
          method: config.method || "GET",
          headers: this.getHeaders(config.headers),
          signal: controller.signal,
        };

        if (config.body !== undefined) {
          options.body = JSON.stringify(config.body);
        }

        // 환경별 URL 처리
        const url = this.createUrl(endpoint);
        const response = await fetch(url, options);

        clearTimeout(timeoutId);

        return await this.handleResponse<T>(response);
      } catch (error) {
        clearTimeout(timeoutId);

        const processedError = this.processError(error);
        lastError = processedError;

        // 재시도 로직
        if (shouldRetry(processedError, attempt, maxRetries)) {
          console.warn(
            `HTTP 요청 실패, 재시도 중... (${attempt + 1}/${maxRetries})`,
            {
              endpoint,
              error: processedError.message,
            },
          );
          await delay(RETRY_DELAY * Math.pow(2, attempt)); // 지수 백오프
          continue;
        }

        throw processedError;
      }
    }

    throw lastError!;
  }

  private processError(error: unknown): Error {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return new TimeoutError();
      }
      if (error instanceof HttpError) {
        return error;
      }
      return new NetworkError("네트워크 오류가 발생했습니다", error);
    }

    return new NetworkError("알 수 없는 오류가 발생했습니다");
  }

  // 편의 메서드들
  async get<T>(
    endpoint: string,
    config?: Omit<HttpRequestConfig, "method" | "body">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body?: RequestBody,
    config?: Omit<HttpRequestConfig, "method" | "body">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "POST", body });
  }

  async put<T>(
    endpoint: string,
    body?: RequestBody,
    config?: Omit<HttpRequestConfig, "method" | "body">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "PUT", body });
  }

  async patch<T>(
    endpoint: string,
    body?: RequestBody,
    config?: Omit<HttpRequestConfig, "method" | "body">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "PATCH", body });
  }

  async delete<T>(
    endpoint: string,
    config?: Omit<HttpRequestConfig, "method" | "body">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

export const httpService = new HttpService();

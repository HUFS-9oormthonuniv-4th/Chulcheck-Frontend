import {
  getApiBaseUrl,
  API_TIMEOUTS,
  API_ERROR_MESSAGES,
} from "@/lib/config/api";

import { parseResponseBody, createTimeoutController } from "./httpUtils";

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
  timeout?: number;
}

// 에러 타입들 - react-query와 호환되도록 단순화
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
  constructor(message: string = API_ERROR_MESSAGES.TIMEOUT) {
    super(message);
    this.name = "TimeoutError";
  }
}

function isServerEnvironment(): boolean {
  return typeof window === "undefined";
}

let headerInterceptor: (() => Record<string, string>) | undefined;

export function setHeaderInterceptor(
  interceptor: () => Record<string, string>,
) {
  headerInterceptor = interceptor;
}

function createUrl(endpoint: string): string {
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

function getHeaders(
  customHeaders?: Record<string, string>,
): Record<string, string> {
  const baseHeaders = { "Content-Type": "application/json" };
  const interceptedHeaders = headerInterceptor?.() || {};

  return {
    ...baseHeaders,
    ...interceptedHeaders,
    ...customHeaders,
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const responseBody = await parseResponseBody(response);
    const message = `HTTP ${response.status}: ${response.statusText}`;
    throw new HttpError(message, response.status, response, responseBody);
  }
  try {
    const data: unknown = await parseResponseBody(response);
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

function processError(error: unknown): Error {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return new TimeoutError();
    }
    if (error instanceof HttpError) {
      return error;
    }
    return new NetworkError(API_ERROR_MESSAGES.NETWORK, error);
  }
  return new NetworkError(API_ERROR_MESSAGES.UNKNOWN);
}

export async function request<T>(
  endpoint: string,
  config: HttpRequestConfig = {},
): Promise<T> {
  const timeout = config.timeout ?? API_TIMEOUTS.DEFAULT;
  const { controller, clear } = createTimeoutController(timeout);
  try {
    const options: RequestInit = {
      method: config.method || "GET",
      headers: getHeaders(config.headers),
      signal: controller.signal,
      credentials: "include",
    };
    if (config.body !== undefined) {
      options.body = JSON.stringify(config.body);
    }
    const url = createUrl(endpoint);
    const response = await fetch(url, options);
    clear();
    return await handleResponse<T>(response);
  } catch (error) {
    clear();
    throw processError(error);
  }
}

export async function get<T>(
  endpoint: string,
  config?: Omit<HttpRequestConfig, "method" | "body">,
): Promise<T> {
  return request<T>(endpoint, { ...config, method: "GET" });
}

export async function post<T>(
  endpoint: string,
  body?: RequestBody,
  config?: Omit<HttpRequestConfig, "method" | "body">,
): Promise<T> {
  return request<T>(endpoint, { ...config, method: "POST", body });
}

export async function put<T>(
  endpoint: string,
  body?: RequestBody,
  config?: Omit<HttpRequestConfig, "method" | "body">,
): Promise<T> {
  return request<T>(endpoint, { ...config, method: "PUT", body });
}

export async function patch<T>(
  endpoint: string,
  body?: RequestBody,
  config?: Omit<HttpRequestConfig, "method" | "body">,
): Promise<T> {
  return request<T>(endpoint, { ...config, method: "PATCH", body });
}

export async function del<T>(
  endpoint: string,
  config?: Omit<HttpRequestConfig, "method" | "body">,
): Promise<T> {
  return request<T>(endpoint, { ...config, method: "DELETE" });
}

export const httpService = {
  setHeaderInterceptor,
  request,
  get,
  post,
  put,
  patch,
  delete: del,
};

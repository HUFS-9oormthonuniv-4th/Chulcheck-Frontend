import { z } from "zod";

import {
  UpdateUserInfoRequestSchema,
  UpdateUserInfoResponseSchema,
} from "@/app/profile/_lib/schemas/api";

// API 스키마에서 타입 추출
export type UpdateUserInfoRequest = z.infer<typeof UpdateUserInfoRequestSchema>;
export type UpdateUserInfoResponse = z.infer<
  typeof UpdateUserInfoResponseSchema
>;

// 에러 타입 정의
export enum AuthError {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  REFRESH_TOKEN_INVALID = "REFRESH_TOKEN_INVALID",
  SERVER_ERROR = "SERVER_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
}

export interface AuthErrorResponse {
  error: AuthError;
  message: string;
}

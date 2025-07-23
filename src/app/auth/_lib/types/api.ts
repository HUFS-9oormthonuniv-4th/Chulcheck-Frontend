import { z } from "zod";

import {
  LoginRequestSchema,
  LoginResponseSchema,
  SignupRequestSchema,
  SignupResponseSchema,
  AdditionalInfoRequestSchema,
  LogoutResponseSchema,
  ApiErrorResponseSchema,
  PasswordResetRequestSchema,
  PasswordResetResponseSchema,
} from "@/app/auth/_lib/schemas/api";

// API 스키마에서 타입 추출
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type SignupRequest = z.infer<typeof SignupRequestSchema>;
export type SignupResponse = z.infer<typeof SignupResponseSchema>;
export type AdditionalInfoRequest = z.infer<typeof AdditionalInfoRequestSchema>;
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>;
export type PasswordResetResponse = z.infer<typeof PasswordResetResponseSchema>;

// 토큰 갱신 관련 타입
export interface TokenRefreshRequest {
  refreshToken: string;
}

export interface TokenRefreshResponse {
  token: string;
  refreshToken?: string;
  tokenExpiry?: number;
}

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

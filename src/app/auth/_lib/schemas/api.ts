import { z } from "zod";

import {
  USER_ID_MIN_LENGTH,
  USER_ID_MAX_LENGTH,
  USER_ID_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "@/app/auth/_lib/constants";

// API 요청/응답 스키마 정의 (실제 사용에 맞게 수정)
export const LoginRequestSchema = z.object({
  userId: z
    .string()
    .min(1, "아이디는 필수입니다")
    .email("유효한 이메일을 입력해주세요"),
  password: z.string().min(1, "비밀번호는 필수입니다"),
});

export const LoginResponseSchema = z.object({
  token: z.string().min(1, "토큰이 필요합니다"),
  userId: z.string().min(1, "사용자 ID가 필요합니다"),
  nickname: z.string().min(1, "닉네임이 필요합니다"),
  role: z.string().min(1, "역할이 필요합니다"),
  message: z.string(),
  refreshToken: z.string().optional(), // 리프레시 토큰 추가
  tokenExpiry: z.number().optional(), // 토큰 만료 시간 추가
});

export const SignupRequestSchema = z.object({
  userId: z
    .string()
    .min(1, "이메일은 필수입니다")
    .email("유효한 이메일을 입력해주세요"),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다`,
    )
    .regex(
      PASSWORD_REGEX,
      "비밀번호는 영문, 숫자, 특수문자(@$!%*#?&)를 모두 포함해야 합니다",
    ),
  name: z.string().optional(),
  school: z.string().optional(),
  major: z.string().optional(),
  studentNum: z.string().optional(),
});

export const SignupResponseSchema = z.object({
  message: z.string(),
});

// AdditionalInfoRequest 스키마 추가 (API spec에 따라)
export const AdditionalInfoRequestSchema = z.object({
  name: z.string().optional(),
  school: z.string().optional(),
  major: z.string().optional(),
  studentNum: z.string().optional(),
});

export const LogoutResponseSchema = z.object({
  message: z.string(),
});

export const PasswordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, "이메일은 필수입니다")
    .email("유효한 이메일을 입력해주세요"),
});

export const PasswordResetResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.object({}),
});

// API 에러 응답 스키마
export const ApiErrorResponseSchema = z.object({
  message: z.string().optional(),
  status: z.number().optional(),
  code: z.string().optional(),
  error: z.string().optional(),
});

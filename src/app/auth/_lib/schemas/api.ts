import { z } from "zod";

// API 요청/응답 스키마 정의
export const LoginRequestSchema = z.object({
  userId: z
    .string()
    .min(1, "이메일은 필수입니다")
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
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  name: z.string().min(1, "이름은 필수입니다"),
  school: z.string().min(1, "학교는 필수입니다"),
  major: z.string().min(1, "전공은 필수입니다"),
  studentNum: z.string().min(1, "학번은 필수입니다"),
});

export const SignupResponseSchema = z.object({
  message: z.string(),
});

export const LogoutResponseSchema = z.object({
  message: z.string(),
});

// API 에러 응답 스키마
export const ApiErrorResponseSchema = z.object({
  message: z.string().optional(),
  status: z.number().optional(),
  code: z.string().optional(),
  error: z.string().optional(),
});

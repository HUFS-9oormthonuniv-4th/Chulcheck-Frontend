import { z } from "zod";

import {
  PASSWORD_MIN_LENGTH,
  STUDENT_ID_MAX_LENGTH,
  FORM_PASSWORD_REGEX,
  ERROR_MESSAGES,
} from "@/app/auth/_lib/constants";

// 로그인 폼 검증 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_EMAIL)
    .email(ERROR_MESSAGES.INVALID_EMAIL),
  password: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_PASSWORD)
    .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_SHORT)
    .regex(FORM_PASSWORD_REGEX, ERROR_MESSAGES.PASSWORD_PATTERN),
});

// 회원가입 폼 검증 스키마
export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, ERROR_MESSAGES.REQUIRED_EMAIL)
      .email(ERROR_MESSAGES.INVALID_EMAIL),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_SHORT)
      .regex(FORM_PASSWORD_REGEX, ERROR_MESSAGES.PASSWORD_PATTERN),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_MISMATCH),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ["confirmPassword"],
  });

// 비밀번호 재설정 폼 검증 스키마
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_SHORT)
      .regex(FORM_PASSWORD_REGEX, ERROR_MESSAGES.PASSWORD_PATTERN),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
  });

// 기본 정보 입력 폼 검증 스키마
export const basicInfoSchema = z.object({
  name: z.string().min(1, ERROR_MESSAGES.REQUIRED_NAME),
  school: z.string().min(1, ERROR_MESSAGES.REQUIRED_SCHOOL),
  department: z.string().min(1, ERROR_MESSAGES.REQUIRED_DEPARTMENT),
  studentId: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_STUDENT_ID)
    .max(STUDENT_ID_MAX_LENGTH, ERROR_MESSAGES.STUDENT_ID_LENGTH),
});

// 비밀번호 재설정 폼 검증 스키마
export const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_EMAIL)
    .email(ERROR_MESSAGES.INVALID_EMAIL),
});

// // 비밀번호 재설정 폼 검증 스키마
// export const passwordResetSchema = z.object({
//   password: z
//     .string()
//     .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_SHORT)
//     .regex(FORM_PASSWORD_REGEX, ERROR_MESSAGES.PASSWORD_PATTERN),
//   confirmPassword: z.string(),
// });

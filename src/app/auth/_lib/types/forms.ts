import { z } from "zod";

import {
  loginSchema,
  signupSchema,
  resetPasswordSchema,
  basicInfoSchema,
  passwordResetSchema,
} from "@/app/auth/_lib/schemas/validation";

// 폼 검증 스키마에서 타입 추출
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signupSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

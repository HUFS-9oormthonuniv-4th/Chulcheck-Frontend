import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("유효한 이메일 주소를 입력해주세요."),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요.")
    .min(
      PASSWORD_MIN_LENGTH,
      `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
    )
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("유효한 이메일을 입력해주세요."),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
      )
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
        "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.",
      ),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호가 일치하지 않습니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signupSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
      )
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
        "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

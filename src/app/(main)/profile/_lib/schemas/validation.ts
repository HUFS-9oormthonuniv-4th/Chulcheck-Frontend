import { z } from "zod";

import { STUDENT_ID_MAX_LENGTH } from "@/app/auth/_lib/constants";

export const updateUserInfoSchema = z.object({
  nickname: z
    .string()
    .min(1, "닉네임은 필수입니다")
    .max(20, "닉네임은 20자 이하로 입력해주세요")
    .optional()
    .or(z.literal("")),
  name: z
    .string()
    .min(1, "이름은 필수입니다")
    .max(50, "이름은 50자 이하로 입력해주세요")
    .optional()
    .or(z.literal("")),
  school: z
    .string()
    .max(100, "학교명은 100자 이하로 입력해주세요")
    .optional()
    .or(z.literal("")),
  major: z
    .string()
    .max(100, "전공은 100자 이하로 입력해주세요")
    .optional()
    .or(z.literal("")),
  studentNum: z
    .string()
    .max(
      STUDENT_ID_MAX_LENGTH,
      `학번은 ${STUDENT_ID_MAX_LENGTH}자 이하로 입력해주세요`,
    )
    .optional()
    .or(z.literal("")),
  image: z
    .string()
    .url("올바른 이미지 URL을 입력해주세요")
    .optional()
    .or(z.literal("")),
});

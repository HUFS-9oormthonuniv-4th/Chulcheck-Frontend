import { z } from "zod";

// 사용자 정보 업데이트 스키마
export const UpdateUserInfoRequestSchema = z.object({
  nickname: z.string().optional(),
  image: z.string().optional(),
  name: z.string().optional(),
  school: z.string().optional(),
  major: z.string().optional(),
  studentNum: z.string().optional(),
});

export const UpdateUserInfoResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z
    .object({
      userId: z.string(),
      nickname: z.string(),
      image: z.string(),
      role: z.string(),
      name: z.string(),
      school: z.string(),
      major: z.string(),
      studentNum: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      isActive: z.boolean(),
      isOAuthUser: z.boolean(),
    })
    .nullable(),
});

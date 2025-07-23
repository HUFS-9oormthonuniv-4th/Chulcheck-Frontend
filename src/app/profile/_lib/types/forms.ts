import { z } from "zod";

import { updateUserInfoSchema } from "@/app/profile/_lib/schemas/validation";

// 폼 검증 스키마에서 타입 추출
export type UpdateUserInfoFormData = z.infer<typeof updateUserInfoSchema>;

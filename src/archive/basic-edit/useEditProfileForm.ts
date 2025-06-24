import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 상수 정의
const STUDENT_ID_MAX_LENGTH = 9;

// zod 스키마 정의
const editProfileSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  school: z.string().min(1, "학교를 입력해주세요."),
  department: z.string().min(1, "학과를 입력해주세요."),
  studentId: z
    .string()
    .min(1, "학번을 입력해주세요.")
    .max(
      STUDENT_ID_MAX_LENGTH,
      `학번은 ${STUDENT_ID_MAX_LENGTH}자를 맞춰서 작성해주세요.`,
    ),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export function useEditProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      school: "",
      department: "",
      studentId: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: EditProfileFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      // TODO: 실제 수정 API 연동
      await new Promise((resolve) => setTimeout(resolve, 500));
      // window.location.href = "/profile";
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "수정 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, serverError, onSubmit };
}

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  UpdateUserInfoFormData,
  updateUserInfoSchema,
} from "@/app/profile/_lib";
import { editProfile } from "@/app/profile/api/EditProfile";
import { useUser } from "@/lib/hooks/useUser";

export function useEditProfileForm() {
  const { data: user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<UpdateUserInfoFormData>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      nickname: "",
      name: "",
      school: "",
      major: "",
      studentNum: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (user) {
      form.reset({
        nickname: user.userId || "",
        name: user.name || "",
        school: user.school || "",
        major: user.major || "",
        studentNum: user.studentNum || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: UpdateUserInfoFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // 실제 API 호출
      await editProfile({
        nickname: data.nickname,
        name: data.name,
        school: data.school,
        major: data.major,
        studentNum: data.studentNum,
        // image는 현재 폼에 없으므로 제외
      });

      // 성공 시 사용자 데이터 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: ["user", "me"] });

      // 성공 시 루트 페이지로 이동
      router.push("/");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      setServerError(
        error instanceof Error
          ? error.message
          : "프로필 수정 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, serverError, onSubmit };
}

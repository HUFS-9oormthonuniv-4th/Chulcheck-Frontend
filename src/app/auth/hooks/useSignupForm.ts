import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signupSchema, SignUpFormData } from "@/app/auth/_lib";
import { saveTempSignupData } from "@/app/auth/actions/signup";

export function useSignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // 서버 액션을 통해 임시 데이터 저장
      const result = await saveTempSignupData(data);

      if (!result.success) {
        throw new Error(result.message);
      }

      // 성공 시 기본정보 페이지로 이동
      router.push("/auth/signup/basic-info");
    } catch (error) {
      console.error("회원가입 단계 이동 실패:", error);
      setServerError(
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, serverError, onSubmit };
}

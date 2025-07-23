import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { newPasswordSchema, NewPasswordFormData } from "@/app/auth/_lib";
import { newPassword } from "@/app/auth/api/new-password";

export function useNewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // URL에서 토큰 가져오기
  const token = searchParams.get("token");

  const form = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    if (!token) {
      setServerError("유효하지 않은 토큰입니다.");
      return;
    }

    setIsLoading(true);
    setServerError(null);

    try {
      // 비밀번호 재설정 API 호출
      await newPassword(token, data.password);

      // 성공 시 로그인 페이지로 이동
      router.push("/auth/login?message=password-reset-success");
    } catch (error) {
      console.error("비밀번호 초기화 실패:", error);
      setServerError(
        error instanceof Error
          ? error.message
          : "비밀번호 초기화 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, serverError, onSubmit, token };
}

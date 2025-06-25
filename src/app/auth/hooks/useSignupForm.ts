import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signupSchema, SignUpFormData } from "@/validation/auth-validation";

export function useSignupForm() {
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
      // TODO: 실제 회원가입 API 연동
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("회원가입 시도:", data);
      // window.location.href = '/';
    } catch (error) {
      console.error("회원가입 실패:", error);
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

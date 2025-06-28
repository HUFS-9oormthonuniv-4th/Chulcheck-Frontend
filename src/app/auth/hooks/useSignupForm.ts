import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signupSchema, SignUpFormData } from "@/app/auth/_lib";

const SIGNUP_TEMP_DATA_KEY = "chulcheck_signup_temp_data";

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

  const onSubmit = (data: SignUpFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // 임시 회원가입 데이터를 로컬스토리지에 저장
      const tempSignupData = {
        email: data.email,
        password: data.password,
        timestamp: Date.now(),
      };

      localStorage.setItem(
        SIGNUP_TEMP_DATA_KEY,
        JSON.stringify(tempSignupData),
      );

      // 약간의 지연을 주어 로딩 상태를 사용자가 볼 수 있도록 함
      setTimeout(() => {
        setIsLoading(false);
        // basic-info 페이지로 이동
        router.push("/auth/signup/basic-info");
      }, 300);
    } catch (error) {
      console.error("회원가입 단계 이동 실패:", error);
      setServerError(
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.",
      );
      setIsLoading(false);
    }
  };

  return { form, isLoading, serverError, onSubmit };
}

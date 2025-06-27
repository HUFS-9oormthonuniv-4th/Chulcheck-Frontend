import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { loginSchema, LoginFormData } from "@/app/auth/_lib";

export function useLoginForm(callbackUrl?: string | null) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        userId: data.email,
        password: data.password,
      });

      if (result?.error) {
        const errorMessage = (() => {
          switch (result.error) {
            case "CredentialsSignin":
              return "이메일 또는 비밀번호가 올바르지 않습니다.";
            case "CallbackRouteError":
              return "로그인 처리 중 오류가 발생했습니다.";
            case "Configuration":
              return "시스템 설정 오류가 발생했습니다.";
            default:
              return result.error;
          }
        })();

        setServerError(errorMessage);
        return;
      }

      // 성공 시 callbackUrl이 있으면 해당 페이지로, 없으면 기본 페이지로 이동
      const redirectUrl = callbackUrl || "/";
      router.push(redirectUrl);
    } catch (error) {
      console.error("Login error:", error);
      setServerError(
        error instanceof Error
          ? error.message
          : "로그인 중 예기치 못한 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, serverError, onSubmit };
}

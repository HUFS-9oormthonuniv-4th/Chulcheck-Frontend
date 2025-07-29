import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginSchema, LoginFormData } from "@/app/auth/_lib";

export function useLoginForm(callbackUrl?: string | null) {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
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

        throw new Error(errorMessage);
      }

      return result;
    },
    onSuccess: () => {
      // 성공 시 callbackUrl이 있으면 해당 페이지로, 없으면 기본 페이지로 이동
      const redirectUrl = callbackUrl || "/";
      router.push(redirectUrl);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isLoading: loginMutation.isPending,
    serverError: loginMutation.error?.message || null,
    onSubmit: handleFormSubmit,
  };
}

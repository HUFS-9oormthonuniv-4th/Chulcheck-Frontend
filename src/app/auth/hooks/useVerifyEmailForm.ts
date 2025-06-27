import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { verifyEmailSchema, VerifyEmailFormData } from "@/app/auth/_lib";

export function useVerifyEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setIsLoading(true);
    try {
      // TODO: 이메일 인증 확인 로직 필요, 인증 완료 후 라우터 이동처리
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push("/auth/reset-password");
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
}

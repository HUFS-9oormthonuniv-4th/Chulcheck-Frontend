import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { passwordResetSchema, PasswordResetFormData } from "@/app/auth/_lib";

export function usePasswordResetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    try {
      // TODO: 비밀번호 재설정 이메일 전송 로직 필요, 완료 후 라우터 이동처리
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push("/auth/password-reset/confirmation");
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
}

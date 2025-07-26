import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { passwordResetSchema, PasswordResetFormData } from "@/app/auth/_lib";
import { passwordReset } from "@/app/auth/api/password-reset";

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
      await passwordReset(data.email);
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push("/auth/password-reset/confirmation");
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
}

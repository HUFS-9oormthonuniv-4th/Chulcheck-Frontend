"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/validation/auth-validation";

export function useResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log("비밀번호 변경 로직: ", data);
      alert("비밀번호 변경 완료!");
      // TODO: 비밀번호 재설정 API 호출
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
}

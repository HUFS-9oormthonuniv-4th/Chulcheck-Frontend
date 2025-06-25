import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("유효한 이메일 주소를 입력해주세요."),
});

export type VerifyEmailFormData = z.infer<typeof schema>;

export function useVerifyEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(schema),
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

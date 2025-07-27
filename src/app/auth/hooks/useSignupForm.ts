import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signupSchema, SignUpFormData } from "@/app/auth/_lib";
import { saveTempSignupData } from "@/app/auth/actions/signup";

export function useSignupForm() {
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const signupMutation = useMutation({
    mutationFn: saveTempSignupData,
    onSuccess: () => {
      // 성공 시 기본정보 페이지로 이동
      router.push("/auth/signup/basic-info");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    signupMutation.mutate(data);
  };

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isLoading: signupMutation.isPending,
    serverError: signupMutation.error?.message || null,
    onSubmit: handleFormSubmit,
  };
}

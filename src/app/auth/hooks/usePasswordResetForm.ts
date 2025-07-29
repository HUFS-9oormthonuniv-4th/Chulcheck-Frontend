import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { passwordResetSchema, PasswordResetFormData } from "@/app/auth/_lib";
import { passwordReset } from "@/app/auth/api/password-reset";

export function usePasswordResetForm() {
  const router = useRouter();

  const form = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: { email: "" },
  });

  const passwordResetMutation = useMutation({
    mutationFn: async (data: PasswordResetFormData) => {
      await passwordReset(data.email);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return true;
    },
    onSuccess: () => {
      router.push("/auth/password-reset/confirmation");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: PasswordResetFormData) => {
    passwordResetMutation.mutate(data);
  };

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isLoading: passwordResetMutation.isPending,
    serverError: passwordResetMutation.error?.message || null,
    onSubmit: handleFormSubmit,
  };
}

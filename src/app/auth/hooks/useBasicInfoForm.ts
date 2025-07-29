import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { basicInfoSchema, BasicInfoFormData } from "@/app/auth/_lib";
import { completeSignup } from "@/app/auth/actions/signup";

export function useBasicInfoForm() {
  const router = useRouter();

  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
      school: "",
      department: "",
      studentId: "",
    },
    mode: "onSubmit",
  });

  const completeSignupMutation = useMutation({
    mutationFn: completeSignup,
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: BasicInfoFormData) => {
    completeSignupMutation.mutate(data);
  };

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isLoading: completeSignupMutation.isPending,
    serverError: completeSignupMutation.error?.message || null,
    onSubmit: handleFormSubmit,
  };
}

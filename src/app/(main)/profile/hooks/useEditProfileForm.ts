import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { UpdateUserInfoResponse } from "@/app/(main)/profile/_lib";
import {
  UpdateUserInfoFormData,
  updateUserInfoSchema,
} from "@/app/(main)/profile/_lib";
import { editProfile } from "@/app/(main)/profile/api/EditProfile";
import { useUser } from "@/lib/hooks/useUser";

export function useEditProfileForm() {
  const { data: user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<UpdateUserInfoFormData>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      nickname: "",
      name: "",
      school: "",
      major: "",
      studentNum: "",
    },
    mode: "onSubmit",
  });

  const editProfileMutation = useMutation({
    mutationFn: editProfile,
    onMutate: async (newData: UpdateUserInfoFormData) => {
      // 이전 데이터 백업
      await queryClient.cancelQueries({ queryKey: ["user", "me"] });
      const previousData = queryClient.getQueryData<UpdateUserInfoResponse>([
        "user",
        "me",
      ]);

      // 낙관적 업데이트
      queryClient.setQueryData<UpdateUserInfoResponse>(
        ["user", "me"],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            ...newData,
          };
        },
      );

      return { previousData };
    },
    onSuccess: () => {
      toast.success("프로필 수정이 완료되었어요");
      router.push("/");
    },
    onError: (
      error: Error,
      newData: UpdateUserInfoFormData,
      context: { previousData: UpdateUserInfoResponse | undefined } | undefined,
    ) => {
      toast.error(error.message);

      if (context?.previousData) {
        queryClient.setQueryData(["user", "me"], context.previousData);
      }
    },
    onSettled: async () => {
      // 성공/실패 관계없이 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        nickname: user.nickname || "",
        name: user.name || "",
        school: user.school || "",
        major: user.major || "",
        studentNum: user.studentNum || "",
      });
    }
  }, [user, form]);

  const onSubmit = (data: UpdateUserInfoFormData) => {
    editProfileMutation.mutate({
      nickname: data.nickname,
      name: data.name,
      school: data.school || "",
      major: data.major || "",
      studentNum: data.studentNum || "",
    });
  };

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isLoading: editProfileMutation.isPending,
    serverError: editProfileMutation.error?.message || null,
    onSubmit: handleFormSubmit,
  };
}

"use client";

import { EditProfileForm } from "@/app/(main)/profile/components/EditProfileForm";
import { useEditProfileForm } from "@/app/(main)/profile/hooks/useEditProfileForm";
import Header from "@/components/ui/Header";
import { useUser } from "@/lib/hooks/useUser";

export default function EditProfilePage() {
  const { isLoading: isUserLoading } = useUser();
  const {
    form,
    isLoading: isFormLoading,
    serverError,
    onSubmit,
  } = useEditProfileForm();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col gap-2 mt-4">
        <Header variant="main" />
        <EditProfileForm
          form={form}
          isLoading={isUserLoading || isFormLoading}
          serverError={serverError}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

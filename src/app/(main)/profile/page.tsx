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
      <div className="flex flex-col items-left w-full max-w-xl mx-auto py-4">
        <Header variant="main" />
        <EditProfileForm
          form={form}
          isUserLoading={isUserLoading}
          isSubmitting={isFormLoading}
          serverError={serverError}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

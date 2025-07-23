"use client";

import { EditProfileForm } from "@/app/profile/components/EditProfileForm";
import { useEditProfileForm } from "@/app/profile/hooks/useEditProfileForm";

export default function EditProfilePage() {
  const { form, isLoading, serverError, onSubmit } = useEditProfileForm();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[310px] flex flex-col gap-2 mt-10">
        <EditProfileForm
          form={form}
          isLoading={isLoading}
          serverError={serverError}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

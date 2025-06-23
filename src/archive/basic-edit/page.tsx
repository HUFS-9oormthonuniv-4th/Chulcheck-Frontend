"use client";

import { EditProfileForm } from "@/archive/basic-edit/EditProfileForm";
import { useEditProfileForm } from "@/archive/basic-edit/useEditProfileForm";

export default function BasicEditPage() {
  const { form, isLoading, serverError, onSubmit } = useEditProfileForm();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-full h-10" />
      <EditProfileForm
        form={form}
        isLoading={isLoading}
        serverError={serverError}
        onSubmit={onSubmit}
      />
    </div>
  );
}

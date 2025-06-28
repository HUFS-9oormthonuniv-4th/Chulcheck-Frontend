"use client";

import { BasicInfoForm } from "@/app/auth/components/BasicInfoForm";
import { useBasicInfoForm } from "@/app/auth/hooks/useBasicInfoForm";

export default function BasicInfoPage() {
  const { form, isLoading, serverError, onSubmit } = useBasicInfoForm();

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="w-full max-w-[310px] flex flex-col gap-2 mt-10">
        <BasicInfoForm
          form={form}
          isLoading={isLoading}
          serverError={serverError}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

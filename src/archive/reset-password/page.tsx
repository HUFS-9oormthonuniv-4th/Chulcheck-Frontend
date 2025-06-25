"use client";

import ResetPasswordForm from "@/archive/reset-password/ResetPasswordForm";
import { useResetPasswordForm } from "@/archive/reset-password/useResetPasswordForm";
import { TitleAndDescription } from "@/components/ui/TitleAndDescription";

export default function ResetPasswordPage() {
  const { form, isLoading, onSubmit } = useResetPasswordForm();
  return (
    <div className="flex flex-col items-center bg-white">
      <div className="w-full max-w-[310px] flex flex-col gap-4 mt-10">
        {/* 타이틀 */}
        <TitleAndDescription
          title="비밀번호 초기화"
          description="새로운 비밀번호를 입력해주세요"
        />

        {/* 비밀번호 초기화 폼 */}
        <div className="w-full max-w-[310px]">
          <ResetPasswordForm
            form={form}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

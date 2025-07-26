"use client";

import { Suspense } from "react";

import { NewPasswordForm } from "@/app/auth/components/NewPassword";
import { useNewPasswordForm } from "@/app/auth/hooks/useNewPasswordForm";

function NewPasswordContent() {
  const { form, isLoading, serverError, onSubmit, token } =
    useNewPasswordForm();

  //   if (!token) {
  //     return (
  //       <div className="flex flex-col items-center">
  //         <div className="w-full max-w-[310px] flex flex-col gap-2 mt-10">
  //           <div className="text-center text-red-500">
  //             유효하지 않은 토큰입니다. 비밀번호 재설정 링크를 다시 확인해주세요.
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[310px] flex flex-col gap-2 mt-10">
        <NewPasswordForm
          form={form}
          isLoading={isLoading}
          serverError={serverError}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordContent />
    </Suspense>
  );
}

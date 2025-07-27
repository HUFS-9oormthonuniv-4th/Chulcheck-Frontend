"use client";

import Image from "next/image";
import Link from "next/link";

import { PasswordResetForm } from "@/app/auth/components/PasswordResetForm";
import { usePasswordResetForm } from "@/app/auth/hooks/usePasswordResetForm";
import { TitleAndDescription } from "@/components/TitleAndDescription";

export default function PasswordResetPage() {
  const { form, isLoading, serverError, onSubmit } = usePasswordResetForm();

  return (
    <div className="flex flex-col items-center">
      {/* 뒤로가기 버튼 */}
      <div className="w-full px-3 max-w-[375px]">
        <Link
          href="/auth/login"
          className="flex text-xl font-semibold text-[#0F172AE5] gap-1"
        >
          <Image
            src="/assets/icons/arrow-up.svg"
            width={15}
            height={15}
            alt="back"
          />
          돌아가기
        </Link>
      </div>

      <div className="w-full max-w-[310px] flex flex-col gap-4 mt-10">
        {/* 타이틀 */}
        <TitleAndDescription
          title="비밀번호 재설정"
          description="가입한 이메일로 재설정 링크를 보내드려요"
        />

        {/* 비밀번호 재설정 폼 */}
        <div className="w-full max-w-[310px]">
          <PasswordResetForm
            form={form}
            isLoading={isLoading}
            serverError={serverError}
            onSubmit={onSubmit}
          />
          <div className="mt-3 text-xs text-start text-[#64748B]">
            <Link href="/auth/login" className="hover:underline">
              <span className="font-medium">로그인페이지로 </span>
              <span className="font-bold">돌아가기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { SignupForm } from "@/app/auth/components/SignupForm";
import { SocialLoginButtons } from "@/app/auth/components/SocialLogin/SocialLoginButtons";
import { useSignupForm } from "@/app/auth/hooks/useSignupForm";
import { TitleAndDescription } from "@/components/TitleAndDescription";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  const { isLoading, serverError, form, onSubmit } = useSignupForm();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[310px] flex flex-col gap-2 mt-10">
        {/* 타이틀 영역 */}
        <TitleAndDescription
          title="회원가입"
          description="계정 정보를 입력하여 회원가입 하세요"
        />

        {/* 폼 영역 */}
        <SignupForm
          isLoading={isLoading}
          serverError={serverError}
          form={form}
          onSubmit={onSubmit}
        />

        {/* 로그인 페이지 연결 */}
        <p className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <span
            className="cursor-pointer font-semibold text-primary hover:underline"
            onClick={() => router.push("/auth/login")}
          >
            로그인
          </span>
        </p>

        {/* 구분선 */}
        <div className="flex items-center justify-center my-4 relative">
          <Separator className="absolute w-full bg-[#E2E8F0]" />
          <span className="bg-white px-4 z-10 text-xs text-[#94A3B8]">
            또는
          </span>
        </div>

        {/* 소셜 로그인 버튼 컴포넌트 */}
        <SocialLoginButtons isLoading={isLoading} />
      </div>
    </div>
  );
}

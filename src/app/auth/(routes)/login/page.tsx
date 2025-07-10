"use client";

import { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { ErrorAlert } from "@/app/auth/components/ErrorAlert";
import { LoginForm } from "@/app/auth/components/LoginForm";
import { SocialLoginButtons } from "@/app/auth/components/SocialLogin/SocialLoginButtons";
import { useLoginForm } from "@/app/auth/hooks/useLoginForm";
import LogoWordmark from "@/components/svg/logo_wordmark";
import { Separator } from "@/components/ui/separator";

// useSearchParams를 사용하는 에러 메시지 컴포넌트를 별도로 분리
function ErrorMessageFromURL() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const errorMessage = (() => {
    switch (urlError) {
      case "TokenExpired":
        return "로그인이 만료되었습니다. 다시 로그인해주세요.";
      case "AuthError":
        return "인증 오류가 발생했습니다. 다시 로그인해주세요.";
      default:
        return null;
    }
  })();

  return errorMessage ? <ErrorAlert message={errorMessage} /> : null;
}

// callbackUrl을 가져오는 컴포넌트
function LoginFormWithCallback() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { isLoading, serverError, form, onSubmit } = useLoginForm(callbackUrl);

  return (
    <>
      <LoginForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        serverError={serverError}
        form={form}
      />

      {/* 구분선 */}
      <div className="flex items-center justify-center my-4 relative">
        <Separator className="absolute w-full bg-[#E2E8F0]" />
        <span className=" px-4 z-10 text-xs text-[#94A3B8]">또는</span>
      </div>

      {/* 소셜 로그인 버튼 컴포넌트 */}
      <SocialLoginButtons isLoading={isLoading} />
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-10" />

      {/* 로고 영역 */}
      <div className="flex justify-center items-center mt-12">
        <LogoWordmark className="w-full h-full" />
      </div>

      {/* 폼 영역 */}
      <div className="w-full max-w-[310px] flex flex-col gap-2 mt-10">
        <Suspense fallback={null}>
          <ErrorMessageFromURL />
        </Suspense>

        <Suspense fallback={<div>로딩중...</div>}>
          <LoginFormWithCallback />
        </Suspense>
      </div>
    </div>
  );
}

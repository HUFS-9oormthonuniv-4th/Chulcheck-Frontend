"use client";

import { Suspense } from "react";

import { useSearchParams } from "next/navigation";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "CredentialsSignin":
        return "이메일 또는 비밀번호가 올바르지 않습니다.";
      case "CallbackRouteError":
        return "로그인 처리 중 오류가 발생했습니다.";
      case "Default":
        return "알 수 없는 오류가 발생했습니다.";
      default:
        return error || "로그인 중 오류가 발생했습니다.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">로그인 오류</h1>
      <p className="text-red-500 mb-4">{getErrorMessage(error)}</p>
      <p className="text-sm text-gray-600 mb-4">에러 코드: {error}</p>
      <button
        onClick={() => (window.location.href = "/auth/login")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        다시 로그인하기
      </button>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}

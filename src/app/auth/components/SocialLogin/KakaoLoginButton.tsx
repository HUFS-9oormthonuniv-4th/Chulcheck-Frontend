"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

export function KakaoLoginButton() {
  const handleLogin = () => {
    window.location.href =
      "https://api.chulcheck.klr.kr/oauth2/authorization/kakao";
  };

  return (
    <Button
      variant="outline"
      className="w-full h-[50px] bg-[#FFDE32] hover:bg-[#FFDE32]/80 border-none text-[#1A1A1A] text-base flex items-center justify-center gap-2 rounded-lg font-normal"
      onClick={handleLogin}
      type="button"
    >
      <Image
        src="/assets/icons/logo-kakaotalk.svg"
        width={20}
        height={18}
        alt="Kakao"
      />
      카카오로 시작하기
    </Button>
  );
}

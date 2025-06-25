import Image from "next/image";

import { Button } from "@/components/ui/button";

interface KakaoLoginButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function KakaoLoginButton({
  isLoading,
  onClick,
}: KakaoLoginButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full h-[50px] bg-[#FFDE32] hover:bg-[#FFDE32]/80 border-none text-[#1A1A1A] text-base flex items-center justify-center gap-2 rounded-lg font-normal"
      disabled={isLoading}
      onClick={onClick}
      type="button"
    >
      <Image
        src="/assets/icons/logo-kakaotalk.svg"
        width={20}
        height={18}
        alt="Kakao"
      />
      카카오로 로그인
    </Button>
  );
}

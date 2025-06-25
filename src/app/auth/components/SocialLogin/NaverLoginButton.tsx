import Image from "next/image";

import { Button } from "@/components/ui/button";

interface NaverLoginButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function NaverLoginButton({
  isLoading,
  onClick,
}: NaverLoginButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full h-[50px] bg-[#03C75A] hover:bg-[#03C75A]/80 border-none text-white text-base flex items-center justify-center gap-2 rounded-lg font-medium"
      disabled={isLoading}
      onClick={onClick}
      type="button"
    >
      <Image
        src="/assets/icons/logo-naver.svg"
        width={16}
        height={16}
        alt="Naver"
      />
      네이버 로그인
    </Button>
  );
}

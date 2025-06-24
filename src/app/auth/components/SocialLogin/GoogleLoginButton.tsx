import Image from "next/image";

import { Button } from "@/components/ui/button";

interface GoogleLoginButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function GoogleLoginButton({
  isLoading,
  onClick,
}: GoogleLoginButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full h-[50px] bg-white border border-[#747775] text-base text-[#1F1F1F] flex items-center justify-center gap-2 rounded-md font-medium"
      disabled={isLoading}
      onClick={onClick}
      type="button"
    >
      <Image
        src="/assets/icons/logo-google.svg"
        width={18}
        height={18}
        alt="Google"
      />
      Google로 로그인
    </Button>
  );
}

import { GoogleLoginButton } from "@/app/auth/components/SocialLogin/GoogleLoginButton";
import { KakaoLoginButton } from "@/app/auth/components/SocialLogin/KakaoLoginButton";
import { NaverLoginButton } from "@/app/auth/components/SocialLogin/NaverLoginButton";

interface SocialLoginButtonsProps {
  isLoading: boolean;
}

export function SocialLoginButtons({ isLoading }: SocialLoginButtonsProps) {
  const handleKakaoLogin = (): void => {
    console.log("카카오 로그인");
  };

  const handleNaverLogin = (): void => {
    console.log("네이버 로그인");
  };

  const handleGoogleLogin = (): void => {
    console.log("구글 로그인");
  };

  return (
    <div className="flex flex-col gap-3">
      <KakaoLoginButton isLoading={isLoading} onClick={handleKakaoLogin} />
      <NaverLoginButton isLoading={isLoading} onClick={handleNaverLogin} />
      <GoogleLoginButton isLoading={isLoading} onClick={handleGoogleLogin} />
    </div>
  );
}

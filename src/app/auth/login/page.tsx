"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// 상수 정의
const PASSWORD_MIN_LENGTH = 6;

// zod 스키마 정의
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("유효한 이메일 주소를 입력해주세요."),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요.")
    .min(
      PASSWORD_MIN_LENGTH,
      `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

// 소셜 로그인 버튼 컴포넌트
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
      {/* 카카오 로그인 */}
      <Button
        variant="outline"
        className="w-full h-[50px] bg-[#FFDE32] hover:bg-[#FFDE32]/80 border-none text-[#1A1A1A] text-base flex items-center justify-center gap-2 rounded-lg font-normal"
        disabled={isLoading}
        onClick={handleKakaoLogin}
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

      {/* 네이버 로그인 */}
      <Button
        variant="outline"
        className="w-full h-[50px] bg-[#03C75A] hover:bg-[#03C75A]/80 border-none text-white text-base flex items-center justify-center gap-2 rounded-lg font-medium"
        disabled={isLoading}
        onClick={handleNaverLogin}
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

      {/* 구글 로그인 */}
      <Button
        variant="outline"
        className="w-full h-[50px] bg-white border border-[#747775] text-base text-[#1F1F1F] flex items-center justify-center gap-2 rounded-md font-medium"
        disabled={isLoading}
        onClick={handleGoogleLogin}
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
    </div>
  );
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // API 예시
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("로그인 시도:", data);

      // TODO: 실제 로그인 API 연동
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      // }

      // window.location.href = '/dashboard';
    } catch (error) {
      console.error("로그인 실패:", error);
      setServerError(
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-full h-10" />

      {/* 로고 영역 */}
      <div className="flex justify-center items-center w-full py-10 mt-4 mb-8">
        <h1
          className="text-2xl font-normal text-primary"
          style={{ fontFamily: "Michroma" }}
        >
          Chulcheck.kr
        </h1>
      </div>

      {/* 폼 영역 */}
      <div className="w-full max-w-[310px] flex flex-col gap-6">
        {serverError && (
          <div
            className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm"
            role="alert"
          >
            {serverError}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-4"
          >
            {/* 이메일 입력 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#0F172A]">
                    이메일
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      className="w-full h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8]"
                      aria-invalid={!!form.formState.errors.email}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* 비밀번호 입력 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#0F172A]">
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      className="w-full h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8]"
                      aria-invalid={!!form.formState.errors.password}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* 하단 링크들 */}
            <div className="flex flex-row items-center justify-between pt-1">
              <Link
                href="/auth/signup"
                className="text-xs font-bold text-primary"
              >
                회원가입
              </Link>
              <Link
                href="/auth/reset-password"
                className="text-xs text-[#94A3B8]"
              >
                비밀번호 재설정
              </Link>
            </div>

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-auto"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Form>

        {/* 구분선 */}
        <div className="flex items-center justify-center my-2 relative">
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

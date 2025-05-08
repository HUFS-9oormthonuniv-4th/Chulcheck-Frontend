"use client";

import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";

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

// 로그인 폼 인터페이스 정의
interface LoginFormData {
  email: string;
  password: string;
}

// 유효성 검사 규칙을 상수로 분리
export const EMAIL_RULES = {
  required: "이메일을 입력해주세요.",
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "유효한 이메일 주소를 입력해주세요.",
  },
};

export const PASSWORD_RULES = {
  required: "비밀번호를 입력해주세요.",
  minLength: {
    value: 6,
    message: "비밀번호는 최소 6자 이상이어야 합니다.",
  },
};

// 더미 로그인 API (실제로는 API 호출 구현 필요)
export const loginApi = async (data: LoginFormData): Promise<void> => {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("API 호출 성공:", data);
  return Promise.resolve();
};

export default function LoginPage() {
  // react-hook-form 설정
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  // 폼 제출 핸들러 - 비동기 처리는 별도 함수로 추출
  const onSubmit = (data: LoginFormData) => {
    console.log("폼 데이터:", data);
    // 여기서 비동기 로직을 호출, void 반환
    void handleLogin(data);
  };

  // 실제 로그인 비동기 처리
  const handleLogin = async (data: LoginFormData) => {
    try {
      // API 호출을 시뮬레이션하기 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("로그인 성공:", data);
      // 여기에 실제 로그인 로직 추가
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-full h-10" />

      {/* 로고 영역 */}
      <div className="flex justify-center items-center w-full py-10 mt-4 mb-8">
        <h1
          className="text-2xl font-normal text-[#3282F0]"
          style={{ fontFamily: "Michroma" }}
        >
          Chulcheck.kr
        </h1>
      </div>

      {/* 폼 영역 */}
      <div className="w-full max-w-[310px] flex flex-col gap-6">
        {/* Form 컴포넌트 활용 */}
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
              rules={EMAIL_RULES}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#0F172A]">
                    이메일
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이메일을 입력 해주세요"
                      className="w-full h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8]"
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
              rules={PASSWORD_RULES}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#0F172A]">
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀 번호를 입력 해주세요"
                      className="w-full h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8]"
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
                className="text-xs font-bold text-[#D6E6FC]"
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
              className="w-full bg-[#3282F0] hover:bg-[#3282F0]/80 text-white text-base font-semibold py-4 rounded-lg h-auto"
            >
              로그인
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

        {/* 소셜 로그인 버튼들 */}
        <div className="flex flex-col gap-3">
          {/* 카카오 로그인 */}
          <Button
            variant="outline"
            className="w-full h-[50px] bg-[#FFDE32] hover:bg-[#FFDE32]/80 border-none text-[#1A1A1A] text-base flex items-center justify-center gap-2 rounded-lg font-normal"
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
      </div>
    </div>
  );
}

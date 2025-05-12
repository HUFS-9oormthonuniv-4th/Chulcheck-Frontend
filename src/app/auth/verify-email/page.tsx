"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const schema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("유효한 이메일 주소를 입력해주세요."),
});

type ForgotPasswordFormData = z.infer<typeof schema>;

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // TODO: 이메일 인증 확인 로직 필요, 인증 완료 후 라우터 이동처리
      console.log("email:", data);
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push("/auth/reset-password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white justify-start">
      <div className="w-full h-11" />

      {/* 상단 네비게이션 */}
      <div className="w-full px-3 max-w-[375px]">
        <Link
          href="/auth/login"
          className="flex text-xl font-semibold text-[#0F172AE5] gap-1"
        >
          <Image
            src="/assets/icons/arrow-up.svg"
            width={15}
            height={15}
            alt="back"
          />
          돌아가기
        </Link>
      </div>

      {/* 타이틀 */}
      <div className="mt-8 mb-3 w-full max-w-[310px] gap-[11px] flex flex-col">
        <h2 className="text-2xl font-bold  text-black">비밀번호 찾기</h2>
        <p className="text-sm font-medium text-[#666666]">
          가입시 입력한 이메일 주소를 입력해주세요
        </p>
      </div>

      {/* 이메일인증 폼 */}
      <div className="w-full max-w-[310px]">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(onSubmit)(e);
            }}
          >
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
                      className="w-full h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-slate-400"
                      aria-invalid={!!form.formState.errors.email}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-white text-lg font-bold py-4 rounded-lg h-auto mt-[50px]"
              disabled={isLoading}
            >
              {isLoading ? "이메일 전송 중..." : "비밀번호 재설정 이메일 받기"}
            </Button>
            <div className="mt-1.5 text-sm text-start text-[#64748B]">
              <Link href="/auth/login" className="hover:underline">
                <span className="font-medium">로그인페이지로 </span>
                <span className="font-bold">돌아가기</span>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { SocialLoginButtons } from "../login/page";

const signUpSchema = z
  .object({
    email: z.string().email("유효한 이메일을 입력해주세요."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상입니다."),
    confirmPassword: z.string().min(6, "비밀번호 확인은 필수입니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      console.log("회원가입 정보:", data);
      //TODO: 가입 api
      //  router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-8 text-gray-900">
      <div className=" py-15">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <p className="mt-2 text-sm text-gray-500">
          계정 정보를 입력하여 회원가입 하세요
        </p>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="space-y-3"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">이메일</label>
          <input
            {...register("email")}
            type="email"
            placeholder="이메일을 입력해주세요"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-primary"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">비밀번호</label>
          <input
            {...register("password")}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-primary"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            비밀번호 확인
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-primary"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-auto"
          disabled={isLoading}
        >
          {isLoading ? "로딩 중 " : "회원가입"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <span
            className="cursor-pointer font-semibold text-primary hover:underline"
            onClick={() => router.push("/auth/login")}
          >
            로그인
          </span>
        </p>

        <div className="flex items-center justify-center gap-2 text-gray-300">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm">또는</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <SocialLoginButtons isLoading={isLoading} />
      </form>
    </div>
  );
}

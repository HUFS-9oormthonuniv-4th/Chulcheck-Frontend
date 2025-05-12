"use client";

import { useState } from "react";

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

const schema = z
  .object({
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type ResetPasswordFormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log("비밀번호 변경 로직: ", data);
      alert("비밀번호 변경 완료!");
      // TODO: 비밀번호 재설정 API 호출
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* 타이틀 */}
      <div className="mt-[105px] flex flex-col gap-[11px] w-full max-w-[310px] mb-4">
        <h2 className="text-2xl leading-[32px] font-bold tracking-normal text-black">
          비밀번호 초기화
        </h2>
        <p className="text-sm font-medium text-[#666666]">
          새로운 비밀번호를 작성후 완료 버튼을 눌러주세요
        </p>
      </div>

      {/* 비밀번호 초기화 폼 */}
      <div className="w-full max-w-[310px]">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(onSubmit)(e);
            }}
            className="flex flex-col gap-1.5"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#0F172A]">
                    새로운 비밀번호
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="새로운 비밀번호를 입력해주세요"
                      className="w-full h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-slate-400"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#0F172A]">
                    새로운 비밀번호 확인
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="변경할 비밀번호를 한번 더 입력해주세요"
                      className="w-full h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-slate-400"
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
              className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-auto mt-[340px]"
              disabled={isLoading}
            >
              {isLoading ? "처리 중..." : "완료"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

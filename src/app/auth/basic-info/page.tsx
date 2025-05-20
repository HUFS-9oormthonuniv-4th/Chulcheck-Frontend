"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TitleAndDescription } from "@/components/TitleAndDescription";
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

// 상수 정의
const STUDENT_ID_MAX_LENGTH = 9;

// zod 스키마 정의
const basicInfoSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  school: z.string().min(1, "학교를 입력해주세요."),
  department: z.string().min(1, "학과를 입력해주세요."),
  studentId: z
    .string()
    .min(1, "학번을 입력해주세요.")
    .max(
      STUDENT_ID_MAX_LENGTH,
      `학번은 ${STUDENT_ID_MAX_LENGTH}자를 맞춰서 작성해주세요.`,
    ),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

export default function BasicInfoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
      school: "",
      department: "",
      studentId: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: BasicInfoFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      // TODO: 실제 가입 API 연동
      await new Promise((resolve) => setTimeout(resolve, 500));
      // window.location.href = "/home";
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "가입 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-full h-10" />
      <div className="w-full max-w-[340px] flex flex-col gap-6 mt-2">
        <TitleAndDescription
          title="기본정보 입력"
          description="서비스 이용을 위해 정보를 입력해주세요."
        />

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
            className="flex flex-col gap-4"
          >
            {/* 이름 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#334155]">
                    이름
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이름을 입력 해주세요"
                      className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                      aria-invalid={!!form.formState.errors.name}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            {/* 학교 */}
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#334155]">
                    학교
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="본인의 학교를 입력해주세요"
                      className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                      aria-invalid={!!form.formState.errors.school}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            {/* 학과 */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#334155]">
                    학과
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="본인의 학과를 입력 해주세요"
                      className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                      aria-invalid={!!form.formState.errors.department}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            {/* 학번 */}
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#334155]">
                    학번
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="학번을 입력 해주세요"
                      className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                      aria-invalid={!!form.formState.errors.studentId}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* 가입완료 버튼 */}
            <div className="mt-10">
              <Button
                type="submit"
                className="w-full h-[56px] bg-[#3974EA] hover:bg-[#3974EA]/90 text-white text-base font-semibold rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? "가입 중..." : "가입완료"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

import React from "react";

import { BasicInfoFormData } from "@/app/auth/_lib";
import { ErrorAlert } from "@/app/auth/components/ErrorAlert";
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

import type { UseFormReturn } from "react-hook-form";

interface BasicInfoFormProps {
  form: UseFormReturn<BasicInfoFormData>;
  isLoading: boolean;
  serverError: string | null;
  onSubmit: (data: BasicInfoFormData) => Promise<void>;
}

export function BasicInfoForm({
  form,
  isLoading,
  serverError,
  onSubmit,
}: BasicInfoFormProps) {
  return (
    <div className="w-full max-w-[340px] flex flex-col gap-6 mt-2">
      <TitleAndDescription
        title="기본정보 입력"
        description="서비스 이용을 위해 정보를 입력해주세요."
      />

      {serverError && <ErrorAlert message={serverError} />}

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
              className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-auto"
              disabled={isLoading}
            >
              {isLoading ? "가입 중..." : "가입완료"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

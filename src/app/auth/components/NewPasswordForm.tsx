import React from "react";

import { NewPasswordFormData } from "@/app/auth/_lib";
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

interface NewPasswordFormProps {
  form: UseFormReturn<NewPasswordFormData>;
  isLoading: boolean;
  serverError: string | null;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function NewPasswordForm({
  form,
  isLoading,
  serverError,
  onSubmit,
}: NewPasswordFormProps) {
  return (
    <div className="w-full max-w-[340px] flex flex-col gap-6 mt-2 text-nowrap">
      <TitleAndDescription
        title="비밀번호 초기화"
        description="새로운 비밀번호를 작성후 완료 버튼을 눌러주세요"
      />

      {serverError && <ErrorAlert message={serverError} />}

      <Form {...form}>
        <form
          onSubmit={(e) => {
            void onSubmit(e);
          }}
          className="flex flex-col gap-4"
        >
          {/* 새로운 비밀번호 */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#334155]">
                  새로운 비밀번호
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="새로운 비밀번호를 입력해주세요"
                    className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                    aria-invalid={!!form.formState.errors.password}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          {/* 새로운 비밀번호 확인 */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#334155]">
                  새로운 비밀번호 확인
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="변경할 비밀번호를 한번 더 입력 해주세요"
                    className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                    aria-invalid={!!form.formState.errors.confirmPassword}
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
              {isLoading ? "변경 중..." : "완료"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

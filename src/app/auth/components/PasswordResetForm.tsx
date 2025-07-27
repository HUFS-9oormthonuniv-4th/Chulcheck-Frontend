import React from "react";

import { ErrorAlert } from "@/app/auth/components/ErrorAlert";
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

import type { PasswordResetFormData } from "@/app/auth/_lib";
import type { UseFormReturn } from "react-hook-form";

interface PasswordResetFormProps {
  form: UseFormReturn<PasswordResetFormData>;
  isLoading: boolean;
  serverError: string | null;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function PasswordResetForm({
  form,
  isLoading,
  serverError,
  onSubmit,
}: PasswordResetFormProps) {
  return (
    <>
      {serverError && <ErrorAlert message={serverError} />}
      <Form {...form}>
        <form
          onSubmit={(e) => {
            void onSubmit(e);
          }}
          className="space-y-10"
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
            className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-13"
            disabled={isLoading}
          >
            {isLoading ? "이메일 전송 중..." : "비밀번호 재설정 이메일 받기"}
          </Button>
        </form>
      </Form>
    </>
  );
}

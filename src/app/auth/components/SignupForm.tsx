import React from "react";

import { UseFormReturn } from "react-hook-form";

import { SignUpFormData } from "@/app/auth/_lib";
import { ErrorAlert } from "@/app/auth/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SignupFormProps {
  isLoading: boolean;
  serverError: string | null;
  form: UseFormReturn<SignUpFormData>;
  onSubmit: (data: SignUpFormData) => void;
}

export function SignupForm({
  isLoading,
  serverError,
  form,
  onSubmit,
}: SignupFormProps) {
  return (
    <>
      {serverError && <ErrorAlert message={serverError} />}
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-5"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#0F172A]">
                  비밀번호 확인
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요"
                    className="w-full h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8]"
                    aria-invalid={!!form.formState.errors.confirmPassword}
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
            {isLoading ? "다음 단계로..." : "다음"}
          </Button>
        </form>
      </Form>
    </>
  );
}

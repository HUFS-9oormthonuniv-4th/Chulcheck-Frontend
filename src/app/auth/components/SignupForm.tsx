import React from "react";

import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { SignUpFormData } from "@/validation/auth-validation";

interface SignupFormProps {
  isLoading: boolean;
  serverError: string | null;
  form: UseFormReturn<SignUpFormData>;
  onSubmit: (data: SignUpFormData) => Promise<void>;
}

export function SignupForm({
  isLoading,
  serverError,
  form,
  onSubmit,
}: SignupFormProps) {
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-3 mt-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <input
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <input
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 서버 에러 메시지 */}
          {serverError && (
            <div className="text-red-500 text-sm text-center">
              {serverError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-auto"
            disabled={isLoading}
          >
            {isLoading ? "로딩 중 " : "회원가입"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

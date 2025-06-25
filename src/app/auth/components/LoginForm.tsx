import Link from "next/link";

import { UseFormReturn } from "react-hook-form";

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
import { LoginFormData } from "@/validation/auth-validation";

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (data: LoginFormData) => Promise<void>;
  serverError: string | null;
  form: UseFormReturn<LoginFormData>;
}

export function LoginForm({
  isLoading,
  onSubmit,
  serverError,
  form,
}: LoginFormProps) {
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
          {/* 이메일 입력 */}
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

          {/* 비밀번호 입력 */}
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

          {/* 하단 링크들 */}
          <div className="flex flex-row items-center justify-between">
            <Link
              href="/auth/signup"
              className="text-xs font-bold text-primary"
            >
              회원가입
            </Link>
            <Link href="/auth/verify-email" className="text-xs text-[#94A3B8]">
              비밀번호 재설정
            </Link>
          </div>

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-13"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </Form>
    </>
  );
}

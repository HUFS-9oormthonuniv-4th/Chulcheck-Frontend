import { UseFormReturn } from "react-hook-form";

import { ResetPasswordFormData } from "@/app/auth/_lib";
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

interface ResetPasswordFormProps {
  form: UseFormReturn<ResetPasswordFormData>;
  isLoading: boolean;
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
}

export default function ResetPasswordForm({
  form,
  isLoading,
  onSubmit,
}: ResetPasswordFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col justify-between min-h-[500px] h-[70vh] gap-0"
        style={{ minHeight: 500 }}
      >
        <div className="flex flex-col gap-4">
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
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-auto"
          disabled={isLoading}
        >
          {isLoading ? "처리 중..." : "완료"}
        </Button>
      </form>
    </Form>
  );
}

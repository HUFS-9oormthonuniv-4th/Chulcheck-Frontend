import React from "react";

import { UpdateUserInfoFormData } from "@/app/(main)/profile/_lib";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import type { UseFormReturn } from "react-hook-form";

interface BasicInfoFormProps {
  form: UseFormReturn<UpdateUserInfoFormData>;
  isLoading: boolean;
  serverError: string | null;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

// 스켈레톤 컴포넌트
function EditProfileFormSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6">
      <TitleAndDescription
        title="내 프로필"
        description="나의 정보를 여기서 확인하고 수정 가능해요."
      />

      <div className="flex flex-col gap-4">
        {/* 이메일 필드 스켈레톤 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-[52px] w-full" />
          <Skeleton className="h-3 w-60" />
        </div>

        {/* 이름 필드 스켈레톤 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-[52px] w-full" />
        </div>

        {/* 학교 필드 스켈레톤 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-[52px] w-full" />
        </div>

        {/* 학과 필드 스켈레톤 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-[52px] w-full" />
        </div>

        {/* 학번 필드 스켈레톤 */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-[52px] w-full" />
        </div>

        {/* 버튼 스켈레톤 */}
        <div className="mt-10">
          <Skeleton className="h-[60px] w-full" />
        </div>
      </div>
    </div>
  );
}

export function EditProfileForm({
  form,
  isLoading,
  serverError,
  onSubmit,
}: BasicInfoFormProps) {
  // 로딩 중일 때 스켈레톤 표시
  if (isLoading) {
    return <EditProfileFormSkeleton />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <TitleAndDescription
        title="내 프로필"
        description="나의 정보를 여기서 확인하고 수정 가능해요."
      />

      {serverError && <ErrorAlert message={serverError} />}

      <Form {...form}>
        <form
          onSubmit={(e) => {
            void onSubmit(e);
          }}
          className="flex flex-col gap-4"
        >
          {" "}
          {/* 이메일(닉네임) *변경불가 */}
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#334155]">
                  이메일
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="이메일을 입력 해주세요"
                    className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                    aria-invalid={!!form.formState.errors.nickname}
                    disabled
                    readOnly
                    {...field}
                  />
                </FormControl>
                <FormDescription className="w-60 justify-start text-[#64748B] text-xs font-normal leading-tight">
                  이메일은 변경할 수 없습니다.
                </FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
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
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#334155]">
                  학과
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="본인의 학과를 입력 해주세요"
                    className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                    aria-invalid={!!form.formState.errors.major}
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
            name="studentNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#334155]">
                  학번
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="학번을 입력 해주세요"
                    className="w-full h-[52px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8] text-base"
                    aria-invalid={!!form.formState.errors.studentNum}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          {/* 변경사항 저장 버튼 */}
          <div className="mt-10">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-white text-base font-semibold py-4 rounded-lg h-auto"
              disabled={isLoading}
            >
              {isLoading ? "저장 중..." : "변경사항 저장"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

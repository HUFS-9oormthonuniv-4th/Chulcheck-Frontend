import { UseFormReturn } from "react-hook-form";

import FolderPlusIcon from "@/assets/icons/folder-plus.svg";
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
import { Textarea } from "@/components/ui/textarea";

interface CreateClubFormValues {
  name: string;
  leaderTitle: string;
  memberTitle: string;
  description: string;
  ownerId: string;
}

interface Props {
  form: UseFormReturn<CreateClubFormValues>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

export function CreateClubForm({ form, onSubmit, isSubmitting }: Props) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-5">
        {/* 동아리 이름 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#0F172A]">
                동아리 이름
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="동아리 이름을 입력해주세요"
                  className="h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* 대표 명칭 */}
        <FormField
          control={form.control}
          name="leaderTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#0F172A]">
                대표 명칭
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="동아리대표 명칭을 입력해주세요"
                  className="h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* 멤버 명칭 */}
        <FormField
          control={form.control}
          name="memberTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#0F172A]">
                멤버 명칭
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="동아리멤버 명칭을 입력해주세요"
                  className="h-[50px] border border-[#CBD5E1] rounded-md px-3 placeholder:text-[#94A3B8]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* 소개 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#0F172A]">
                소개
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="동아리에 대한 간단한 설명을 입력하세요"
                  className="h-[150px] px-3 py-2 border border-[#CBD5E1] rounded-md placeholder:text-[#94A3B8]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* 버튼 그룹 */}
        <div className="flex flex-col gap-[7px] mt-[32px]">
          <Button
            type="submit"
            className="w-full h-10 py-[7px] flex justify-center items-center gap-[10px] rounded-lg border border-[#3282F0] bg-[#3282F0]"
            disabled={isSubmitting}
          >
            <FolderPlusIcon width={16} height={16} />
            <span className="text-white text-base font-bold leading-none font-pretendard">
              동아리 생성하기
            </span>
          </Button>

          <Button
            type="button"
            className="w-full h-10 px-[106px] py-[7px] flex justify-center items-center rounded-lg border-2 border-[#E2E8F0] bg-[#F1F5F9]"
          >
            <span className="text-[#64748B] text-base font-bold leading-none font-pretendard selection:bg-[#64748B] selection:text-white">
              취소
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

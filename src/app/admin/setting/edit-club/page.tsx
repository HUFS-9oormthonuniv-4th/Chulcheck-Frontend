"use client";

import { useRouter } from "next/navigation";

import { FolderPlus } from "lucide-react";

import Header from "@/components/ui/Header";

import { FormButton } from "../../components/Button";
import { FormField } from "../../components/setting/FormField";

export default function EditClubPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-10 max-w-md mx-auto">
      <Header variant="back" />

      <h2 className="text-xl font-bold text-[#0F172A] mb-1">
        동아리 정보 수정
      </h2>
      <p className="text-sm text-[#666666] mb-6">
        구름톤 유니브 한국외대의 정보를 입력하세요
      </p>

      <form className="space-y-5 pt-6">
        <FormField
          label="동아리 이름"
          placeholder="동아리 이름을 입력해주세요"
        />
        <FormField
          label="대표 명칭"
          placeholder="동아리대표 명칭을 입력해주세요"
        />
        <FormField
          label="멤버 명칭"
          placeholder="동아리멤버 명칭을 입력해주세요"
        />

        <div>
          <label className="block text-sm font-semibold text-[#2C3344] mb-1">
            동아리 설명
          </label>
          <textarea
            rows={5}
            placeholder="동아리에 대한 간단한 설명을 입력하세요"
            className="w-full px-4 py-3 rounded-md border border-[#CBD5E1] text-sm placeholder:text-[#94A3B8] bg-white"
          />
        </div>

        <div className="space-y-2 mt-6">
          <FormButton
            variant="primary"
            icon={<FolderPlus className="w-5 h-5" />}
          >
            변경사항 저장
          </FormButton>
          <FormButton
            variant="secondary"
            onClick={() => router.push("/admin/setting")}
          >
            취소
          </FormButton>
        </div>
      </form>
    </div>
  );
}

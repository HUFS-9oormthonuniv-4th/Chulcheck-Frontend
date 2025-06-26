"use client";

import { useRouter } from "next/navigation";

import { FolderMinus } from "lucide-react";

import Header from "@/components/ui/Header";

import { FormButton } from "../../components/Button";

export default function EditClubPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen pb-10 max-w-md mx-auto">
      <Header variant="back" />

      <h2 className="text-xl font-bold text-[#0F172A] mb-1">동아리 삭제</h2>
      <p className="text-sm text-[#666666] mb-6">
        동아리를 삭제하면 모든 멤버, 출석 세션, 출석 기록 등이 함께 삭제되며,
        복구할 수 없습니다. <br />
        삭제를 확인하려면 동아리 이름 [구름톤 유니브한국외대]를 입력하세요.
      </p>

      <div className="py-8">
        <label className="block text-sm font-semibold text-[#2C3344] mb-1">
          동아리 이름
        </label>
        <input
          type="text"
          placeholder="동아리 이름을 입력해주세요"
          className="w-full px-4 py-3 rounded-md border border-[#CBD5E1] text-sm placeholder:text-[#94A3B8] bg-white"
        />
      </div>

      <div className="space-y-2 mt-6">
        <FormButton
          variant="danger"
          icon={<FolderMinus className="w-5 h-5 mr-2" />}
        >
          동아리 삭제하기
        </FormButton>
        <FormButton
          variant="secondary"
          onClick={() => router.push("/admin/setting")}
        >
          취소
        </FormButton>
      </div>
    </div>
  );
}

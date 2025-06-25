"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/ui/Header";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F9FAFB]  max-w-md mx-auto">
      <Header variant="back" />
      <h2 className="text-xl font-bold text-[#0F172A] mb-1">설정</h2>
      <p className="text-sm text-[#666666] mb-6">구름톤 유니브 한국외대</p>

      <div className="space-y-1">
        <button
          onClick={() => router.push("/admin/setting/edit-club")}
          className="w-full pl-2 text-left text-[#64748B] text-base py-2.5 border-b border-[#c0c6ce]"
        >
          동아리 정보 수정
        </button>
        <button
          onClick={() => router.push("/admin/setting/delete-club")}
          className="w-full pl-2 text-left text-[#64748B] text-base py-2.5 border-b border-[#c0c6ce]"
        >
          동아리 삭제
        </button>
      </div>
    </div>
  );
}

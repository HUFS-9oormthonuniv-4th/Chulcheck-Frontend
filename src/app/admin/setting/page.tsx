"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/ui/Header";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen   max-w-md mx-auto">
      <Header variant="back" />
      <header className="flex flex-col gap-2 py-2 bg-white pb-4">
        <h1 className="text-xl font-bold text-gray-900">설정</h1>
        <p className="text-sm text-gray-700">구름톤 유니브 한국외대</p>
      </header>
      <div className="space-y-1">
        <button
          onClick={() => router.push("/admin/setting/approval")}
          className="w-full pl-2 text-left text-[#64748B] text-base py-2.5 border-b border-[#c0c6ce]"
        >
          대기 중인 가입 요청
        </button>
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

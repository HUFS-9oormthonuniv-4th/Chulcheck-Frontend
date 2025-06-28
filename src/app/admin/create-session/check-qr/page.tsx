"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/ui/Header";

export default function CheckQrPage() {
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto min-h-screen pb-10 ]">
      <Header variant="back" />
      <header className="flex flex-col gap-2 py-2 bg-white pb-8">
        <h1 className="text-xl font-bold text-gray-900">
          구름톤 유니브 - 출석받기
        </h1>
        <p className="text-sm text-gray-700">주변 스크린 밝기를 줄여주세요</p>
      </header>
      <div className="bg-[#F1F5F9] p-5 rounded-xl shadow-sm ">
        <h2 className="text-[18px] font-bold text-[#1E293B] mb-1">
          2023-10-23 세션
        </h2>
        <p className="text-sm text-[#64748B] mb-4">
          QR 코드를 통해 출석하거나 PIN 번호를 통해 출석해요
        </p>

        <div className="flex justify-center">
          <div className="w-[200px] h-[200px] mb-4 flex items-center justify-center rounded-2xl border-2 border-dashed border-[#3B82F6] bg-[#F8FAFC]">
            {/* QR 코드 */}
          </div>
        </div>

        <p className="text-center text-[#1E293B] text-sm font-medium mb-6">
          PIN 0000-0000
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/create-session/info")}
            className="w-full bg-[#E2E8F0] text-white font-semibold text-sm py-3 rounded-lg"
            disabled
          >
            이전
          </button>
          <button
            onClick={() =>
              router.push("/admin/create-session/check-attendance")
            }
            className="w-full bg-[#3B82F6] text-white font-semibold text-sm py-3 rounded-lg"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

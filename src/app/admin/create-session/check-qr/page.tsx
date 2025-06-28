"use client";

import { useRouter } from "next/navigation";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";

export default function CheckQrPage() {
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto min-h-screen pb-10 ]">
      <Header variant="back" />
      <TitleAndDescription
        title=" 구름톤 유니브 - 출석받기"
        description={<> 주변 스크린 밝기를 줄여주세요</>}
      />
      <div className="bg-[#F1F5F9] p-5 rounded-xl shadow-sm ">
        <h2 className="text-[18px] font-bold text-[#1E293B] mb-1">
          2025-06-28 세션
        </h2>
        <p className="text-sm text-[#64748B] mb-4">
          QR 코드를 통해 출석하거나 PIN 번호를 통해 출석해요
        </p>

        <div className="flex justify-center">
          <div className="w-[200px] h-[200px] mb-4 flex items-center justify-center rounded-2xl border-2 border-dashed border-[#3B82F6] bg-[#F8FAFC] overflow-hidden">
            <img
              src="/qr.jpg"
              alt="QR 코드"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>

        <p className="text-center text-[#1E293B] text-sm font-medium mb-6">
          PIN 6354-4354
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

import React from "react";

import { FaCircleArrowRight } from "react-icons/fa6";
import { LuQrCode } from "react-icons/lu";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import { Button } from "@/components/ui/button";

interface QrCardProps {
  pin: string;
  onClick?: () => void;
}

export default function QrCard({ pin, onClick }: QrCardProps) {
  return (
    <div>
      <TitleAndDescription
        title="출석체크"
        description="QR코드를 스캔하거나 PIN 번호를 입력해서 출석해요"
      />
      <div className="bg-[#F6F8FA] rounded-2xl pt-8 pb-8 flex flex-col items-center shadow-sm w-[calc(100%-30px)] h-auto mx-[10px]">
        <div className="flex flex-col items-center justify-center size-60 bg-white rounded-2xl border border-dashed border-[#3282F0] mb-4">
          <LuQrCode size={60} />
        </div>
        <div className="text-lg font-medium text-[#334155] mb-6">PIN {pin}</div>
        <Button
          className="w-[calc(100%-80px)] text-lg h-12 font-semibold rounded-xl bg-[#0F172A] hover:bg-[#0F172A]/90"
          onClick={onClick}
        >
          출첵하러가기
          <FaCircleArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
}

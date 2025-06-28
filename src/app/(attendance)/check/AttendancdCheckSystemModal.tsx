import React, { useState } from "react";

import { BsArrowsAngleContract } from "react-icons/bs";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

import AttendancePinInput from "./AttendancePinInput";

interface AttendanceCheckSystemModalProps {
  onSelect: (type: "qr" | "pin") => void;
  onClose: () => void;
}

export default function AttendanceCheckSystemModal({
  onSelect,
  onClose,
}: AttendanceCheckSystemModalProps) {
  const [selectedType, setSelectedType] = useState<null | "qr" | "pin">(null);

  if (selectedType === "pin") {
    return (
      <AttendancePinInput
        onClose={() => setSelectedType(null)}
        onSubmit={(pin) => {
          // 출석 처리 로직
          // 필요시 onSelect("pin") 호출 등
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#8B8F9C]/80">
      <div className="bg-[#F6F8FA] rounded-2xl p-8 w-full max-w-sm mx-4 shadow-xl relative flex flex-col items-center">
        {/* 닫기 버튼 */}
        <button
          className="absolute left-6 top-6 text-[#475569] hover:text-[#334155] focus:outline-none"
          onClick={onClose}
          aria-label="닫기"
        >
          <BsArrowsAngleContract size={24} />
        </button>

        {/* 안내 텍스트 */}
        <div className="mt-6 mb-8 text-2xl font-extrabold text-[#1E293B] text-center">
          출석 방식을 선택해주세요
        </div>

        {/* 선택 카드 영역 - 세로 배치 */}
        <div className="flex flex-col gap-4 w-full">
          {/* QR코드 카드 */}
          <button
            className="w-full bg-[#3282F0] hover:bg-[#2563EB] transition-colors rounded-2xl p-6 flex flex-col items-start justify-between min-h-[120px] shadow-md relative"
            onClick={() => onSelect("qr")}
          >
            <span className="absolute right-6 top-6 bg-white rounded-full p-2 shadow text-[#3282F0]">
              <IoArrowForwardCircleOutline size={24} />
            </span>
            <div className="flex flex-col items-start mt-2">
              <span className="text-xl font-extrabold text-white">
                QR코드로
              </span>
              <span className="text-lg font-light text-white">출석하기</span>
            </div>
          </button>

          {/* PIN코드 카드 */}
          <button
            className="w-full bg-[#E6F0FE] hover:bg-[#D6E6FC] transition-colors rounded-2xl p-6 flex flex-col items-start justify-between min-h-[120px] shadow-md relative"
            onClick={() => setSelectedType("pin")}
          >
            <span className="absolute right-6 top-6 bg-white rounded-full p-2 shadow text-[#B6D2F7]">
              <IoArrowForwardCircleOutline size={24} />
            </span>
            <div className="flex flex-col items-start mt-2">
              <span className="text-xl font-extrabold text-[#3282F0]">
                PIN 코드로
              </span>
              <span className="text-lg font-light text-[#3282F0]">
                출석하기
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

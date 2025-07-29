"use client";

import { AttendanceIcon, AbsenceIcon } from "@/assets/icons";
import BottomSheetWrapper from "../BottomSheetWrapper";

interface ApprovalBottomSheetProps {
  selected: { name: string; requestId: number };
  onClose: () => void;
  onApprove: (requestId: number) => void;
  onReject: (requestId: number) => void;
}

export default function ApprovalBottomSheet({
  selected,
  onClose,
  onApprove,
  onReject,
}: ApprovalBottomSheetProps) {
  const handleApprove = () => {
    onApprove(selected.requestId);
  };

  const handleReject = () => {
    onReject(selected.requestId);
  };

  return (
    <BottomSheetWrapper onClose={onClose}>
      <h3 className="text-lg font-bold text-gray-900 mb-1 mt-6">
        가입 요청 처리
      </h3>
      <p className="text-sm text-[#666666] mb-4 font-semibold">
        {selected.name}님의 가입 요청을 처리하세요
      </p>

      <div className="space-y-1 divide-y divide-gray-200 mb-4">
        <button
          onClick={handleApprove}
          className="w-full flex justify-between items-center text-md font-medium px-3 py-4 text-start"
        >
          승인
          <AttendanceIcon />
        </button>
        <button
          onClick={handleReject}
          className="w-full flex justify-between items-center text-md font-medium px-3 py-2 text-start"
        >
          거절
          <AbsenceIcon />
        </button>
      </div>
    </BottomSheetWrapper>
  );
}

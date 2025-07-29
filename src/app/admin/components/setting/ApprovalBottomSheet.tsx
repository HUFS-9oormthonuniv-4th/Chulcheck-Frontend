"use client";

import { useState } from "react";

import { AttendanceIcon, AbsenceIcon } from "@/assets/icons";

import BottomSheetWrapper from "../BottomSheetWrapper";

interface ApprovalBottomSheetProps {
  selected: { name: string; requestId: number };
  onClose: () => void;
  onApprove: (requestId: number) => Promise<void>;
  onReject: (requestId: number, reason: string) => Promise<void>;
}

export default function ApprovalBottomSheet({
  selected,
  onClose,
  onApprove,
  onReject,
}: ApprovalBottomSheetProps) {
  const [rejectionReason, _] = useState("");

  const handleApprove = async () => {
    try {
      await onApprove(selected.requestId);
      onClose();
    } catch {
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("거절 사유를 입력해주세요.");
      return;
    }
    try {
      await onReject(selected.requestId, rejectionReason);
      onClose();
    } catch {
      alert("거절 처리 중 오류가 발생했습니다.");
    }
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
          onClick={() => void handleApprove()}
          className="w-full flex justify-between items-center text-md font-medium px-3 py-4 text-start"
        >
          승인
          <AttendanceIcon />
        </button>
        <button
          onClick={() => void handleReject()}
          className="w-full flex justify-between items-center text-md font-medium px-3 py-2 text-start"
        >
          거절
          <AbsenceIcon />
        </button>
      </div>
    </BottomSheetWrapper>
  );
}

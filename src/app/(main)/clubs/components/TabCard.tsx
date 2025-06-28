import React from "react";

import clsx from "clsx";

import MemberIcon from "@/assets/icons/member-icon.svg";

interface TabCardProps {
  title: string;
  clubId: number;
  description: string;
  role?: "관리자" | "멤버";
  memberCount: number;
  showDetailButton?: boolean;
  buttonLabel?: string;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
}

export function TabCard({
  title,
  clubId,
  description,
  role,
  memberCount,
  showDetailButton = true,
  buttonLabel = "상세보기",
  buttonDisabled = false,
  onButtonClick,
}: TabCardProps) {
  return (
    <div className="flex flex-col items-start gap-5 rounded-md border border-[#E2E8F0] bg-white p-[25px]">
      {/* 상단 */}
      <div className="flex h-[30px] w-full items-center justify-between">
        <h3 className="text-lg font-bold leading-[18px] text-[#0F172A]">
          {title}
        </h3>
        {role && (
          <span
            className={clsx(
              "flex justify-center items-center gap-[10px] rounded-full px-[10px] py-[5px] text-sm font-bold leading-[20px] font-pretendard",
              role === "관리자"
                ? "bg-[#3282F0] text-[#D6E6FC]"
                : "bg-[#D6E6FC] text-[#3282F0]",
            )}
          >
            {role}
          </span>
        )}
      </div>

      {/* 설명 */}
      <p className="self-stretch text-sm font-medium leading-5 text-slate-500">
        {description}
      </p>

      {/* 하단 */}
      <div className="flex items-center justify-between w-full">
        {showDetailButton ? (
          <>
            <button
              onClick={onButtonClick}
              disabled={buttonDisabled}
              className={clsx(
                "rounded-md px-4 py-2 text-sm font-semibold font-pretendard",
                buttonDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#3B82F0] text-white hover:bg-[#2563EB]",
              )}
            >
              {buttonLabel}
            </button>
            <div className="flex items-center gap-1 text-sm text-[#475569] font-pretendard">
              <MemberIcon width={20} height={20} />
              <span>멤버 {memberCount}명</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 text-sm text-[#475569] font-pretendard">
              <MemberIcon width={20} height={20} />
              <span>멤버 {memberCount}명</span>
            </div>
            <div className="w-[75px]" />
          </>
        )}
      </div>
    </div>
  );
}

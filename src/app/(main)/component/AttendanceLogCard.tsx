import React from "react";

import Image from "next/image";

// 타입 정의를 더 명확하게
export type AttendanceStatus = "success" | "fail" | "late";

export default function AttendanceLogCard({
  club,
  status,
  date,
  time,
}: {
  club: string;
  status: AttendanceStatus;
  date: string;
  time: string;
}) {
  // 상태별 이미지 및 라벨 정보
  const getStatusInfo = (status: AttendanceStatus) => {
    switch (status) {
      case "success":
        return {
          imageSrc: "/assets/badge/states/success-badge.svg",
          label: "출석",
        };
      case "fail":
        return {
          imageSrc: "/assets/badge/states/fail-badge.svg",
          label: "결석",
        };
      case "late":
        return {
          imageSrc: "/assets/badge/states/late-badge.svg",
          label: "지각",
        };
      default:
        // 기본값 설정 (예: 알 수 없는 상태)
        return {
          imageSrc: "", // 혹은 기본 이미지 경로
          label: "알 수 없음",
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="flex flex-col items-center gap-2 w-1/3 p-2">
      <div className="text-sm font-semibold text-center text-gray-800">
        {club}
      </div>
      <div title={statusInfo.label}>
        {statusInfo.imageSrc && (
          <Image
            src={statusInfo.imageSrc}
            alt={statusInfo.label}
            width={40} // 이미지 크기 조절 (tailwind class w-12)
            height={40} // 이미지 크기 조절 (tailwind class h-12)
          />
        )}
      </div>
      <div className="text-xs text-gray-500">{date}</div>
      <div className="text-xs text-gray-500 text-center">출석시간:{time}</div>
    </div>
  );
}

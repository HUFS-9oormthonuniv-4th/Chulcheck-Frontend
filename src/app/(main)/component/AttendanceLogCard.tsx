import React from "react";

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
  // 상태별 색상 및 아이콘 - 더 안전한 방식으로 처리
  const getStatusInfo = (status: AttendanceStatus) => {
    switch (status) {
      case "success":
        return { color: "text-green-500", icon: "✔️", label: "출석" };
      case "fail":
        return { color: "text-red-500", icon: "❌", label: "결석" };
      case "late":
        return { color: "text-yellow-500", icon: "⏰", label: "지각" };
      default:
        return { color: "text-gray-500", icon: "❓", label: "알 수 없음" };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="flex flex-col items-center gap-2 w-1/3 p-2">
      <div className="text-sm font-semibold text-center text-gray-800">
        {club}
      </div>
      <div className={`text-3xl ${statusInfo.color}`} title={statusInfo.label}>
        {statusInfo.icon}
      </div>
      <div className="text-xs text-gray-500">{date}</div>
      <div className="text-xs text-gray-500 text-center">출석시간:{time}</div>
    </div>
  );
}

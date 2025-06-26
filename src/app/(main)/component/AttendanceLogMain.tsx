import React from "react";

import { TitleAndDescription } from "@/components/TitleAndDescription";

import AttendanceLogCard, { AttendanceStatus } from "./AttendanceLogCard";

// 타입 정의를 더 명확하게
interface AttendanceLog {
  id: number; // 고유 식별자 추가
  club: string;
  status: AttendanceStatus;
  date: string;
  time: string;
}

export default function AttendanceLogMain() {
  // 임시 데이터 - id 추가 및 타입 안전성 확보
  const logs: AttendanceLog[] = [
    {
      id: 1,
      club: "구름톤 유니브",
      status: "success",
      date: "12월 30일",
      time: "14:00",
    },
    {
      id: 2,
      club: "PNP",
      status: "fail",
      date: "12월 30일",
      time: "14:00",
    },
    {
      id: 3,
      club: "NCUBE",
      status: "late",
      date: "12월 30일",
      time: "14:00",
    },
  ];

  return (
    <div className="flex flex-col gap-4 items-left w-full max-w-xl mx-auto py-4">
      <TitleAndDescription
        title="최근 출석 기록"
        description="동아리별 최근 출석 현황을 확인하세요"
      />

      {/* 로그가 없을 때의 처리 */}
      {logs.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          아직 출석 기록이 없습니다.
        </div>
      ) : (
        <div className="flex w-full bg-white rounded-xl shadow-lg p-6 gap-4 justify-between min-h-[200px]">
          {logs.map((log) => (
            <AttendanceLogCard
              key={log.id}
              club={log.club}
              status={log.status}
              date={log.date}
              time={log.time}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

import Calendar from "@/app/admin/components/attendance/Calendar";
import CalendarHeader from "@/app/admin/components/attendance/CalendarHeader";
import { AttendanceIcon, LateIcon, AbsenceIcon } from "@/assets/icons/index";
import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { memberAttendanceRecords } from "@/mocks/admin"; // ✅ 여기서 import
import { MemberAttendanceRecord } from "@/mocks/admin";

export default function Page() {
  const records: MemberAttendanceRecord[] = memberAttendanceRecords;
  const record = records[0];

  const [currentDate, setCurrentDate] = useState(new Date(2025, 4));
  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };
  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const attendanceDates = [
    "2025-05-01",
    "2025-05-02",
    "2025-05-05",
    "2025-05-07",
    "2025-05-08",
    "2025-05-09",
    "2025-05-12",
    "2025-05-13",
    "2025-05-15",
    "2025-05-16",
    "2025-05-19",
    "2025-05-20",
    "2025-05-23",
    "2025-05-29",
    "2025-05-30",
  ];

  return (
    <div className="flex flex-col w-full max-w-[375px] mx-auto">
      <Header variant="back" />
      <TitleAndDescription
        title="구름톤 유니브 - 출석현황"
        description="카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 전국 대학 IT 연합 동아리입니다."
      />

      <div className="mt-5">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <Calendar year={year} month={month} attendanceDates={attendanceDates} />
      </div>

      {record && (
        <div className="bg-white mt-6 p-4 rounded-xl text-sm flex flex-col gap-1 cursor-pointer">
          <p className="font-bold text-black">{record.date}</p>
          <div className="flex justify-between items-center">
            <p className="text-[#475569]">출석 시간: {record.time}</p>
            <div className="flex items-center gap-2 font-md text-[#475569]">
              {record.status === "출석" && (
                <>
                  <span>출석</span>
                  <AttendanceIcon />
                </>
              )}
              {record.status === "결석" && (
                <>
                  <span>결석</span>
                  <AbsenceIcon />
                </>
              )}
              {record.status === "지각" && (
                <>
                  <span>지각</span>
                  <LateIcon />
                </>
              )}
            </div>
          </div>
          <p className="text-[#94A3B8] text-xs">{record.method}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";

import Header from "@/components/ui/Header";
import { attendanceDates, mockAttendanceRecordsList } from "@/mocks/admin";

import AttendanceInfo from "../../components/attendance/AttendanceInfo";
import Calendar from "../../components/attendance/Calendar";
import CalendarHeader from "../../components/attendance/CalendarHeader";
import AttendanceBottomSheet from "../../components/AttendanceBottomSheet";

export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date("2025-05-11"));
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    status: string;
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  return (
    <div className="max-w-md mx-auto pb-6  min-h-screen">
      <Header variant="back" />
      <h1 className="font-bold text-xl text-[#0F172A] mb-1">
        구름톤 유니브 - 출석현황
      </h1>
      <p className="text-sm text-[#666666] mb-6">
        카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 <br />
        전국 대학 IT 연합 동아리입니다.
      </p>

      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={() =>
          setCurrentDate(new Date(currentDate.setMonth(month - 1)))
        }
        onNextMonth={() =>
          setCurrentDate(new Date(currentDate.setMonth(month + 1)))
        }
      />

      <Calendar year={year} month={month} attendanceDates={attendanceDates} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[17px] font-bold text-[#1E293B]">
          {date} {time}
        </h2>
        <span className="text-sm text-[#666666] font-semibold">
          출석률 <span className="text-[#3282F0] ">75%</span>
        </span>
      </div>

      <AttendanceInfo
        records={mockAttendanceRecordsList}
        onClick={(r) => setSelectedStudent(r)}
      />

      {selectedStudent && (
        <AttendanceBottomSheet
          selected={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

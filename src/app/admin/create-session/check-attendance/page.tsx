"use client";

import { useState } from "react";

import Header from "@/components/ui/Header";
import { dummyMembers } from "@/mocks/admin/dummy-members";

import { AttendanceGraph } from "../../components/admin-main/AttendanceGraph";
import AttendanceInfo from "../../components/attendance/AttendanceInfo";
import AttendanceBottomSheet from "../../components/AttendanceBottomSheet";

export default function MemberDetailPage() {
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    status: string;
  } | null>(null);
  const attendanceRecords = dummyMembers.slice(1, 5).map((member, index) => ({
    id: Number(member.id), // string → number 변환
    name: member.name,
    dept: member.department,
    status: "출석",
  }));

  return (
    <div className="min-h-screen  mb-16  max-w-md mx-auto">
      <Header variant="back" />
      <section className="mb-6">
        <header className="flex flex-col gap-2 py-2 bg-white ">
          <h1 className="text-xl font-bold text-gray-900">
            구름톤 유니브 - 출석받기
          </h1>
          <p className="text-sm text-gray-700">
            06-28 일자 세션 출석 현황이에요
          </p>
        </header>
        <AttendanceGraph percentage={100} total={3} attended={3} />
      </section>
      <h2 className="text-lg font-bold text-[#1E293B] mb-1">출석 멤버 목록</h2>
      <p className="text-sm text-[#475569] mb-3">
        오늘 구름톤 유니브 한국외대에 출석한 미르미에요
      </p>
      <AttendanceInfo
        records={attendanceRecords}
        onClick={(r) => setSelectedStudent(r)}
      />
    </div>
  );
}

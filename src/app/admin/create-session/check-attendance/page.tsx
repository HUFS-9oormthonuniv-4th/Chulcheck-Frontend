"use client";

import { useState } from "react";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { mockAttendanceRecordsList } from "@/mocks/admin";

import { AttendanceGraph } from "../../components/admin-main/AttendanceGraph";
import AttendanceInfo from "../../components/attendance/AttendanceInfo";
import AttendanceBottomSheet from "../../components/AttendanceBottomSheet";

export default function MemberDetailPage() {
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    status: string;
  } | null>(null);

  return (
    <div className="min-h-screen  mb-16  max-w-md mx-auto">
      <Header variant="back" />
      <section className="mb-6">
        <TitleAndDescription
          title=" 구름톤 유니브 - 출석받기"
          description={<> 05-11 일자 세션 출석 현황이에요</>}
        />
        <AttendanceGraph percentage={75} total={20} attended={15} />
      </section>
      <h2 className="text-lg font-bold text-[#1E293B] mb-1">출석 멤버 목록</h2>
      <p className="text-sm text-[#475569] mb-3">
        오늘 구름톤 유니브 한국외대에 출석한 미르미에요
      </p>
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

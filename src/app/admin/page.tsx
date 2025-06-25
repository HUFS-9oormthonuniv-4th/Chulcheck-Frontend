"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Settings, Calendar } from "lucide-react";

import { AttendanceRecord, Member } from "@/types/admin";

import { AttendanceGraph } from "./components/admin-main/AttendanceGraph";
import { AttendanceList } from "./components/admin-main/AttendanceList";
import { CopyLink } from "./components/admin-main/CopyLink";
import { InfoGrid } from "./components/admin-main/InfoGrid";
import { ManagementTabs } from "./components/admin-main/ManageTabs";
import { MemberList } from "./components/admin-main/MemberList";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "memberManagement" | "attendanceManagement"
  >("memberManagement");
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "이예림",
      department: "컴퓨터공학부",
      joinDate: "2025. 5. 1.",
      role: "대표",
    },
    {
      id: 2,
      name: "이예림2",
      department: "컴퓨터공학부",
      joinDate: "2025. 5. 1.",
      role: "운영진",
    },
    {
      id: 3,
      name: "이예림3",
      department: "컴퓨터공학부",
      joinDate: "2025. 5. 1.",
      role: "미르미",
    },
  ]);

  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: 1,
      date: "2023-10-23",
      time: "14:00",
      attendanceRate: 75,
      method: "QR코드 스캔",
    },
    {
      id: 2,
      date: "2023-10-24",
      time: "10:30",
      attendanceRate: 80,
      method: "QR코드 스캔",
    },
  ]);

  const handleRoleChange = (memberId: number, newRole: Member["role"]) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-[#F9FAFB] text-gray-800  max-w-[480px] mx-auto">
      <header className="flex flex-col gap-2 py-2 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">구름톤 유니브</h1>
          <button onClick={() => router.push("/admin/setting")}>
            <Settings className="h-6 w-6 text-black" />
          </button>
        </div>
        <p className="text-sm text-gray-700">
          카카오와 구름, 그리고 벚꽃과 단풍이 함께하는
          <br />
          전국 대학 IT 연합 동아리입니다.
        </p>
      </header>

      <main className="container">
        <div className="mb-6">
          <button className="w-full h-[83px] bg-[#3282F0] text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ">
            <Calendar className="h-5 w-5" />
            <span className="text-[20px]">출석 세션 생성</span>
          </button>
        </div>
        <AttendanceGraph percentage={75} total={20} attended={15} />
        <InfoGrid />
        <CopyLink />

        <ManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "memberManagement" && (
          <>
            <MemberList members={members} onRoleChange={handleRoleChange} />
            <div className="flex w-full mt-6 mb-10">
              <button className="w-full bg-black text-white py-2 px-8 rounded-lg font-semibold">
                변경사항 저장하기
              </button>
            </div>
          </>
        )}

        {activeTab === "attendanceManagement" && (
          <AttendanceList records={attendanceRecords} />
        )}
      </main>
    </div>
  );
}

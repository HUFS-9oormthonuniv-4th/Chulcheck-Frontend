"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Settings, Calendar } from "lucide-react";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { AttendanceRecord, Member } from "@/lib/types/admin";
import { mockAttendanceRecords } from "@/mocks/admin/admin";
import { dummyMembers } from "@/mocks/admin/dummy-members";

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
  const [attendanceRecords] = useState<AttendanceRecord[]>(
    mockAttendanceRecords,
  );
  const [members, setMembers] = useState<Member[]>(dummyMembers);

  const handleRoleChange = (memberId: number, newRole: Member["role"]) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member,
      ),
    );
  };

  return (
    <div className="min-h-screen text-gray-800  max-w-[375px] mx-auto">
      <Header variant="main" />
      <TitleAndDescription
        title="구름톤 유니브"
        description={
          <>
            카카오와 구름, 그리고 벚꽃과 단풍이 함께하는
            <br />
            전국 대학 IT 연합 동아리입니다.
          </>
        }
        rightElement={
          <button onClick={() => router.push("/admin/setting")}>
            <Settings className="h-6 w-6 text-black" />
          </button>
        }
      />

      <main className="container">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin/create-session/info")}
            className="w-full h-[83px] bg-[#3282F0] text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 "
          >
            <Calendar className="h-5 w-5" />
            <span className="text-[20px]">출석 세션 생성</span>
          </button>
        </div>
        <AttendanceGraph percentage={100} total={5} attended={5} />
        <InfoGrid />
        <CopyLink />

        <ManagementTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          labels={{ first: "회원 관리", second: "출석 관리" }}
          keys={{ first: "memberManagement", second: "attendanceManagement" }}
        />
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

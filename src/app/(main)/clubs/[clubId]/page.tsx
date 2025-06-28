"use client";

import { useState } from "react";

import { AttendanceGraph } from "@/app/admin/components/admin-main/AttendanceGraph";
import { ManagementTabs } from "@/app/admin/components/admin-main/ManageTabs";
import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { Member } from "@/lib/types/admin";
import {
  memberAttendanceRecords,
  mockAttendanceRecords,
  mockMembers,
} from "@/mocks/admin/admin";

import { AttendanceCard } from "../components/detail/AttendanceCard";
import ManageMyAttendance from "../components/detail/ManageMyAttendance";
import MemberList from "../components/detail/MemberList";

type TabKey = "memberManagement" | "attendanceManagement";

export default function ClubDetail() {
  const [activeTab, setActiveTab] = useState<TabKey>("memberManagement");
  const [members, setMembers] = useState<Member[]>(mockMembers);
  return (
    <div>
      <Header variant="main" />
      <main className="flex flex-col w-full max-w-[375px] mx-auto mt-4">
        <TitleAndDescription
          title="구름톤 유니브"
          description="카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 전국 대학 IT 연합 동아리입니다."
        />
        <div className="flex flex-col items-center gap-2 mb-4">
          <AttendanceGraph percentage={75} total={20} attended={15} />
          <span className="text-sm text-[#666666]">
            00번만 더 성실히 출석하면 00뱃지를 얻어요!
          </span>
        </div>
        <div className="mb-[31px]">
          <AttendanceCard count={2} />
        </div>

        <ManagementTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          labels={{ first: "동아리 회원", second: "내 출석관리" }}
          keys={{ first: "memberManagement", second: "attendanceManagement" }}
          showTitle={false}
        />

        {/* 탭에 따라 다른 내용 렌더링 */}
        {activeTab === "memberManagement" ? (
          <div>
            <MemberList members={members} />
          </div>
        ) : (
          <div>
            <ManageMyAttendance records={memberAttendanceRecords} />
          </div>
        )}
      </main>
    </div>
  );
}

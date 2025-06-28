"use client";
import { useState } from "react";

import { Wrench, Users, CheckCircle } from "lucide-react";

import ManageMyAttendance from "@/app/(main)/clubs/components/detail/ManageMyAttendance";
import { AttendanceGraph } from "@/app/admin/components/admin-main/AttendanceGraph";
import { InfoBox } from "@/app/admin/components/admin-main/InfoBox";
import { MemberList } from "@/app/admin/components/admin-main/MemberList";
import { AttendanceIcon, LateIcon, AbsenceIcon } from "@/assets/icons/index";
import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { memberAttendanceRecords, mockMembers } from "@/mocks/admin";

import TemporaryManageMyAttendance from "./component/TemporaryManageMyAttendance";
import { TemporaryMemberList } from "./component/TemporaryMemberList";

export default function AttendanceCompleted() {
  const [activeTab, setActiveTab] = useState<"mirimi" | "session">("mirimi");

  return (
    <div className="min-h-screen mb-16 max-w-md mx-auto">
      <Header variant="main" />
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-extrabold text-[#1E293B]">
            출석완료
          </span>
          <CheckCircle className="text-green-500" size={28} />
        </div>
        <div className="text-[#64748B] text-base mb-2">
          출석이 완료되었어요.
        </div>
        <AttendanceGraph percentage={75} total={20} attended={15} />
      </section>

      {/* 멤버 목록 */}
      <section className="mt-8">
        <h2 className="text-xl font-extrabold text-[#1E293B] mb-1">
          출석 관리
        </h2>
        <div className="text-[#64748B] text-base mb-4">
          구름톤 유니브 한국외대 의 출석 현황이에요
        </div>
        {/* 검색창 */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="출석 기록 찾기..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        {/* 탭 */}
        <div className="flex mb-2 bg-gray-100 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-2 text-sm font-semibold ${activeTab === "mirimi" ? "text-gray-900 bg-white shadow" : "text-gray-500"} `}
            style={{ borderRadius: "8px 0 0 8px" }}
            onClick={() => setActiveTab("mirimi")}
          >
            미르미 출석 기록
          </button>
          <button
            className={`flex-1 py-2 text-sm font-semibold ${activeTab === "session" ? "text-gray-900 bg-white shadow" : "text-gray-500"}`}
            onClick={() => setActiveTab("session")}
          >
            출석 세션
          </button>
        </div>
        {/* 탭 컨테이너 */}
        <div className="bg-white rounded-lg border border-gray-200 min-h-[200px] p-4 mt-1">
          {activeTab === "mirimi" ? (
            <TemporaryMemberList
              members={mockMembers}
              onRoleChange={() => {}}
            />
          ) : (
            <TemporaryManageMyAttendance records={memberAttendanceRecords} />
          )}
        </div>
      </section>
    </div>
  );
}

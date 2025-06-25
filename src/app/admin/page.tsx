"use client";

import { useState } from "react";

import {
  Settings,
  Plus,
  Users,
  CalendarDays,
  Key,
  BarChart2,
  RefreshCw,
  Copy,
  User,
} from "lucide-react";

import { Card, CardContent } from "@/app/admin/components/card";

interface Member {
  id: number;
  name: string;
  department: string;
  joinDate: string;
  role: "대표" | "운영진" | "미르미";
}

const AdminPage: React.FC = () => {
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://fclub-log.vercel.app/");
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("링크 복사에 실패했습니다.");
    }
  };

  const handleRoleChange = (memberId: number, newRole: Member["role"]) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-[#F9FAFB] text-gray-800">
      <header className="flex flex-col gap-2 p-4 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">구름톤 유니브</h1>
          <Settings className="h-6 w-6 text-black" />
        </div>
        <p className="text-sm text-gray-700">
          카카오와 구름, 그리고 벚꽃과 단풍이 함께하는
          <br />
          전국 대학 IT 연합 동아리입니다.
        </p>
      </header>

      <main className="container mx-auto  px-4">
        <div className="mb-6">
          <button className="w-full h-[67px] bg-[#3282F0] text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2  transition duration-300">
            <Plus className="h-5 w-5" />
            <span>출석 세션 생성</span>
          </button>
        </div>

        {/* Attendance Summary */}
        <Card className="rounded-3xl">
          <CardContent className="pt-6 text-center">
            <div className="text-sm text-gray-600 mb-4">
              전체 <span className="text-[#3282F0] font-semibold">75%</span>{" "}
              만큼 출석했어요!
            </div>
            <div className="relative w-48 h-48 mx-auto">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#3B82F6"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - 0.75)}`}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-blue-50 p-2 rounded-full mb-2">
                  <User className="w-5 h-5 text-[#3282F0]" />
                </div>
                <div className="text-2xl font-bold">75%</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-4 space-x-4 flex justify-center">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                <span>총 출석 20번</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#3282F0] inline-block" />
                <span>출석 15번</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="space-y-4 mb-6 mt-2.5">
          <div className="grid grid-cols-5 gap-4">
            {/* 멤버 */}
            <Card className="bg-white col-span-2">
              <CardContent className="p-4 text-start">
                <div className="flex items-center justify-between mb-2 space-x-2">
                  <span className="text-xl font-bold text-black">멤버</span>
                  <Users className="h-8 w-8 text-black" />
                </div>
                <div className="text-2xl font-bold text-[#3282F0] mb-1 ">2</div>
                <div className="text-sm text-gray-600">가입한 멤버 수</div>
              </CardContent>
            </Card>

            {/* 출석 세션 */}
            <Card className="bg-white col-span-3">
              <CardContent className="p-4 text-start">
                <div className="flex items-center justify-between mb-2 space-x-2">
                  <span className="text-xl font-bold text-black">
                    출석 세션
                  </span>
                  <CalendarDays className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-[#3282F0] mb-1">2</div>
                <div className="text-sm text-gray-600">생성된 출석 세션 수</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {/* 역할 */}
            <Card className="bg-white col-span-3">
              <CardContent className="p-4 text-start">
                <div className="flex items-center justify-between mb-2 space-x-2">
                  <span className="text-xl font-bold text-black">역할</span>
                  <Key className="h-8 w-8" />
                </div>
                <div className="text-[#3282F0] text-lg font-semibold mb-1">
                  관리자
                </div>
                <div className="text-sm text-gray-600">동아리 내 역할</div>
              </CardContent>
            </Card>

            {/* 통계 */}
            <Card className="bg-white col-span-2">
              <CardContent className="p-4 text-start">
                <div className="flex items-center justify-between mb-2 space-x-2">
                  <span className="text-xl font-bold text-black">통계</span>
                  <BarChart2 className="h-8 w-8 " />
                </div>
                <div className="text-[#3282F0] text-lg font-semibold mb-1">
                  Top 3
                </div>
                <div className="text-sm text-gray-600">개근자 및 결석자</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-900">초대 링크</h2>
            <RefreshCw className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            이 링크를 공유하여 새로운 멤버를 초대해요
            <br />
            링크가 초기화하면 가르키는링크를 사용할 수 없어요
          </p>
          <div className="flex rounded-lg overflow-hidden gap-2">
            <input
              type="text"
              readOnly
              value="https://fclub-log.vercel.app/"
              className="flex-grow p-3 rounded-lg text-gray-700  outline-none truncate border border-gray-300 "
            />
            <button
              onClick={() => {
                void handleCopyLink();
              }}
              className="text-black px-4 py-3 border border-gray-300 rounded-lg"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </section>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">관리</h2>
        <div className="mt-4">
          <div className="flex bg-[#F1F5F9]  p-1 w-full text-sm font-medium">
            <button
              onClick={() => setActiveTab("memberManagement")}
              className={`w-1/2 py-2  transition ${
                activeTab === "memberManagement"
                  ? "bg-white text-black font-semibold"
                  : "text-gray-600"
              }`}
            >
              회원 관리
            </button>
            <button
              onClick={() => setActiveTab("attendanceManagement")}
              className={`w-1/2 py-2  transition ${
                activeTab === "attendanceManagement"
                  ? "bg-white text-[#334155] font-semibold"
                  : "text-gray-600"
              }`}
            >
              출석 관리
            </button>
          </div>
        </div>
        {activeTab === "memberManagement" && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 pt-2">
              미르미 목록
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              구르미 유니브 한국외대에 가입한 미르미를 확인하고 관리해요
            </p>

            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200"
                >
                  {/* User Avatar Placeholder */}
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#3282F0] font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">
                      {member.department} • 가입일: {member.joinDate}
                    </p>
                  </div>
                  <div className="relative">
                    <select
                      value={member.role}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleRoleChange(
                          member.id,
                          e.target.value as Member["role"],
                        )
                      }
                      className="appearance-none   rounded-md py-2 pl-1  text-sm focus:outline-none"
                    >
                      <option value="대표">대표</option>
                      <option value="운영진">운영진</option>
                      <option value="미르미">미르미</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "attendanceManagement" && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 pt-2">
              미르미 출석관리
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              구름톤 유니브 한국외대에 미르미 출석을 확인하고 관리해요
            </p>

            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">2023-10-23 14:00</p>
                  <span className="text-xs text-[#3282F0] font-semibold">
                    출석률 75%
                  </span>
                </div>
                <p className="text-xs text-gray-600">출석 시간: 14:05</p>
                <p className="text-xs text-gray-400">QR코드 스캔</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6 mb-10">
          <button className="bg-black text-white py-3 px-8 rounded-lg font-semibold ">
            변경사항 저장하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

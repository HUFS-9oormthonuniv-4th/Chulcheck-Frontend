"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft, Wrench, Users } from "lucide-react";

import { AttendanceIcon, LateIcon, AbsenceIcon } from "@/assets/icons/index";

import { AttendanceGraph } from "../../components/admin-main/AttendanceGraph";
import { InfoBox } from "../../components/admin-main/InfoBox";

interface AttendanceRecord {
  id: number;
  date: string;
  time: string;
  status: "출석" | "지각" | "결석";
  method: "QR코드 스캔" | "PIN코드 스캔";
}

export default function MemberDetailPage() {
  const router = useRouter();

  const attendance: AttendanceRecord[] = [
    {
      id: 1,
      date: "2023-10-23 14:00",
      time: "14:05",
      status: "출석",
      method: "QR코드 스캔",
    },
    {
      id: 2,
      date: "2023-10-23 14:00",
      time: "14:05",
      status: "출석",
      method: "QR코드 스캔",
    },
    {
      id: 3,
      date: "2023-10-23 14:00",
      time: "14:05",
      status: "출석",
      method: "QR코드 스캔",
    },
    {
      id: 4,
      date: "2023-10-23 14:00",
      time: "14:05",
      status: "결석",
      method: "QR코드 스캔",
    },
    {
      id: 5,
      date: "2023-10-23 14:00",
      time: "14:05",
      status: "지각",
      method: "PIN코드 스캔",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-16 pt-6 max-w-md mx-auto">
      <header className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
          <span className="text-lg font-bold text-black">돌아가기</span>
        </button>
      </header>

      <section className="mb-6">
        <h1 className="text-2xl font-bold text-[#222] mb-1">박지민</h1>
        <p className="text-sm text-[#667085]">한국외대 컴퓨터공학부</p>
        <p className="text-sm text-[#667085] mb-4">123456789</p>

        <AttendanceGraph percentage={75} total={20} attended={15} />
      </section>

      <section className="grid grid-cols-2 gap-3 text-sm  mb-6">
        <InfoBox
          title="역할"
          icon={<Wrench className="h-6 w-6 text-black" />}
          value="미르미"
          description="동아리 내 역할"
        />
        <InfoBox
          title="지각 및 결석"
          icon={<Users className="h-6 w-6 text-black" />}
          value="2"
          description="지각 및 결석 현황"
        />
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#1E293B] mb-1">출석 기록</h2>
        <p className="text-sm text-[#475569] mb-3">
          얼마나 성실하게 활동에 참여했는지 확인해요
        </p>
        <div className="space-y-2">
          {attendance.map((record) => (
            <div
              key={record.id}
              className="bg-white p-4 rounded-xl border text-sm flex flex-col gap-1"
            >
              {" "}
              <p className="font-bold text-[#1E293B]">{record.date}</p>
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
          ))}
        </div>
      </section>
    </div>
  );
}

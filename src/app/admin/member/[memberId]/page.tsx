"use client";

import { useState } from "react";

import { Wrench, Users } from "lucide-react";

import { AttendanceIcon, LateIcon, AbsenceIcon } from "@/assets/icons/index";
import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import {
  MemberAttendanceRecord,
  memberAttendanceRecords,
} from "@/mocks/admin/admin";

import { AttendanceGraph } from "../../components/admin-main/AttendanceGraph";
import { InfoBox } from "../../components/admin-main/InfoBox";
import AttendanceModal from "../../components/AttendanceBottomSheet";

export default function MemberDetailPage() {
  const [selectedRecord, setSelectedRecord] =
    useState<MemberAttendanceRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen  mb-16  max-w-md mx-auto">
      <Header variant="back" />
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-[#222] mb-1">김준호</h1>
        <p className="text-sm text-[#667085]">소프트웨어학과</p>
        <p className="text-sm text-[#667085] mb-4">202401285</p>

        <AttendanceGraph percentage={100} total={5} attended={5} />
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
          value="0회"
          description="지각 및 결석 현황"
        />
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#1E293B] mb-1">출석 기록</h2>
        <p className="text-sm text-[#475569] mb-3">
          얼마나 성실하게 활동에 참여했는지 확인해요
        </p>
        <div className="space-y-2">
          {memberAttendanceRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white p-4 rounded-xl text-sm flex flex-col gap-1 cursor-pointer"
              onClick={() => {
                setSelectedRecord(record);
                setIsModalOpen(true);
              }}
            >
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
          ))}
        </div>
        {isModalOpen && selectedRecord && (
          <AttendanceModal
            selected={{ name: "이예림", status: selectedRecord.status }}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Calendar } from "lucide-react";

import { MemberAttendanceRecord } from "@/mocks/admin/admin";
interface AttendanceListProps {
  records: MemberAttendanceRecord[];
  onSelectRecord?: (record: MemberAttendanceRecord) => void;
}

export default function ManageMyAttendance({
  records,
  onSelectRecord,
}: AttendanceListProps) {
  const router = useRouter();
  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold text-black">내 출석관리</h2>{" "}
          <Calendar
            className="size-[18px]"
            onClick={() => router.push("/clubs/check-attendance")}
          />
        </div>
        <p className="text-sm text-[#666]">
          내가 동아리에서 얼마나 열심히 참여했는지 확인해요
        </p>
      </div>

      <div className="space-y-4 mt-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white p-4 rounded-xl text-sm flex flex-col gap-1 cursor-pointer"
            onClick={() => onSelectRecord?.(record)}
          >
            <p className="font-bold text-black">{record.date}</p>
            <div className="flex justify-between items-center">
              <p className="text-[#475569]">출석 시간: {record.time}</p>
              <div className="flex items-center gap-2 font-md text-[#475569]">
                {record.status === "출석" && (
                  <>
                    <span>출석</span>
                    <Image
                      src="/assets/badge/states/success-badge.svg"
                      alt="성공 뱃지"
                      width={25}
                      height={25}
                    />
                  </>
                )}
                {record.status === "결석" && (
                  <>
                    <span>결석</span>
                    <Image
                      src="/assets/badge/states/fail-badge.svg"
                      alt="실패 뱃지"
                      width={25}
                      height={25}
                    />
                  </>
                )}
                {record.status === "지각" && (
                  <>
                    <span>지각</span>
                    <Image
                      src="/assets/badge/states/late-badge.svg"
                      alt="지각 뱃지"
                      width={25}
                      height={25}
                    />
                  </>
                )}
              </div>
            </div>
            <p className="text-[#94A3B8] text-xs">{record.method}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

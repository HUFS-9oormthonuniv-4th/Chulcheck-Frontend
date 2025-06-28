"use client";

import { useRouter } from "next/navigation";

import { AttendanceRecord } from "@/lib/types/admin";

interface AttendanceListProps {
  records: AttendanceRecord[];
}

export function AttendanceList({ records }: AttendanceListProps) {
  const router = useRouter();

  const handleCardClick = (record: AttendanceRecord) => {
    router.push(
      `/admin/attendance/${record.id}?date=${record.date}&time=${record.time}`,
    );
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 pt-2">미르미 출석관리</h3>
      <p className="text-sm text-gray-600 mb-4">
        구름톤 유니브 한국외대에 미르미 출석을 확인하고 관리해요
      </p>

      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            onClick={() => handleCardClick(record)}
            className=" p-4 rounded-xl border border-gray-200 bg-white space-y-1"
          >
            <div className="flex justify-between items-center">
              <p className="text-md font-bold">
                {record.date} {record.time}
              </p>
              <span className="text-sm text-gray-500 font-semibold">
                출석률 <span className="text-[#3282F0] font-bold">100%</span>
              </span>
            </div>
            <p className="text-md text-gray-600">출석 시간: {record.time}</p>
            <p className="text-xs text-gray-400">{record.method}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

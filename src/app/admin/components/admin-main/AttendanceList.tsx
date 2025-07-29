"use client";

import { useRouter } from "next/navigation";

import { AttendanceSession } from "../../types/attendances";

interface AttendanceListProps {
  records: AttendanceSession[];
  clubId: number;
  memberAlias: string;
  clubName: string;
}

export function AttendanceList({
  records,
  clubId,
  memberAlias,
  clubName,
}: AttendanceListProps) {
  const router = useRouter();

  const handleCardClick = (record: AttendanceSession) => {
    router.push(
      `/admin/attendance/${record.id}?clubId=${clubId}&sessionId=${record.id}`,
    );
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 pt-2">
        {memberAlias} 출석관리
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {clubName}의 {memberAlias} 출석을 확인하고 관리해요
      </p>

      <div className="space-y-4">
        {records.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            출석 세션이 없습니다.
          </p>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              onClick={() => handleCardClick(record)}
              className="bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition"
            >
              <div className="flex justify-between items-center">
                <p className="text-base font-bold text-black">
                  {record.sessionDate} {record.startTime.slice(0, 5)}
                </p>
                <span className="text-sm text-gray-500 font-semibold">
                  출석률
                  <span className="text-[#3282F0] font-bold">
                    {record.attendanceRate ?? "-"}%
                  </span>
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                출석 시간: {record.startTime.slice(0, 5)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{record.method}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

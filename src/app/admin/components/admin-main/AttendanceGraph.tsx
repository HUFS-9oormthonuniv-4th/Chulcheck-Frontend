import { User } from "lucide-react";

interface Props {
  percentage: number;
  total: number;
  attended: number;
}

export function AttendanceGraph({ percentage, total, attended }: Props) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <section className="rounded-[20px] bg-white px-6 py-8 text-center border border-gray-200">
      <div className="text-[16px] font-medium text-[#667085] mb-4">
        전체 <span className="text-[#3282F0] font-bold">{percentage}%</span>{" "}
        만큼 출석했어요!
      </div>

      {/* 원형 차트 */}
      <div className="relative w-48 h-48 mx-auto">
        <svg
          className="w-full h-full transform -rotate-180"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="5"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#3282F0"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-[#F4F6FE] p-2 rounded-full mb-2">
            <User className="w-5 h-5 text-[#3282F0]" />
          </div>
          <div className="text-2xl font-bold text-[#222]">{percentage}%</div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-6 text-sm font-medium">
        <div className="flex items-center gap-1 text-[#222]">
          <span className="w-3 h-3 rounded-full bg-[#F2F4F7] inline-block" />총
          출석 {total}번
        </div>
        <div className="flex items-center gap-1 text-[#222]">
          <span className="w-3 h-3 rounded-full bg-[#3282F0] inline-block" />
          출석 {attended}번
        </div>
      </div>
    </section>
  );
}

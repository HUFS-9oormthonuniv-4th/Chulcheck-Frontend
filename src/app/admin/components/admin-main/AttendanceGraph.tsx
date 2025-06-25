import { User } from "lucide-react";

export function AttendanceGraph() {
  return (
    <section className="rounded-xl mb-6 pt-4 text-center border border-gray-200 ">
      <div className="text-sm font-semibold text-gray-600 mb-4">
        전체 <span className="text-[#3282F0] font-semibold">75%</span>
        만큼 출석했어요!
      </div>
      {/* 원형그래프 */}
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
      <div className="text-sm text-[#767676] font-semibold mt-4 space-x-4 py-4 flex justify-center">
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
          <span>총 출석 20번</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-[#3282F0] inline-block" />
          <span>출석 15번</span>
        </div>
      </div>
    </section>
  );
}

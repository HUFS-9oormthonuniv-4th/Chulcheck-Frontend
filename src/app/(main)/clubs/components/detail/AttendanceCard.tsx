import { Calendar } from "lucide-react";
interface AttendanceCardProps {
  count: number;
}
export function AttendanceCard({ count }: AttendanceCardProps) {
  return (
    <div className="flex flex-col justify-between py-4 px-6 rounded-[8px] border border-[#E5E7EB] bg-white gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-[#0F172A]">출석 세션</h2>
        <Calendar className="text-[#0F172A]" size={18} />
      </div>

      <div className="text-[#666] text-sm font-medium leading-[20px]">
        {count}
      </div>

      <div className="text-[#666] text-sm font-medium leading-[20px]">
        생성된 출석 세션 수
      </div>
    </div>
  );
}

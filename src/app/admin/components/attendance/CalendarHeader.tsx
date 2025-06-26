"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return (
    <div className="flex items-center justify-between space-x-2 mb-4">
      <div className="text-[16px] font-bold text-[#1E293B]">
        {year}년 {month}월
      </div>
      <div className="flex space-x-1">
        <button className="p-1" onClick={onPrevMonth}>
          <ChevronLeft className="w-7 h-7 text-[#3282F0]" />
        </button>
        <button className="p-1" onClick={onNextMonth}>
          <ChevronRight className="w-7 h-7 text-[#3282F0]" />
        </button>
      </div>
    </div>
  );
}

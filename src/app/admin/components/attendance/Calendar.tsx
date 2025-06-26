"use client";

interface CalendarProps {
  year: number;
  month: number;
  attendanceDates: string[];
}

export default function Calendar({
  year,
  month,
  attendanceDates,
}: CalendarProps) {
  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(year, month);
  const emptyDays = Array.from({ length: firstDay }, () => null);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const daysArray = [...emptyDays, ...days];

  return (
    <>
      <div className="grid grid-cols-7 gap-2 mb-4 text-center text-sm font-semibold text-[#212121]">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-x-1 gap-y-3 mb-8 text-[15px] justify-center">
        {daysArray.map((day, idx) => {
          const dateStr =
            typeof day === "number"
              ? `${year}-${(month + 1).toString().padStart(2, "0")}-${day
                  .toString()
                  .padStart(2, "0")}`
              : null;

          const isAttended = dateStr && attendanceDates.includes(dateStr);

          return (
            <div
              key={idx}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-[16px] font-bold ${
                day
                  ? isAttended
                    ? "bg-[#DDEEFF] text-[#3F6262]"
                    : "text-gray-400"
                  : ""
              }`}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </>
  );
}

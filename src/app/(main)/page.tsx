import Header from "@/components/ui/Header";

import AttendanceBadge from "./component/AttendanceBadge";
import AttendanceLogMain from "./component/AttendanceLogMain";
import AttendanceMain from "./component/AttendanceMain";

export default function MainPage() {
  return (
    <>
      <div className="flex flex-col gap-4 items-left w-full max-w-[375px] mx-auto pb-4">
        <Header variant="main" />
        <AttendanceMain />
        <AttendanceLogMain />
        <AttendanceBadge />
      </div>
    </>
  );
}

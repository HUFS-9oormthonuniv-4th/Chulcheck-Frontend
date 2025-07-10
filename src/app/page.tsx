import AttendanceBadge from "@/app/(main)/component/AttendanceBadge";
import AttendanceLogMain from "@/app/(main)/component/AttendanceLogMain";
import AttendanceMain from "@/app/(main)/component/AttendanceMain";
import Header from "@/components/ui/Header";

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

import Header from "@/components/ui/Header";

import AttendanceBadge from "./component/AttendanceBadge";
import AttendanceLogMain from "./component/AttendanceLogMain";
import AttendanceMain from "./component/AttendanceMain";

export default function MainPage() {
  return (
    <>
      <Header variant="main" />
      <AttendanceMain />
      <AttendanceLogMain />
      <AttendanceBadge />
    </>
  );
}

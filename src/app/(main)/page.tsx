import Header from "@/components/ui/Header";

import AttendanceMain from "./component/AttendanceMain";

export default function MainPage() {
  return (
    <>
      <Header variant="main" />
      <AttendanceMain />
      {/* <AttendanceLogMain /> */}
    </>
  );
}

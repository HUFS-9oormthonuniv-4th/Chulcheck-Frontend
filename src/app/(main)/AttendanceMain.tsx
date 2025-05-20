import React from "react";

import { TitleAndDescription } from "@/components/TitleAndDescription";

import QrCard from "../(attendance)/check/QrCard";

export default function AttendanceMain() {
  const pin = "0000-0000";

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-xl mx-auto py-8">
      <TitleAndDescription
        title="출석체크"
        description="QR코드를 스캔하거나 PIN 번호를 입력해서 출석해요"
      />
      <QrCard pin={pin} />
    </div>
  );
}

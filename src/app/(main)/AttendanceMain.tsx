"use client";

import React, { useState } from "react";

import AttendanceCheckSystemModal from "../(attendance)/check/AttendancdCheckSystemModal";
import QrCard from "../(attendance)/check/QrCard";

export default function AttendanceMain() {
  const pin = "0000-0000";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQrCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSelect = (type: "qr" | "pin") => {
    console.log("선택된 출석 방식:", type);
    // 여기에 QR 또는 PIN 출석 로직을 추가할 수 있습니다
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 items-left w-full max-w-xl mx-auto py-4">
      <QrCard pin={pin} onClick={handleQrCardClick} />

      {isModalOpen && (
        <AttendanceCheckSystemModal
          onSelect={handleModalSelect}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

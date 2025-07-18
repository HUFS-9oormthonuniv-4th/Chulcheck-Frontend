"use client";

import React, { useState } from "react";

import AttendanceCheckSystemModal from "@/app/(attendance)/check/AttendancdCheckSystemModal";
import AttendanceQrScan from "@/app/(attendance)/check/AttendanceQrScan";
import QrCard from "@/app/(attendance)/check/QrCard";

export default function AttendanceMain() {
  const pin = "0000-0000";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrScanOpen, setQrScanOpen] = useState(false);

  const handleQrCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSelect = (type: "qr" | "pin") => {
    if (type === "qr") {
      setIsModalOpen(false);
      setQrScanOpen(true);
    } else {
      // PIN 출석 로직 등
      setIsModalOpen(false);
    }
  };

  const handleQrScanClose = () => {
    setQrScanOpen(false);
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
      {qrScanOpen && <AttendanceQrScan onClose={handleQrScanClose} />}
    </div>
  );
}

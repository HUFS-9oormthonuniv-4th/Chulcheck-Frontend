"use client";

import { useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { AttendanceIcon, LateIcon, AbsenceIcon } from "@/assets/icons/index";

interface Props {
  selected: { name: string; status: string };
  onClose: () => void;
}

export default function AttendanceModal({ selected, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const statusOptions = [
    { label: "출석", icon: <AttendanceIcon /> },
    { label: "결석", icon: <AbsenceIcon /> },
    { label: "지각", icon: <LateIcon /> },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          ref={modalRef}
          className="bg-white w-full max-w-md rounded-t-[40px] p-5 shadow-lg"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          exit={{ y: 50 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-1 mt-6">
            출석 변경
          </h3>
          <p className="text-sm text-[#666666] mb-4 font-semibold">
            {selected.name} 학생의 출석을 변경할까요?
          </p>

          <div className="space-y-3 divide-y divide-gray-200">
            {statusOptions.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  console.log(`${selected.name} → ${item.label}`);
                  onClose();
                }}
                className="w-full flex justify-between items-center text-md font-md text-[#666666] px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <span>{item.label}</span>
                <span>{item.icon}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

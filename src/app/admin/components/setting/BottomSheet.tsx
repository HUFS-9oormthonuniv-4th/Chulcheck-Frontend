"use client";

import { useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

interface ApprovalBottomSheetProps {
  selected: { name: string };
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function ApprovalBottomSheet({
  selected,
  onClose,
  onApprove,
  onReject,
}: ApprovalBottomSheetProps) {
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
            가입 요청 처리
          </h3>
          <p className="text-sm text-[#666666] mb-4 font-semibold">
            {selected.name}님의 가입 요청을 처리하세요.
          </p>

          <div className="space-y-3 divide-y divide-gray-200">
            <button
              onClick={() => {
                onApprove();
                onClose();
              }}
              className="w-full text-md font-medium px-3 py-2 rounded-lg text-start"
            >
              승인합니다
            </button>
            <button
              onClick={() => {
                onReject();
                onClose();
              }}
              className="w-full text-md font-medium px-3 py-2 rounded-lg text-start"
            >
              거절합니다
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

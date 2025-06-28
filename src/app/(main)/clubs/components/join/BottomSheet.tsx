"use client";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { TitleAndDescription } from "@/components/ui/TitleAndDescription";

interface JoinRequestSheetProps {
  open: boolean;
  clubName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BottomSheet({
  open,
  clubName,
  onConfirm,
  onCancel,
}: JoinRequestSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={clsx(
              "fixed bottom-0 left-1/2 z-50 transform -translate-x-1/2",
              "w-[375px] h-[283px] rounded-t-[50px] bg-white shadow-[0px_2px_80px_rgba(0,0,0,0.25)] px-8 pt-13",
            )}
          >
            <div className="flex flex-col w-[288px] gap-[10px]">
              <TitleAndDescription
                title="동아리 가입 요청"
                description={`${clubName} 동아리에 가입하시겠습니까?`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Separator />
              <button
                onClick={onConfirm}
                className="flex justify-between items-center w-[311px] text-left text-base font-medium text-slate-700"
              >
                네, 가입하고 싶어요
                <CheckCircle className="text-green-500" size={25} />
              </button>
              <Separator />
              <button
                onClick={onCancel}
                className="flex justify-between items-center w-[311px] text-left text-base font-medium text-slate-500"
              >
                아니요, 조금 더 둘러볼게요
                <XCircle className="text-red-500" size={25} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

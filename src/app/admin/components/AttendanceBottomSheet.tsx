import { AttendanceIcon, LateIcon, AbsenceIcon } from "@/assets/icons/index";

import BottomSheetWrapper from "./BottomSheetWrapper";

interface AttendanceBottomSheetProps {
  selected: { name: string; status: string };
  onClose: () => void;
}

export default function AttendanceBottomSheet({
  selected,
  onClose,
}: AttendanceBottomSheetProps) {
  const statusOptions = [
    { label: "출석", icon: <AttendanceIcon /> },
    { label: "결석", icon: <AbsenceIcon /> },
    { label: "지각", icon: <LateIcon /> },
  ];

  return (
    <BottomSheetWrapper onClose={onClose}>
      <h3 className="text-lg font-bold text-gray-900 mb-1 mt-6">출석 변경</h3>
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
    </BottomSheetWrapper>
  );
}

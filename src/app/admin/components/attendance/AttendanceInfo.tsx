import { AttendanceIcon, LateIcon, AbsenceIcon } from "@/assets/icons/index";

interface AttendanceRecord {
  id: number;
  name: string;
  dept: string;
  status: string;
}

interface AttendanceInfoProps {
  records: AttendanceRecord[];
  onClick: (record: AttendanceRecord) => void;
}

export default function AttendanceInfo({
  records,
  onClick,
}: AttendanceInfoProps) {
  const getIcon = (status: string) => {
    switch (status) {
      case "출석":
        return <AttendanceIcon />;
      case "결석":
        return <AbsenceIcon />;
      case "지각":
        return <LateIcon />;
    }
  };

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <div
          key={record.id}
          onClick={() => onClick(record)}
          className="bg-white rounded-xl p-3 border flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#DC2626] font-bold flex items-center justify-center">
              {record.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-[#1E293B]">{record.name}</p>
              <p className="text-sm text-gray-500">{record.dept}</p>
            </div>
          </div>
          {getIcon(record.status)}
        </div>
      ))}
    </div>
  );
}

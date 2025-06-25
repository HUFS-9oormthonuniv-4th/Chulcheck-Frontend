import { Member, AttendanceRecord } from "@/types/admin";

export const mockMembers: Member[] = [
  {
    id: 1,
    name: "이예림",
    department: "컴퓨터공학부",
    joinDate: "2025. 5. 1.",
    role: "대표",
  },
  {
    id: 2,
    name: "이예림2",
    department: "컴퓨터공학부",
    joinDate: "2025. 5. 1.",
    role: "운영진",
  },
  {
    id: 3,
    name: "이예림3",
    department: "컴퓨터공학부",
    joinDate: "2025. 5. 1.",
    role: "미르미",
  },
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    date: "2023-10-23",
    time: "14:00",
    attendanceRate: 75,
    method: "QR코드 스캔",
  },
  {
    id: 2,
    date: "2023-10-24",
    time: "10:30",
    attendanceRate: 80,
    method: "QR코드 스캔",
  },
];

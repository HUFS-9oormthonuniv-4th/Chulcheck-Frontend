import { Member, AttendanceRecord } from "@/lib/types/admin";

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

export const attendanceDates = [
  "2025-05-01",
  "2025-05-02",
  "2025-05-05",
  "2025-05-08",
  "2025-05-09",
  "2025-05-12",
  "2025-05-13",
  "2025-05-14",
  "2025-05-15",
  "2025-05-16",
  "2025-05-19",
  "2025-05-22",
  "2025-05-23",
  "2025-05-26",
  "2025-05-27",
  "2025-05-28",
  "2025-05-29",
  "2025-05-30",
];

export const attendanceRecords = [
  { id: 1, name: "이예림", dept: "한국외대 • 컴퓨터공학부", status: "출석" },
  { id: 2, name: "이예림", dept: "한국외대 • 컴퓨터공학부", status: "결석" },
  { id: 3, name: "이예림", dept: "한국외대 • 컴퓨터공학부", status: "지각" },
  { id: 4, name: "이예림", dept: "한국외대 • 컴퓨터공학부", status: "결석" },
];

export interface MemberAttendanceRecord {
  id: number;
  date: string;
  time: string;
  status: "출석" | "지각" | "결석";
  method: "QR코드 스캔" | "PIN코드 스캔";
}

export const memberAttendanceRecords: MemberAttendanceRecord[] = [
  {
    id: 1,
    date: "2023-10-23 14:00",
    time: "14:05",
    status: "출석",
    method: "QR코드 스캔",
  },
  {
    id: 2,
    date: "2023-10-23 14:00",
    time: "14:05",
    status: "출석",
    method: "QR코드 스캔",
  },
  {
    id: 3,
    date: "2023-10-23 14:00",
    time: "14:05",
    status: "출석",
    method: "QR코드 스캔",
  },
  {
    id: 4,
    date: "2023-10-23 14:00",
    time: "14:05",
    status: "결석",
    method: "QR코드 스캔",
  },
  {
    id: 5,
    date: "2023-10-23 14:00",
    time: "14:05",
    status: "지각",
    method: "PIN코드 스캔",
  },
];

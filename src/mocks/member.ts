import { NcubeMockMember } from "@/lib/types/admin";

import { MemberAttendanceRecord } from "./admin";

export const ncubeMockMembers: NcubeMockMember[] = [
  {
    id: 1,
    name: "이예림",
    department: "컴퓨터공학과",
    joinedAt: "2024. 3. 15.",
    status: "대표",
  },
  {
    id: 2,
    name: "김준호",
    department: "소프트웨어학과",
    joinedAt: "2025. 5. 1.",
    status: "멤버",
  },
  {
    id: 3,
    name: "박지우",
    department: "정보보호학과",
    joinedAt: "2025. 5. 1.",
    status: "멤버",
  },
];

export const memberAttendanceRecords: MemberAttendanceRecord[] = [
  {
    id: 1,
    date: "2025-06-12 14:00",
    time: "14:05",
    status: "출석",
    method: "QR코드 스캔",
  },
  {
    id: 2,
    date: "2025-06-19 14:00",
    time: "14:00",
    status: "출석",
    method: "QR코드 스캔",
  },
  {
    id: 3,
    date: "2025-06-23 14:00",
    time: "14:00",
    status: "결석",
    method: "QR코드 스캔",
  },
  {
    id: 4,
    date: "2025-6-26 14:00",
    time: "14:05",
    status: "지각",
    method: "QR코드 스캔",
  },
];

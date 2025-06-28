export interface Member {
  id: number;
  name: string;
  department: string;
  joinDate: string;
  role: "대표" | "운영진" | "미르미";
}

export interface AttendanceRecord {
  id: number;
  date: string;
  time: string;
  attendanceRate: number;
  method: string;
}

export interface NcubeMockMember {
  id: number;
  name: string;
  department: string;
  joinedAt: string;
  status: "대표" | "멤버";
}

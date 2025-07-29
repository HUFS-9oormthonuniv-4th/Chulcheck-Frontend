export interface AttendanceSession {
  id: number;
  sessionName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  attendanceRate: number;
  method: string;
}
export interface AttendanceRecord {
  userId: string;
  userName: string;
  sesstionId: number;
  status: string;
}
export interface Member {
  userId: string;
  school: string;
}

export interface AttendanceDetail {
  sessionId: number;
  sessionName: string;
  sessionDateTime: string;
  attendanceDetails: AttendanceRecord[];
}

export interface ClubDetailResponse {
  clubName: string;
  members: Member[];
  attendanceSessions: AttendanceDetail[];
}

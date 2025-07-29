import { AttendanceSession } from "./attendances";
import { ClubMember } from "./member";

export interface ClubDetailResponse {
  clubId: number;
  clubName: string;
  description: string;
  representativeAlias: string;
  memberAlias: string;
  memberCount: number;
  attendanceSessionCount: number;
  members: ClubMember[];
  attendanceSessions: AttendanceSession[];
}

export enum ClubRole {
  MANAGER = "ROLE_MANAGER",
  MEMBER = "ROLE_MEMBER",
}

export interface ClubMember {
  userId: string;
  name?: string | null;
  nickname: string;
  major: string;
  school: string;
  role: ClubRole;
  joinedAt: string;
  attendanceRate: number;
}

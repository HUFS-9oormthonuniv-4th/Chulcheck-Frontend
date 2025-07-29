import { ClubDetailResponse } from "@/app/admin/types/clubs";
import { AttendanceSession } from "@/app/admin/types/attendances";
import { ClubRole } from "@/app/admin/types/member";
import { httpService } from "@/lib/utils/httpService";

// 동아리 상세 정보 조회
export const getClubDetail = async (clubId: number) => {
  return await httpService.get<ClubDetailResponse>(`clubs/${clubId}/detail`);
};

// 출석 세션 목록 조회
export const getAttendanceSessions = async (clubId: number) => {
  return await httpService.get<AttendanceSession[]>(
    `attendance-sessions/club/${clubId}`
  );
};

// 출석 통계 조회
export interface AttendanceStats {
  totalCount: number;
  presentCount: number;
  lateCount: number;
  absentCount: number;
}
export const getAttendanceStats = async (clubId: number) => {
  return await httpService.get<AttendanceStats>(
    `/api/v1/attendance/stats?clubId=${clubId}`
  );
};

// 관리자 역할 변경 (추가 or 제거)
export const updateClubRoles = async (
  clubId: number,
  changes: { userId: string; newRole: ClubRole }[]
) => {
  return await Promise.all(
    changes.map((member) => {
      if (String(member.newRole) === String(ClubRole.MANAGER)) {
        return httpService.put(`/api/v1/clubs/${clubId}/administrators`, {
          userId: member.userId,
        });
      } else {
        return httpService.delete(
          `/api/v1/clubs/${clubId}/administrators/${member.userId}`
        );
      }
    })
  );
};

import { useQuery } from "@tanstack/react-query";
import { getAttendanceSessions } from "../apis/adminClub";

export const useAttendanceSessionsQuery = (clubId: number) => {
  return useQuery({
    queryKey: ["attendanceSessions", clubId],
    queryFn: () => getAttendanceSessions(clubId),
    enabled: !!clubId,
  });
};

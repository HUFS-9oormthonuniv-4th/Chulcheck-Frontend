import { useQuery } from "@tanstack/react-query";
import { getPendingJoinRequests } from "@/app/admin/apis/clubJoinRequests";

export const usePendingJoinRequests = (clubId: number) => {
  return useQuery({
    queryKey: ["pendingJoinRequests", clubId],
    queryFn: () => getPendingJoinRequests(clubId),
    enabled: !!clubId,
  });
};

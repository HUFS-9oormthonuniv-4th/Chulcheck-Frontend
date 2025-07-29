import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectJoinRequest } from "@/app/admin/apis/clubJoinRequests";

export const useRejectJoinRequest = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId }: { requestId: number }) =>
      rejectJoinRequest(clubId, requestId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["pendingJoinRequests", clubId],
      });
    },
    onError: () => alert("거절 중 오류 발생"),
  });
};

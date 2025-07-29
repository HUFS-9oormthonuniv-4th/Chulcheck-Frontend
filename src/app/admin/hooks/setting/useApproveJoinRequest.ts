import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveJoinRequest } from "@/app/admin/apis/clubJoinRequests";

export const useApproveJoinRequest = (
  clubId: number,
  onSuccessCallback: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: number) => approveJoinRequest(clubId, requestId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["pendingJoinRequests", clubId],
      });

      void onSuccessCallback();
    },
    onError: () => alert("승인 중 오류 발생"),
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClubRole } from "@/app/admin/types/member";
import { updateClubRoles } from "../apis/adminClub";

export const useUpdateClubRolesMutation = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (changes: { userId: string; newRole: ClubRole }[]) =>
      updateClubRoles(clubId, changes),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["clubDetail", clubId] });
    },
  });
};

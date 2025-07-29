import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { updateClub } from "../../apis/clubs";

interface UpdateClubPayload {
  name: string;
  representativeAlias: string;
  memberAlias: string;
  description: string;
}

export const useUpdateClub = (
  clubId: string,
  options?: UseMutationOptions<void, Error, UpdateClubPayload>
) => {
  return useMutation({
    mutationFn: (payload) => updateClub(clubId, payload),
    ...options,
  });
};

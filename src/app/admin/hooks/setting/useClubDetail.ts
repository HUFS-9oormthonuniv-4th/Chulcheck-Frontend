import { useQuery } from "@tanstack/react-query";
import { ClubDetail, getClubDetail } from "../../apis/clubs";

export const useClubDetailQuery = (
  clubId: string,
  options?: {
    onSuccess?: (data: ClubDetail) => void;
    onError?: (err: Error) => void;
  }
) => {
  return useQuery<ClubDetail, Error>({
    queryKey: ["clubDetail", clubId],
    queryFn: () => getClubDetail(clubId),
    enabled: !!clubId,
    ...options,
  });
};

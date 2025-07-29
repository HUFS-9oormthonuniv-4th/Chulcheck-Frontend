import { useQuery } from "@tanstack/react-query";
import { getClubDetail } from "../apis/adminClub";

export const useClubDetailQuery = (clubId: number) => {
  return useQuery({
    queryKey: ["clubDetail", clubId],
    queryFn: () => getClubDetail(clubId),
    enabled: !!clubId,
  });
};

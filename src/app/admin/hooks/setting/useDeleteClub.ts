import { useMutation } from "@tanstack/react-query";
import { deleteClub } from "@/app/admin/apis/clubs";

interface UseDeleteClubProps {
  onSuccess: () => void;
  onError: () => void;
}

export const useDeleteClub = ({ onSuccess, onError }: UseDeleteClubProps) => {
  return useMutation({
    mutationFn: (clubId: number | string) => deleteClub(clubId),
    onSuccess,
    onError,
  });
};

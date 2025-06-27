import { useMutation } from "@tanstack/react-query";

import { createClubApi } from "@/app/(main)/clubs/api/create-club";

import type { CreateClubRequest, CreateClubResponse } from "@/lib/types/clubs";

export function useCreateClub() {
  return useMutation<CreateClubResponse, Error, CreateClubRequest>({
    mutationFn: createClubApi,
  });
}

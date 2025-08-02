import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { fetchMyInfo } from "@/lib/api/user";
import { UserWithBadgesResponse } from "@/lib/types/user";

const USER_QUERY_KEY = ["user", "me"] as const;

export function useUser(): UseQueryResult<UserWithBadgesResponse, Error> {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchMyInfo,
    structuralSharing: true,
    placeholderData: keepPreviousData,
    enabled: status === "authenticated" && !!session?.accessToken,
    staleTime: 5 * 60 * 1000, // 5분 - 데이터 캐시 유지 시간
    gcTime: 10 * 60 * 1000, // 10분 - 데이터 캐시 삭제 시간
  });
}

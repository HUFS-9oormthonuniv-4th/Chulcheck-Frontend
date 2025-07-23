import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { fetchMyInfo } from "@/lib/api/user";
import { UserWithBadgesResponse } from "@/lib/types/user";

const USER_QUERY_KEY = ["user", "me"] as const;

export function useUser(): UseQueryResult<UserWithBadgesResponse, Error> {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchMyInfo,
    enabled: status === "authenticated" && !!session?.accessToken,
    staleTime: 5 * 60 * 1000, // 5분 - 사용자 정보는 자주 변경되지 않음
    gcTime: 10 * 60 * 1000, // 10분
    retry: (failureCount, error) => {
      // 401 에러(인증 실패)는 재시도하지 않음
      if (error instanceof Error && error.message.includes("401")) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

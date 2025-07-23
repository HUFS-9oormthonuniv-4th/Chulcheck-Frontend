import {
  ApiResponseUserWithBadgesResponse,
  UserWithBadgesResponse,
} from "@/lib/types/user";
import { httpService } from "@/lib/utils/httpService";

/**
 * 내 정보 조회 API (뱃지 정보 포함)
 */
export async function fetchMyInfo(): Promise<UserWithBadgesResponse> {
  const response =
    await httpService.get<ApiResponseUserWithBadgesResponse>("user/me");

  // API 응답 구조에서 data 부분만 반환
  return response.data;
}

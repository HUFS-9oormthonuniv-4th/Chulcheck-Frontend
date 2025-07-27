import { httpService, HttpError } from "@/lib/utils/httpService";

import type { CreateClubRequest, CreateClubResponse } from "@/lib/types/clubs";

type ApiError = { message?: string };

export async function createClubApi(
  data: CreateClubRequest,
): Promise<CreateClubResponse> {
  try {
    return await httpService.post<CreateClubResponse>("/api/v1/clubs", {
      data,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      const errBody = error.responseBody as ApiError;
      throw new Error(errBody.message || "동아리 생성에 실패했습니다.");
    }
    if (error instanceof Error) throw error;

    throw new Error("네트워크 오류가 발생했습니다.");
  }
}

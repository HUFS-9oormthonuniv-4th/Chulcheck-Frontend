import { getApiBaseUrl } from "@/lib/config/api";

import type { CreateClubRequest, CreateClubResponse } from "@/lib/types/clubs";

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export async function createClubApi(
  data: CreateClubRequest,
): Promise<CreateClubResponse> {
  const token = localStorage.getItem("accessToken");
  const apiUrl = getApiBaseUrl();
  const url = `${apiUrl}/api/v1/clubs`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const error = (await res.json().catch(() => ({}))) as ErrorResponse;
    throw new Error(error.message ?? "동아리 생성에 실패했습니다.");
  }

  const result = (await res.json()) as CreateClubResponse;
  return result;
}

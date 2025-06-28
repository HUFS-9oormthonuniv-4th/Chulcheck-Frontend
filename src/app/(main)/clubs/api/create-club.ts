import type { CreateClubRequest, CreateClubResponse } from "@/lib/types/clubs";

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export async function createClubApi(
  data: CreateClubRequest,
): Promise<CreateClubResponse> {
  const res = await fetch("/api/v1/clubs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = (await res.json()) as ErrorResponse;
    throw new Error(error.message ?? "동아리 생성에 실패했습니다.");
  }

  const result = (await res.json()) as CreateClubResponse;
  return result;
}

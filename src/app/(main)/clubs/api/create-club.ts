import type { CreateClubRequest, CreateClubResponse } from "@/lib/types/clubs";

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export async function createClubApi(
  data: CreateClubRequest,
): Promise<CreateClubResponse> {
  const url = `${API_BASE_URL}/api/v1/clubs`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const error = (await res.json().catch(() => ({}))) as ErrorResponse;
    throw new Error(error.message ?? "동아리 생성에 실패했습니다.");
  }

  return (await res.json()) as CreateClubResponse;
}

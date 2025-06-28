import { LogoutResponse } from "@/app/auth/_lib/types/api";
import { API_CONFIG } from "@/lib/config/api";

type ApiError = { message?: string };

export async function logoutApi(token: string): Promise<LogoutResponse> {
  const res = await fetch(`${API_CONFIG.BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = (await res
      .json()
      .catch(() => ({ message: undefined }))) as ApiError;
    throw new Error(error.message || "로그아웃 실패");
  }

  return (await res.json()) as LogoutResponse;
}

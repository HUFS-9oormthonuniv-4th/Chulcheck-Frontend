import { signOut } from "next-auth/react";

import { LogoutResponse } from "@/app/auth/_lib/types/api";
import { API_CONFIG } from "@/lib/config/api";

// import { httpService } from '@/lib/utils/httpService';

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

  // const res = await httpService.post<LogoutResponse>('/auth/logout', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // return res;
}

export async function logout(token: string): Promise<void> {
  try {
    // 1. 백엔드 API 호출 - 토큰 블랙리스트 추가
    await logoutApi(token);
  } catch (error) {
    console.error("Backend logout failed:", error);
  }

  // 2. 쿠키 정리
  await signOut({
    callbackUrl: "/auth/login",
    redirect: true,
  });
}

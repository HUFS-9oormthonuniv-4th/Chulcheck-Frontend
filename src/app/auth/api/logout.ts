import { signOut } from "next-auth/react";

import { LogoutResponse } from "@/app/auth/_lib/types/api";
import { httpService, HttpError } from "@/lib/utils/httpService";

type ApiError = { message?: string };

export async function logoutApi(token: string): Promise<LogoutResponse> {
  try {
    const response = await httpService.post<LogoutResponse>(
      "auth/logout",
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  } catch (error) {
    if (error instanceof HttpError) {
      // HttpError에서 에러 메시지 추출
      let errorMessage = "로그아웃 실패";

      if (error.responseBody && typeof error.responseBody === "object") {
        const errorBody = error.responseBody as ApiError;
        errorMessage = errorBody.message || "로그아웃 실패";
      }

      throw new Error(errorMessage);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("로그아웃 실패");
  }
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

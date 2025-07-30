import { signOut, getSession } from "next-auth/react";

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

export async function logout(): Promise<void> {
  try {
    const session = await getSession();
    if (session?.accessToken) {
      await logoutApi(session.accessToken);
    }
  } catch (error) {
    console.error("Backend logout failed:", error);
  }

  await signOut({
    callbackUrl: "/auth/login",
    redirect: true,
  });
}

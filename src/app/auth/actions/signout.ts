"use server";

import { signOut, auth } from "@/app/auth/auth";
import { httpService, HttpError } from "@/lib/utils/httpService";

async function backendLogout(token: string) {
  try {
    await httpService.post("auth/logout", undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(
        "Backend API logout failed:",
        error.message,
        error.responseBody,
      );
    } else {
      console.error(
        "An unexpected error occurred during backend logout:",
        error,
      );
    }
  }
}

export async function logoutAction() {
  try {
    const session = await auth();

    if (session?.accessToken) {
      await backendLogout(session.accessToken);
    }
  } catch (error) {
    console.error("Failed to get session for logout:", error);
  }

  // NextAuth.js 로그아웃 실행 (세션 쿠키 삭제)
  // redirectTo 옵션을 사용해 로그인 페이지로 보냅니다.
  await signOut({ redirectTo: "/auth/login" });
}

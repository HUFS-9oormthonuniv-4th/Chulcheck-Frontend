import { PasswordResetResponse } from "@/app/auth/_lib/types/api";
import { httpService, HttpError } from "@/lib/utils/httpService";

type ApiError = { message?: string };

export async function passwordResetApi(
  email: string,
): Promise<PasswordResetResponse> {
  try {
    const response = await httpService.post<PasswordResetResponse>(
      "auth/password-reset/request",
      { email },
    );
    console.log(response);

    return response;
  } catch (error) {
    if (error instanceof HttpError) {
      let errorMessage = "비밀번호 재설정 실패";

      if (error.responseBody && typeof error.responseBody === "object") {
        const errorBody = error.responseBody as ApiError;
        errorMessage = errorBody.message || "비밀번호 재설정 실패";
      }
      throw new Error(errorMessage);
    }
    console.log(error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("네트워크 오류가 발생했습니다.");
  }
}

export async function passwordReset(email: string): Promise<void> {
  try {
    await passwordResetApi(email);
  } catch (error) {
    console.error("비밀번호 재설정 실패:", error);
  }
}

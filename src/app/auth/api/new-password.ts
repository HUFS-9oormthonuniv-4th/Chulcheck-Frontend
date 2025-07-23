import { NewPasswordResponse } from "@/app/auth/_lib/types/api";
import { httpService, HttpError } from "@/lib/utils/httpService";

type ApiError = { message?: string };

export async function newPasswordApi(
  token: string,
  newPassword: string,
): Promise<NewPasswordResponse> {
  try {
    const response = await httpService.post<NewPasswordResponse>(
      "auth/password-reset/confirm",
      { token, newPassword },
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

export async function newPassword(
  token: string,
  newPassword: string,
): Promise<void> {
  try {
    await newPasswordApi(token, newPassword);
  } catch (error) {
    console.error("비밀번호 재설정 실패:", error);
    throw error; // 에러를 다시 던져서 훅에서 처리할 수 있도록 함
  }
}

import {
  LoginRequest,
  LoginResponse,
  LoginResponseSchema,
  ApiErrorResponseSchema,
} from "@/app/auth/_lib";
import { httpService, HttpError } from "@/lib/utils/httpService";

export async function loginApi({
  userId,
  password,
}: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await httpService.post<unknown>("auth/login", {
      userId,
      password,
    });

    // Zod를 사용한 응답 데이터 검증
    const validationResult = LoginResponseSchema.safeParse(response);
    if (validationResult.success) {
      return validationResult.data;
    } else {
      throw new Error("서버 응답 형식이 올바르지 않습니다.");
    }
  } catch (error) {
    if (error instanceof HttpError) {
      // HttpError에서 응답 본문 확인하여 에러 메시지 추출
      let errorMessage: string;
      try {
        if (error.responseBody && typeof error.responseBody === "object") {
          const validatedError = ApiErrorResponseSchema.safeParse(
            error.responseBody,
          );
          if (validatedError.success) {
            errorMessage =
              validatedError.data.message ||
              validatedError.data.error ||
              `로그인 실패 (${error.status})`;
          } else {
            errorMessage = `로그인 실패 (${error.status})`;
          }
        } else {
          errorMessage = error.message;
        }
      } catch {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("네트워크 오류가 발생했습니다.");
  }
}

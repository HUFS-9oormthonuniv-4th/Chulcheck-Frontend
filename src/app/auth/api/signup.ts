import {
  SignupRequest,
  SignupResponse,
  SignupRequestSchema,
  SignupResponseSchema,
  ApiErrorResponseSchema,
} from "@/app/auth/_lib";
import { httpService, HttpError } from "@/lib/utils/httpService";

export async function signupApi(data: SignupRequest): Promise<SignupResponse> {
  try {
    const validatedData = SignupRequestSchema.parse(data);

    const response = await httpService.post<unknown>(
      "auth/signup",
      validatedData,
    );

    const validationResult = SignupResponseSchema.safeParse(response);
    if (validationResult.success) {
      return validationResult.data;
    } else {
      throw new Error("서버 응답 형식이 올바르지 않습니다.");
    }
  } catch (error) {
    if (error instanceof HttpError) {
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
              `회원가입 실패 (${error.status})`;
          } else {
            errorMessage = `회원가입 실패 (${error.status})`;
          }
        } else {
          errorMessage = error.message;
        }
      } catch (parseError) {
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

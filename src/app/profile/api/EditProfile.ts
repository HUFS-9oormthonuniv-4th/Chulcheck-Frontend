import { ApiErrorResponseSchema } from "@/app/auth/_lib";
import {
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UpdateUserInfoResponseSchema,
} from "@/app/profile/_lib";
import { httpService } from "@/lib/utils/httpService";
import { HttpError } from "@/lib/utils/httpService";

/**
 * 내 정보 수정 API
 * PATCH /api/v1/user/me
 */
export async function editProfile(
  data: UpdateUserInfoRequest,
): Promise<UpdateUserInfoResponse> {
  try {
    // 빈 값들을 제거하여 실제 변경된 필드만 전송
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== undefined,
      ),
    ) as UpdateUserInfoRequest;

    const response = await httpService.patch<unknown>("user/me", cleanedData);

    // Zod를 사용한 응답 데이터 검증
    const validationResult = UpdateUserInfoResponseSchema.safeParse(response);
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
              `프로필 수정 실패 (${error.status})`;
          } else {
            errorMessage = `프로필 수정 실패 (${error.status})`;
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

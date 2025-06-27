import {
  SignupRequest,
  SignupResponse,
  SignupRequestSchema,
  SignupResponseSchema,
  ApiErrorResponseSchema,
} from "@/app/auth/_lib";
import { getApiBaseUrl } from "@/lib/config/api";

const TIMEOUT_DURATION = 10000; // 10초 타임아웃

export async function signupApi(data: SignupRequest): Promise<SignupResponse> {
  const apiUrl = getApiBaseUrl();
  const fullUrl = `${apiUrl}/api/auth/signup`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

  try {
    // 요청 데이터 검증
    const validatedData = SignupRequestSchema.parse(data);

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validatedData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();

      let errorMessage: string;
      try {
        const validatedError = ApiErrorResponseSchema.safeParse(
          JSON.parse(errorText),
        );
        if (validatedError.success) {
          errorMessage =
            validatedError.data.message ||
            validatedError.data.error ||
            `회원가입 실패 (${response.status})`;
        } else {
          errorMessage = `회원가입 실패 (${response.status})`;
        }
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    // Zod를 사용한 응답 데이터 검증
    const validationResult = SignupResponseSchema.safeParse(
      await response.json(),
    );
    if (validationResult.success) {
      return validationResult.data;
    } else {
      throw new Error("서버 응답 형식이 올바르지 않습니다.");
    }
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("요청이 시간 초과되었습니다. 다시 시도해주세요.");
      }
      throw error;
    }

    throw new Error("네트워크 오류가 발생했습니다.");
  }
}

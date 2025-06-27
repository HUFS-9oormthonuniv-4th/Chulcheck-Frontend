import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  basicInfoSchema,
  BasicInfoFormData,
  SignupRequest,
} from "@/app/auth/_lib";
import { signupApi } from "@/app/auth/api/signup";

// 상수 정의
const STUDENT_ID_MAX_LENGTH = 9;

const SIGNUP_TEMP_DATA_KEY = "chulcheck_signup_temp_data";

interface TempSignupData {
  email: string;
  password: string;
  timestamp: number;
}

// 타입 가드 함수
function isTempSignupData(data: unknown): data is TempSignupData {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof (data as Record<string, unknown>).email === "string" &&
    typeof (data as Record<string, unknown>).password === "string" &&
    typeof (data as Record<string, unknown>).timestamp === "number"
  );
}

export function useBasicInfoForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
      school: "",
      department: "",
      studentId: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    // 첫 번째 단계 데이터가 있는지 확인
    const tempDataStr = localStorage.getItem(SIGNUP_TEMP_DATA_KEY);
    if (!tempDataStr) {
      // 첫 번째 단계를 거치지 않은 경우 리다이렉트
      router.push("/auth/signup");
      return;
    }

    try {
      const parsedData = JSON.parse(tempDataStr) as unknown;

      if (isTempSignupData(parsedData)) {
        // 24시간 이내의 데이터인지 확인
        const ONE_DAY = 24 * 60 * 60 * 1000;
        if (Date.now() - parsedData.timestamp > ONE_DAY) {
          localStorage.removeItem(SIGNUP_TEMP_DATA_KEY);
          router.push("/auth/signup");
          return;
        }
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("임시 데이터 파싱 오류:", error);
      localStorage.removeItem(SIGNUP_TEMP_DATA_KEY);
      router.push("/auth/signup");
    }
  }, [router]);

  const onSubmit = async (data: BasicInfoFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // 첫 번째 단계 데이터 가져오기
      const tempDataStr = localStorage.getItem(SIGNUP_TEMP_DATA_KEY);
      if (!tempDataStr) {
        throw new Error(
          "회원가입 정보가 없습니다. 처음부터 다시 시도해주세요.",
        );
      }

      const parsedData = JSON.parse(tempDataStr) as unknown;
      if (!isTempSignupData(parsedData)) {
        throw new Error(
          "회원가입 정보가 올바르지 않습니다. 처음부터 다시 시도해주세요.",
        );
      }

      // 전체 회원가입 데이터 조합
      const signupData: SignupRequest = {
        userId: parsedData.email,
        password: parsedData.password,
        name: data.name,
        school: data.school,
        major: data.department,
        studentNum: data.studentId,
      };

      // 회원가입 API 호출
      await signupApi(signupData);

      // 회원가입 성공 시 임시 데이터 삭제
      localStorage.removeItem(SIGNUP_TEMP_DATA_KEY);

      // 로그인 페이지로 이동
      router.push("/auth/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setServerError(
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, serverError, onSubmit };
}

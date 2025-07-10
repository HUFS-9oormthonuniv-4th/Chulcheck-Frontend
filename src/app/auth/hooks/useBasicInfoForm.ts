import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { basicInfoSchema, BasicInfoFormData } from "@/app/auth/_lib";
import { completeSignup, getTempSignupData } from "@/app/auth/actions/signup";

// 상수 정의
const STUDENT_ID_MAX_LENGTH = 9;

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
    const checkTempData = async () => {
      try {
        const tempData = await getTempSignupData();
        if (!tempData) {
          // 첫 번째 단계를 거치지 않은 경우 리다이렉트
          router.push("/auth/signup");
        }
      } catch (error) {
        console.error("임시 데이터 조회 오류:", error);
        router.push("/auth/signup");
      }
    };

    void checkTempData();
  }, [router]);

  const onSubmit = async (data: BasicInfoFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // 서버 액션을 통해 회원가입 완료
      const result = await completeSignup(data);

      if (!result.success) {
        throw new Error(result.message);
      }

      // 성공 시 로그인 페이지로 이동
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

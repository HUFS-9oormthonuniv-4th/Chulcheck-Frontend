import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { basicInfoSchema, BasicInfoFormData } from "@/app/auth/_lib";
import { completeSignup } from "@/app/auth/actions/signup";

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

  // 미들웨어에서 임시 데이터 검증을 처리하므로 useEffect 제거

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

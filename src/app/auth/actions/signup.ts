"use server";

import { cookies } from "next/headers";

import { SignupRequest, SignupResponse } from "@/app/auth/_lib/types/api";
import { SignUpFormData, BasicInfoFormData } from "@/app/auth/_lib/types/forms";
import { signupApi } from "@/app/auth/api/signup";

const TEMP_SIGNUP_COOKIE_NAME = "chulcheck_temp_signup";
const COOKIE_MAX_AGE = 30 * 60; // 30분

interface TempSignupData {
  email: string;
  password: string;
  timestamp: number;
}

/**
 * 첫 번째 단계: 이메일과 패스워드를 임시 저장하고 기본정보 페이지로 이동
 */
export async function saveTempSignupData(data: SignUpFormData) {
  try {
    const tempData: TempSignupData = {
      email: data.email,
      password: data.password,
      timestamp: Date.now(),
    };

    // 암호화된 쿠키에 임시 데이터 저장
    const cookieStore = await cookies();
    cookieStore.set(TEMP_SIGNUP_COOKIE_NAME, JSON.stringify(tempData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    // 성공 응답 반환
    return { success: true, message: "임시 데이터가 저장되었습니다." };
  } catch (error) {
    console.error("임시 회원가입 데이터 저장 실패:", error);
    return {
      success: false,
      message: "임시 데이터 저장 중 오류가 발생했습니다.",
    };
  }
}

/**
 * 두 번째 단계: 임시 데이터와 기본정보를 합쳐서 최종 회원가입 처리
 */
export async function completeSignup(basicInfo: BasicInfoFormData) {
  try {
    // 임시 데이터 조회
    const cookieStore = await cookies();
    const tempDataCookie = cookieStore.get(TEMP_SIGNUP_COOKIE_NAME);

    if (!tempDataCookie) {
      throw new Error(
        "회원가입 정보가 만료되었습니다. 처음부터 다시 시도해주세요.",
      );
    }

    const parsedData = JSON.parse(tempDataCookie.value) as unknown;

    // 타입 검증
    if (
      typeof parsedData !== "object" ||
      parsedData === null ||
      !("email" in parsedData) ||
      !("password" in parsedData) ||
      !("timestamp" in parsedData) ||
      typeof parsedData.email !== "string" ||
      typeof parsedData.password !== "string" ||
      typeof parsedData.timestamp !== "number"
    ) {
      throw new Error("저장된 회원가입 정보가 올바르지 않습니다.");
    }

    const tempData: TempSignupData = {
      email: parsedData.email,
      password: parsedData.password,
      timestamp: parsedData.timestamp,
    };

    // 데이터 유효성 검증 (30분 이내)
    const now = Date.now();
    const timeDiff = now - tempData.timestamp;
    if (timeDiff > COOKIE_MAX_AGE * 1000) {
      // 만료된 쿠키 삭제
      cookieStore.delete(TEMP_SIGNUP_COOKIE_NAME);
      throw new Error(
        "회원가입 정보가 만료되었습니다. 처음부터 다시 시도해주세요.",
      );
    }

    // 전체 회원가입 데이터 조합 (이메일을 userId로 그대로 사용)
    const signupData: SignupRequest = {
      userId: tempData.email, // 이메일을 그대로 userId로 사용
      password: tempData.password,
      // optional 필드들은 값이 있을 때만 포함
      ...(basicInfo.name && { name: basicInfo.name }),
      ...(basicInfo.school && { school: basicInfo.school }),
      ...(basicInfo.department && { major: basicInfo.department }),
      ...(basicInfo.studentId && { studentNum: basicInfo.studentId }),
    };

    // 회원가입 API 호출
    const result: SignupResponse = await signupApi(signupData);

    // 회원가입 성공 시 임시 데이터 삭제
    cookieStore.delete(TEMP_SIGNUP_COOKIE_NAME);

    return { success: true, data: result };
  } catch (error) {
    console.error("회원가입 완료 실패:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.",
    };
  }
}

/**
 * 임시 데이터 조회 (기본정보 페이지에서 데이터 존재 여부 확인용)
 */
export async function getTempSignupData(): Promise<TempSignupData | null> {
  try {
    const cookieStore = await cookies();
    const tempDataCookie = cookieStore.get(TEMP_SIGNUP_COOKIE_NAME);

    if (!tempDataCookie) {
      return null;
    }

    const parsedData = JSON.parse(tempDataCookie.value) as unknown;

    // 타입 검증
    if (
      typeof parsedData !== "object" ||
      parsedData === null ||
      !("email" in parsedData) ||
      !("password" in parsedData) ||
      !("timestamp" in parsedData) ||
      typeof parsedData.email !== "string" ||
      typeof parsedData.password !== "string" ||
      typeof parsedData.timestamp !== "number"
    ) {
      return null; // 타입이 맞지 않으면 null 반환
    }

    const tempData: TempSignupData = {
      email: parsedData.email,
      password: parsedData.password,
      timestamp: parsedData.timestamp,
    };

    // 데이터 유효성 검증
    const now = Date.now();
    const timeDiff = now - tempData.timestamp;
    if (timeDiff > COOKIE_MAX_AGE * 1000) {
      // 만료된 쿠키 삭제
      cookieStore.delete(TEMP_SIGNUP_COOKIE_NAME);
      return null;
    }

    return tempData;
  } catch (error) {
    console.error("임시 데이터 조회 실패:", error);
    return null;
  }
}

/**
 * 임시 데이터 삭제
 */
export async function clearTempSignupData() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(TEMP_SIGNUP_COOKIE_NAME);
    return { success: true };
  } catch (error) {
    console.error("임시 데이터 삭제 실패:", error);
    return { success: false };
  }
}

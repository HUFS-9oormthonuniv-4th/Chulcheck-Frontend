"use client";

import Image from "next/image";
import Link from "next/link";

import { TitleAndDescription } from "@/components/TitleAndDescription";

export default function PasswordResetConfirmationPage() {
  return (
    <div className="flex flex-col items-center">
      {/* 뒤로가기 버튼 */}
      <div className="w-full px-3 max-w-[375px]">
        <Link
          href="/auth/login"
          className="flex text-xl font-semibold text-[#0F172AE5] gap-1"
        >
          <Image
            src="/assets/icons/arrow-up.svg"
            width={15}
            height={15}
            alt="back"
          />
          돌아가기
        </Link>
      </div>

      <div className="w-full max-w-[310px] flex flex-col gap-6 mt-10">
        {/* 타이틀 */}
        <TitleAndDescription
          title="이메일을 확인해주세요"
          description="비밀번호 재설정 링크를 이메일로 보내드렸어요"
        />

        {/* 완료 메시지 영역 */}
        <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-800">
              이메일이 성공적으로 전송되었습니다
            </span>
          </div>
        </div>

        {/* 안내 문구 */}
        <div className="space-y-3">
          <p className="text-sm text-[#64748B] leading-relaxed">
            입력하신 이메일 주소로 비밀번호 재설정 링크를 보내드렸습니다.
            이메일을 확인하고 링크를 클릭하여 새로운 비밀번호를 설정해주세요.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-[#64748B]">
              <span className="font-medium">💡 안내:</span> 이메일이 보이지
              않는다면 스팸함을 확인해주세요. 재설정 링크는 24시간 동안만
              유효합니다.
            </p>
          </div>
        </div>

        {/* 로그인 페이지 링크 */}
        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-primary hover:underline"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

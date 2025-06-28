"use client";

/**
 * 공통 헤더 컴포넌트
 * @example
 * // 메인 헤더 (로고 + 내 동아리 + 프로필 + 메뉴)
 * <Header variant="main" />
 *
 * @example
 * // 뒤로가기 헤더 (텍스트 기본값: '돌아가기')
 * <Header variant="back" />
 *
 * @example
 * // 뒤로가기 헤더 + 커스텀 타이틀
 * <Header variant="back" title="출석 상세" />
 */

import { useRouter } from "next/navigation";

import { ArrowLeft, FolderHeart, MenuIcon } from "lucide-react";

import Logo from "../svg/logo_wordmark";

interface HeaderProps {
  variant: "main" | "back";
  title?: string;
}

export default function Header({ variant, title = "돌아가기" }: HeaderProps) {
  const router = useRouter();

  if (variant === "back") {
    return (
      <header className="flex items-center h-12  mb-2 border-b">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 "
        >
          <ArrowLeft className="w-5 h-5 text-[#0F172A]" />
          <span className="text-[20px] font-semibold text-[#0F172A]">
            {title}
          </span>
        </button>
      </header>
    );
  }
  return (
    <header className="flex justify-between items-center h-12 bg-white border-b mb-2 max-w-[375px]">
      <div className="flex items-center">
        <Logo className="w-[150px]" />
      </div>

      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 text-[15px] font-semibold text-[#64748B]">
          <FolderHeart className="w-5 h-5" />
          <span>내 동아리</span>
        </button>
        {/* 소셜로그인 프로필사진으로 가져오기 */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#3282F0] font-bold text-lg shrink-0">
          이
        </div>
        <MenuIcon className="w-6 h-6 text-[#64748B]" />
      </div>
    </header>
  );
}

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

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ArrowLeft, FolderHeart } from "lucide-react";

import Logo from "@/components/svg/logo_wordmark";
import HamburgerMenu from "@/components/ui/hamburger";
import SignoutButton from "@/components/ui/signoutButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/lib/hooks/useUser";

interface HeaderProps {
  variant: "main" | "back";
  title?: string;
}

// function HeaderSkeleton() {
//   return (
//     <header className="flex justify-between items-center h-12 border-b mb-2 max-w-[375px]">
//       <div className="flex items-center">
//         <Skeleton className="w-[150px] h-6" />
//       </div>
//       <div className="flex items-center space-x-2">
//         <div className="flex items-center space-x-1">
//           <Skeleton className="w-5 h-5" />
//           <Skeleton className="w-16 h-4" />
//         </div>
//         <Skeleton className="w-8 h-8 rounded-full" />
//         <Skeleton className="w-6 h-6" />
//       </div>
//     </header>
//   );
// }

export default function Header({ variant, title = "돌아가기" }: HeaderProps) {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  if (variant === "back") {
    return (
      <header className="flex items-center h-12 mb-2 border-b">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2"
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
    <header className="flex justify-between items-center h-12 border-b mb-2 max-w-[375px]">
      <div className="flex items-center">
        <button
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="홈으로 이동"
        >
          <Logo className="w-[150px]" />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 text-[15px] font-semibold text-[#64748B]">
          <FolderHeart className="w-5 h-5" />
          <span>내 동아리</span>
        </button>
        {isLoading ? (
          <Skeleton className="w-8 h-8 rounded-full" />
        ) : user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <span className="rounded-full bg-gray-500 text-white text-sm font-semibold w-8 h-8 flex items-center justify-center">
            {user?.name?.[0]}
          </span>
        )}

        <HamburgerMenu>
          <SignoutButton />
        </HamburgerMenu>
      </div>
    </header>
  );
}

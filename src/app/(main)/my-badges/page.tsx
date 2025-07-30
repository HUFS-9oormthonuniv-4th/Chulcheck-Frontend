"use client";

import Image from "next/image";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/lib/hooks/useUser";

export default function MyBadgesPage() {
  const { data: user, isLoading } = useUser();

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 items-left w-full max-w-xl mx-auto py-4">
        <Header variant="main" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return user?.badges.length ? (
    <div className="flex flex-col gap-2 items-left w-full max-w-xl mx-auto py-4">
      <Header variant="main" />
      <TitleAndDescription
        title="나의 출석 뱃지"
        description={
          <>
            <span className="font-semibold">{user?.name}님</span>은 이번 학기{" "}
            <span className="text-blue-500 font-bold">
              {user?.attendanceRate}%
            </span>{" "}
            출석률을 기록하고 있어요.
            <br />
            개근을 달성하면 특별한 뱃지를 획득할 수 있어요!
          </>
        }
      />
      <div className="grid grid-cols-3 gap-6 mt-6">
        {(user?.badges ?? []).map((badge) => {
          return (
            <div key={badge.id} className="flex flex-col items-center">
              <div className="rounded-full flex items-center justify-center w-full h-auto">
                <Image
                  src={badge.badgeImage}
                  alt={badge.name}
                  width={95}
                  height={119}
                  // isAcquired가 false일 때만 'grayscale' 클래스를 추가
                  className={!badge.isAcquired ? "grayscale" : ""}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-left w-full max-w-xl mx-auto py-4">
      <Header variant="main" />
      <TitleAndDescription
        title="나의 출석 뱃지"
        description={
          <>
            <span className="font-semibold">{user?.name}님</span>은 이번 학기{" "}
            <span className="text-blue-500 font-bold">
              {user?.attendanceRate}%
            </span>{" "}
            출석률을 기록하고 있어요.
            <br />
            개근을 달성하면 특별한 뱃지를 획득할 수 있어요!
          </>
        }
      />
      <div className="grid grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

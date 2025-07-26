"use client";

import Image from "next/image";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import { useUser } from "@/lib/hooks/useUser";

export default function MyBadgesPage() {
  const { data: user } = useUser();

  return (
    <div className="flex flex-col gap-4 items-left w-full max-w-xl mx-auto py-4">
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
  );
}

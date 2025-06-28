import React from "react";

import Image from "next/image";
import Link from "next/link";

import { FaCircleArrowRight } from "react-icons/fa6";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import { Button } from "@/components/ui/button";

const BADGES = [
  {
    key: "perfect-attendance",
    imageSrc: "/assets/badge/perfect-attendance-award-on .svg",
    label: "3주 개근상",
    bg: "bg-yellow-100",
  },
  {
    key: "regular-attendance-king",
    imageSrc: "/assets/badge/regular-attendance-king-on.svg",
    label: "정시 출석왕",
    bg: "bg-blue-100",
  },
  {
    key: "pro",
    imageSrc: "/assets/badge/pro-on.svg",
    label: "활동 참여왕",
    bg: "bg-green-100",
  },
];

export default function AttendanceBadge() {
  const userName = "이예림";
  const attendanceRate = 87;

  return (
    <div className="flex flex-col gap-4 items-left w-full max-w-xl mx-auto py-4">
      <TitleAndDescription
        title="나의 출석 뱃지"
        description={
          <>
            <span className="font-semibold">{userName}님</span>은 이번 학기{" "}
            <span className="text-blue-500 font-bold">{attendanceRate}%</span>{" "}
            출석률을 기록하고 있어요.
            <br />
            개근을 달성하면 특별한 뱃지를 획득할 수 있어요!
          </>
        }
      />
      <div className="flex w-full bg-white justify-between min-h-[120px]">
        {BADGES.map((badge) => (
          <div
            key={badge.key}
            className={`flex flex-col justify-center items-center gap-3`}
          >
            <div
              className={`rounded-full flex items-center justify-center w-full h-auto`}
            >
              <Image
                src={badge.imageSrc}
                alt={badge.label}
                width={95}
                height={119}
              />
            </div>
          </div>
        ))}
      </div>
      <Link href="/my-badges" className="w-full">
        <Button
          className="w-full h-12 text-lg font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200 mt-4 flex items-center justify-center gap-2"
          style={{ borderRadius: 12 }}
        >
          나의 뱃지 보러가기
          <FaCircleArrowRight size={20} />
        </Button>
      </Link>
    </div>
  );
}

import Image from "next/image";

import { TitleAndDescription } from "@/components/TitleAndDescription";

const BADGES = [
  {
    key: "perfect-attendance",
    label: "3주 개근상",
    on: "/assets/badge/perfect-attendance-award-on .svg",
    off: "/assets/badge/perfect-attendance-award-off .svg",
  },
  {
    key: "regular-attendance-king",
    label: "정시 출석왕",
    on: "/assets/badge/regular-attendance-king-on.svg",
    off: "/assets/badge/regular-attendance-king-off.svg",
  },
  {
    key: "pro",
    label: "출석의 PRO",
    on: "/assets/badge/pro-on.svg",
    off: "/assets/badge/pro-off.svg",
  },
  {
    key: "owner",
    label: "동아리 오너",
    on: "/assets/badge/owner-on.svg",
    off: "/assets/badge/owner-off.svg",
  },
  {
    key: "rain",
    label: "비오는날의 출석자",
    on: "/assets/badge/rain-on.svg",
    off: "/assets/badge/rain-off.svg",
  },
  {
    key: "master",
    label: "출석 Master",
    on: "/assets/badge/master-on.svg",
    off: "/assets/badge/master-off.svg",
  },
  {
    key: "new-member",
    label: "뉴비 부원",
    on: "/assets/badge/new-member-on.svg",
    off: "/assets/badge/new-member-off.svg",
  },
];

// 임시로 모든 뱃지를 on/off 랜덤으로 표시 (실제론 props로 제어)
function getRandomBool() {
  return Math.random() > 0.5;
}

export default function MyBadgesPage() {
  const userName = "홍다오";
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
      <div className="grid grid-cols-3 gap-6 mt-6">
        {BADGES.map((badge) => {
          const acquired = getRandomBool(); // 추후 props로 대체
          return (
            <div key={badge.key} className="flex flex-col items-center">
              <div className="rounded-full flex items-center justify-center w-full h-auto">
                <Image
                  src={acquired ? badge.on : badge.off}
                  alt={badge.label}
                  width={95}
                  height={119}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

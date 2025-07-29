"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const clubId = searchParams.get("clubId");
  const clubName = searchParams.get("clubName");

  return (
    <div className="min-h-screen max-w-md mx-auto">
      <Header variant="back" />
      <TitleAndDescription
        title="설정"
        description={
          <>{clubName ? ` ${clubName}` : "동아리 이름을 불러오는 중..."}</>
        }
      />
      <div className="space-y-1">
        <button
          onClick={() =>
            router.push(
              `/admin/setting/approval?clubId=${clubId}&clubName=${encodeURIComponent(
                clubName ?? "",
              )}`,
            )
          }
          className="w-full pl-2 text-left text-[#64748B] text-base py-2.5 border-b border-[#c0c6ce]"
        >
          가입 요청 목록
        </button>
        <button
          onClick={() => {
            console.log("이동 시도:", clubId, clubName);
            if (clubId && clubName) {
              router.push(
                `/admin/setting/edit-club?clubId=${clubId}&clubName=${encodeURIComponent(
                  clubName,
                )}`,
              );
            }
          }}
          className="w-full pl-2 text-left text-[#64748B] text-base py-2.5 border-b border-[#c0c6ce]"
        >
          동아리 정보 수정
        </button>
        <button
          onClick={() =>
            router.push(
              `/admin/setting/delete-club?clubId=${clubId}&clubName=${encodeURIComponent(
                clubName ?? "",
              )}`,
            )
          }
          className="w-full pl-2 text-left text-[#64748B] text-base py-2.5 border-b border-[#c0c6ce]"
        >
          동아리 삭제
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { Separator } from "@/components/ui/separator";

import { BottomSheet } from "../components/join/BottomSheet";
import { EmptyClub } from "../components/join/EmptyClub";
import { PasteLink } from "../components/join/PasteLink";
import { SearchInput } from "../components/SearchInput";
import { TabCard } from "../components/TabCard";

const mockData = [
  {
    clubId: 1,
    title: "구름톤 유니브",
    description:
      "카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 전국 대학 IT 연합 동아리입니다.",
    role: "관리자" as const,
    memberCount: 2,
  },
  {
    clubId: 2,
    title: "NCUBE",
    description:
      "차세대 개발자를 위한 기술 공유와 협업 중심의 대학 연합 IT 학회입니다.",
    role: "멤버" as const,
    memberCount: 12,
  },
  {
    clubId: 3,
    title: "PNP",
    description:
      "AI 기술에 관심 있는 대학생들이 모여 연구와 스터디를 진행하는 연합 동아리입니다.",
    role: "관리자" as const,
    memberCount: 8,
  },
  {
    clubId: 4,
    title: "CodeLink",
    description:
      "프론트엔드부터 백엔드까지 다양한 기술을 공유하는 전국 IT 학회 CodeLink입니다.",
    role: "멤버" as const,
    memberCount: 10,
  },
];

export default function JoinClub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState<null | {
    clubId: number;
    title: string;
  }>(null);

  const filteredClubs = mockData.filter((club) =>
    club.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const [requestedClubIds, setRequestedClubIds] = useState<number[]>([]);

  const handleConfirm = () => {
    if (selectedClub) {
      setRequestedClubIds((prev) => [...prev, selectedClub.clubId]);
      setSelectedClub(null);
    }
  };

  const handleCancel = () => {
    setSelectedClub(null);
  };
  return (
    <>
      <Header variant="main" />
      <main className="flex flex-col w-full max-w-[375px] mx-auto mt-4 gap-[10px]">
        <TitleAndDescription
          title="동아리 참여하기"
          description="내가 함께하고 싶은 동아리를 참여해요"
        />
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredClubs.length > 0 ? (
          <>
            <div className="relative my-4 flex items-center justify-center">
              <Separator />
              <span className="absolute bg-white px-2 text-xs text-slate-400">
                또는
              </span>
            </div>
            <PasteLink />
            <TitleAndDescription title="검색결과" description={undefined} />
            <div className="flex flex-col gap-[22px]">
              {filteredClubs.map((club) => {
                const isRequested = requestedClubIds.includes(club.clubId);
                return (
                  <TabCard
                    key={club.clubId}
                    clubId={club.clubId}
                    title={club.title}
                    description={club.description}
                    role={club.role}
                    memberCount={club.memberCount}
                    buttonLabel={isRequested ? "대기 중.." : "가입 요청"}
                    onButtonClick={
                      isRequested
                        ? undefined
                        : () =>
                            setSelectedClub({
                              clubId: club.clubId,
                              title: club.title,
                            })
                    }
                    buttonDisabled={isRequested}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <EmptyClub />
        )}
        <BottomSheet
          open={!!selectedClub}
          clubName={selectedClub?.title ?? ""}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </main>
    </>
  );
}

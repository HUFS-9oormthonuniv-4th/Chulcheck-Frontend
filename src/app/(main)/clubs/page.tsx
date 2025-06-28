"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";

import { ClubActionButton } from "./components/ClubsActionButton";
import { EmptyClubList } from "./components/EmptyClubList";
import { SearchInput } from "./components/SearchInput";
import { TabCard } from "./components/TabCard";

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
];

export default function MyClubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredClubs = mockData.filter((club) =>
    club.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateClick = () => router.push("/clubs/create");
  const handleJoinClick = () => router.push("/clubs/join");

  const handleDetailClick = (role: "관리자" | "멤버", clubId: number) => {
    if (role === "관리자") {
      router.push(`/admin/${clubId}`);
    } else {
      router.push(`/clubs/${clubId}`);
    }
  };

  return (
    <>
      <Header variant="main" />
      <main className="flex flex-col w-full max-w-[375px] mx-auto mt-4 gap-[15px]">
        <TitleAndDescription
          title="내 동아리"
          description="나의 동아리 정보와 출석 정보를 확인해요"
        />

        {searchQuery === "" && (
          <div className="flex gap-[15px] -mt-2">
            <ClubActionButton label="동아리 생성" onClick={handleCreateClick} />
            <ClubActionButton
              label="동아리 참여하기"
              onClick={handleJoinClick}
            />
          </div>
        )}
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredClubs.length === 0 ? (
          <EmptyClubList />
        ) : (
          <div className="flex flex-col gap-[22px]">
            {filteredClubs.map((club, index) => (
              <TabCard
                key={club.clubId}
                clubId={club.clubId}
                title={club.title}
                description={club.description}
                role={club.role}
                memberCount={club.memberCount}
                showDetailButton={true}
                onButtonClick={() => handleDetailClick(club.role, club.clubId)}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

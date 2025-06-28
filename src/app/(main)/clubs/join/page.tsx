"use client";

import { useState, useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";

import Header from "@/components/ui/Header";
import { Separator } from "@/components/ui/separator";
import { TitleAndDescription } from "@/components/ui/TitleAndDescription";

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
    title: "구름톤 유니브2",
    description:
      "카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 전국 대학 IT 연합 동아리입니다.",
    role: "멤버" as const,
    memberCount: 8,
  },
  {
    clubId: 3,
    title: "구름톤 유니브",
    description:
      "카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 전국 대학 IT 연합 동아리입니다.",
    role: "멤버" as const,
    memberCount: 8,
  },
  {
    clubId: 4,
    title: "구름톤 유니브3",
    description:
      "카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 전국 대학 IT 연합 동아리입니다.",
    role: "관리자" as const,
    memberCount: 8,
  },
];

export default function JoinClub() {
  const [clubs, setClubs] = useState(mockData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState<null | {
    clubId: number;
    title: string;
  }>(null);
  const router = useRouter();

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) =>
      club.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, clubs]);

  // ✅ 무한 스크롤
  const loadMoreClubs = () => {
    const startId = clubs.length + 1;
    const more = mockData.map((club, idx) => ({
      ...club,
      clubId: startId + idx,
      title: `${club.title} ${startId + idx}`,
    }));
    setClubs((prev) => [...prev, ...more]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100
      ) {
        loadMoreClubs();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [clubs]);

  return (
    <>
      <Header variant="main" />
      <main className="flex flex-col w-full max-w-[375px] mx-auto mt-4 gap-[15px]">
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
            <TitleAndDescription title="검색결과" />
            <div className="flex flex-col gap-[22px]">
              {filteredClubs.map((club) => (
                <TabCard
                  key={club.clubId}
                  clubId={club.clubId}
                  title={club.title}
                  description={club.description}
                  role={club.role}
                  memberCount={club.memberCount}
                  buttonLabel="가입 요청"
                  onButtonClick={() =>
                    setSelectedClub({ clubId: club.clubId, title: club.title })
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyClub />
        )}
        <BottomSheet
          open={!!selectedClub}
          clubName={selectedClub?.title ?? ""}
          onConfirm={() => {
            alert(`${selectedClub?.title} 가입 요청 완료`);
            setSelectedClub(null);
          }}
          onCancel={() => setSelectedClub(null)}
        />
      </main>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Settings, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";

import { AttendanceGraph } from "./components/admin-main/AttendanceGraph";
import { AttendanceList } from "./components/admin-main/AttendanceList";
import { CopyLink } from "./components/admin-main/CopyLink";
import { InfoGrid } from "./components/admin-main/InfoGrid";
import { ManagementTabs } from "./components/admin-main/ManageTabs";
import { MemberList } from "./components/admin-main/MemberList";

import { AttendanceSession } from "./types/attendances";
import { ClubDetailResponse } from "./types/clubs";
import { ClubMember, ClubRole } from "./types/member";

import {
  getClubDetail,
  getAttendanceSessions,
  getAttendanceStats,
  updateClubRoles,
  AttendanceStats,
} from "./apis/adminClub";

export default function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const user = session?.user;
  const clubIdParam = searchParams.get("clubId");
  const clubId = clubIdParam ? Number(clubIdParam) : null;

  const [activeTab, setActiveTab] = useState<
    "memberManagement" | "attendanceManagement"
  >("memberManagement");

  const [clubData, setClubData] = useState<ClubDetailResponse | null>(null);
  const [attendanceSessions, setAttendanceSessions] = useState<
    AttendanceSession[]
  >([]);
  const [initialMembers, setInitialMembers] = useState<ClubMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attendanceStats, setAttendanceStats] =
    useState<AttendanceStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clubId) return;

        const [clubDetail, sessions, stats] = await Promise.all([
          getClubDetail(clubId),
          getAttendanceSessions(clubId),
          getAttendanceStats(clubId),
        ]);

        setClubData(clubDetail);
        setAttendanceSessions(sessions);
        setAttendanceStats(stats);

        const deepCopiedMembers = JSON.parse(
          JSON.stringify(clubDetail.members)
        ) as ClubMember[];
        setInitialMembers(deepCopiedMembers);
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [clubId]);

  const handleRoleChange = (userId: string, newRole: ClubMember["role"]) => {
    if (!clubData) return;
    const updated = clubData.members.map((m) =>
      m.userId === userId ? { ...m, role: newRole } : m
    );
    setClubData({ ...clubData, members: updated });
  };

  const handleSaveChanges = async () => {
    if (!clubData || !clubId) return;

    const changes = clubData.members
      .filter((member) => {
        const original = initialMembers.find((m) => m.userId === member.userId);
        return original && String(original.role) !== String(member.role);
      })
      .map((member) => ({
        userId: member.userId,
        newRole: member.role,
      }));

    if (changes.length === 0) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      await updateClubRoles(clubId, changes);
      alert("변경사항이 저장되었습니다.");
      const deepCopiedMembers = JSON.parse(
        JSON.stringify(clubData.members)
      ) as ClubMember[];
      setInitialMembers(deepCopiedMembers);
    } catch (err) {
      console.error(err);
      alert("변경사항 저장 중 오류가 발생했습니다.");
    }
  };

  const handleSettingsClick = () => {
    void router.push(
      `/admin/setting?clubId=${clubData?.clubId}&clubName=${encodeURIComponent(
        clubData?.clubName ?? ""
      )}`
    );
  };

  const handleCreateSessionClick = () => {
    void router.push(`/admin/create-session/info?clubId=${clubData?.clubId}`);
  };

  return (
    <div className="min-h-screen text-gray-800 max-w-[375px] mx-auto">
      <Header variant="main" />
      <TitleAndDescription
        title={clubData?.clubName ?? " "}
        description={
          <>{clubData?.description ?? "동아리 설명을 불러오는 중입니다."}</>
        }
        rightElement={
          <button onClick={handleSettingsClick}>
            <Settings className="h-6 w-6 text-black" />
          </button>
        }
      />

      <main className="container">
        <div className="mb-6">
          <button
            onClick={handleCreateSessionClick}
            className="w-full h-[83px] bg-[#3282F0] text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-[20px]">출석 세션 생성</span>
          </button>
        </div>
        {/* 
        <AttendanceGraph
          percentage={
            attendanceStats && attendanceStats.totalCount > 0
              ? Math.round(
                  (attendanceStats.presentCount / attendanceStats.totalCount) *
                    100
                )
              : 0
          }
          total={attendanceStats?.totalCount ?? 0}
          attended={attendanceStats?.presentCount ?? 0}
        /> */}

        <InfoGrid
          memberCount={clubData?.memberCount ?? 0}
          attendanceSessionCount={clubData?.attendanceSessionCount ?? 0}
          myRole={
            String(
              clubData?.members.find((m) => m.userId === user?.email)?.role
            ) === String(ClubRole.MANAGER)
              ? "관리자"
              : "멤버"
          }
          topStat="Top 3"
        />

        <CopyLink />

        <ManagementTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          labels={{ first: "회원 관리", second: "출석 관리" }}
          keys={{ first: "memberManagement", second: "attendanceManagement" }}
        />

        {activeTab === "memberManagement" && (
          <>
            {loading ? (
              <p className="text-center py-8">로딩 중...</p>
            ) : error ? (
              <p className="text-center text-red-500 py-8">{error}</p>
            ) : (
              <>
                <MemberList
                  members={clubData?.members ?? []}
                  onRoleChange={handleRoleChange}
                  representativeAlias={clubData?.representativeAlias ?? "대표"}
                  memberAlias={clubData?.memberAlias ?? "멤버"}
                  clubName={clubData?.clubName ?? "동아리"}
                  clubId={clubData?.clubId ?? 0}
                />
                <div className="flex w-full mt-6 mb-10">
                  <button
                    onClick={handleSaveChanges}
                    className="w-full bg-black text-white py-2 px-8 rounded-lg font-semibold"
                  >
                    변경사항 저장하기
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === "attendanceManagement" && (
          <AttendanceList
            records={attendanceSessions}
            clubId={clubData?.clubId ?? 0}
            memberAlias={clubData?.memberAlias ?? "멤버"}
            clubName={clubData?.clubName ?? "동아리"}
          />
        )}
      </main>
    </div>
  );
}

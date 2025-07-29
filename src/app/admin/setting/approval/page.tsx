"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import ApprovalBottomSheet from "../../components/setting/ApprovalBottomSheet";

import { PendingMember } from "../../apis/clubJoinRequests";
import { usePendingJoinRequests } from "../../hooks/setting/usePendingJoinRequests";
import { useApproveJoinRequest } from "../../hooks/setting/useApproveJoinRequest";
import { useRejectJoinRequest } from "../../hooks/setting/useRejectJoinRequest";

export default function SettingsPage() {
  const [selectedMember, setSelectedMember] = useState<PendingMember | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const searchParams = useSearchParams();
  const clubName = searchParams.get("clubName") || "";
  const clubId = Number(searchParams.get("clubId")) || 0;

  const {
    data: pendingMembers = [],
    isLoading,
    isError,
  } = usePendingJoinRequests(clubId);

  const approveMutation = useApproveJoinRequest(clubId, () =>
    setIsSheetOpen(false)
  );
  const rejectMutation = useRejectJoinRequest(clubId);

  const handleClick = (member: PendingMember) => {
    setSelectedMember(member);
    setIsSheetOpen(true);
  };

  const handleApprove = (requestId: number) => {
    approveMutation.mutate(requestId);
  };

  const handleReject = (requestId: number, reason: string) => {
    rejectMutation.mutate({ requestId, reason });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto">
      <Header variant="back" />
      <TitleAndDescription
        title="대기 중인 가입 요청"
        description={<>{clubName}</>}
      />

      <section className="space-y-3 mt-4">
        {isLoading ? (
          <div className="text-center text-gray-500 py-10">로딩 중...</div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">
            가입 요청을 불러오는 중 오류 발생
          </div>
        ) : pendingMembers.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            대기 중인 가입 요청이 없습니다.
          </div>
        ) : (
          pendingMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => handleClick(member)}
              className="bg-white rounded-xl p-3 border flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#DC2626] font-bold flex items-center justify-center">
                  {(member.userName ?? member.userNickname).charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#1E293B]">
                    {member.userName ?? member.userNickname}
                  </p>
                  <p className="text-sm text-gray-600 whitespace-nowrap">
                    {new Date(member.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {selectedMember && isSheetOpen && (
        <ApprovalBottomSheet
          selected={{
            name: selectedMember.userNickname,
            requestId: selectedMember.id,
          }}
          onClose={() => setIsSheetOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

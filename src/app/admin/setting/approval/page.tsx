"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { httpService } from "@/lib/utils/httpService";

import ApprovalBottomSheet from "../../components/setting/ApprovalBottomSheet";

interface PendingMember {
  id: number;
  userName: string;
  userNickname: string;
  createdAt: string;
}

export default function SettingsPage() {
  const [selectedMember, setSelectedMember] = useState<PendingMember | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [pendingMembers, setPendingMembers] = useState<PendingMember[]>([]);
  const searchParams = useSearchParams();
  const clubName = searchParams.get("clubName") || "";

  const clubId = Number(searchParams.get("clubId")) || 0;
  const fetchPendingRequests = async () => {
    try {
      const data = await httpService.get<PendingMember[]>(
        `clubs/${clubId}/join-requests/pending`,
      );
      setPendingMembers(data);
    } catch (err) {
      console.error(err);
      alert("가입 요청을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    void fetchPendingRequests();
  }, []);

  const handleClick = (member: PendingMember) => {
    setSelectedMember(member);
    setIsSheetOpen(true);
  };

  const handleApprove = async (requestId: number) => {
    try {
      await httpService.put(
        `clubs/${clubId}/join-requests/${requestId}/process`,
        {
          requestId,
          status: "ACTIVE",
          rejectionReason: "",
        },
      );

      alert("가입 승인 완료!");
      await fetchPendingRequests();
      setIsSheetOpen(false);
    } catch (err) {
      console.error(err);
      alert("승인 중 오류 발생");
    }
  };

  const handleReject = async (requestId: number, reason: string) => {
    try {
      await httpService.put(
        `clubs/${clubId}/join-requests/${requestId}/process`,
        {
          requestId,
          status: "REJECTED",
          rejectionReason: reason,
        },
      );

      alert("가입 거절 완료!");
      await fetchPendingRequests();
      setIsSheetOpen(false);
    } catch (err) {
      console.error(err);
      alert("거절 중 오류 발생");
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto">
      <Header variant="back" />
      <TitleAndDescription
        title="대기 중인 가입 요청"
        description={<>{clubName}</>}
      />

      <section className="space-y-3 mt-4">
        {pendingMembers.length === 0 ? (
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

"use client";

import { useState } from "react";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { Member } from "@/lib/types/admin";
import { mockMembers } from "@/mocks/admin";

import ApprovalBottomSheet from "../../components/setting/ApprovalBottomSheet";

export default function SettingsPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClick = (member: Member) => {
    setSelectedMember(member);
    setIsSheetOpen(true);
  };

  const handleApprove = () => {
    console.log(`${selectedMember?.name} 승인 처리`);
    // 승인 처리 로직 (API 호출 등)
  };

  const handleReject = () => {
    console.log(`${selectedMember?.name} 거절 처리`);
    // 거절 처리 로직
  };

  return (
    <div className="min-h-screen max-w-md mx-auto">
      <Header variant="back" />
      <TitleAndDescription
        title="대기 중인 가입 요청"
        description={<>구름톤 유니브 한국외대</>}
      />

      <section className="space-y-3 mt-4">
        {mockMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => handleClick(member)}
            className="bg-white rounded-xl p-3 border flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#DC2626] font-bold flex items-center justify-center">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[#1E293B]">{member.name}</p>
                <p className="text-sm text-gray-500">{member.department}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {selectedMember && isSheetOpen && (
        <ApprovalBottomSheet
          selected={{ name: selectedMember.name }}
          onClose={() => setIsSheetOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

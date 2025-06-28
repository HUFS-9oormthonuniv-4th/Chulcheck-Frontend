"use client";

import { useRouter } from "next/navigation";

import { Calendar } from "lucide-react";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import { NcubeMockMember } from "@/lib/types/admin";

interface MemberListProps {
  members: NcubeMockMember[];
}

export default function MemberList({ members }: MemberListProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-black">멤버 목록</h2>{" "}
      </div>
      <p className="text-sm text-[#666]">
        나와 함께 구름톤 유니브 한국외대에서 활동하는 미르미에요
      </p>
      <div className="space-y-4 mt-4">
        {members.map((member) => (
          <div
            key={member.id}
            onClick={() => router.push(`/member/${member.id}`)}
            className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#3282F0] font-bold text-lg">
              {member.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-600 whitespace-nowrap">
                {member.department} • 가입일: {member.joinedAt}
              </p>
            </div>
            <p className="text-sm text-gray-500 font-medium">{member.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

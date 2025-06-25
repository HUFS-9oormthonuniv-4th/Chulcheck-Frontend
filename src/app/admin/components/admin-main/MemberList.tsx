import { ChevronDown } from "lucide-react";

import { Member } from "@/types/admin";

interface MemberListProps {
  members: Member[];
  onRoleChange: (memberId: number, newRole: Member["role"]) => void;
}

export function MemberList({ members, onRoleChange }: MemberListProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 pt-2">미르미 목록</h3>
      <p className="text-sm text-gray-600 mb-4">
        구르미 유니브 한국외대에 가입한 미르미를 확인하고 관리해요
      </p>

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200"
          >
            {/* TODO: 소셜로그인 프로필 사진으로 변경 */}
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#3282F0] font-bold text-lg">
              {member.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-600">
                {member.department} • 가입일: {member.joinDate}
              </p>
            </div>
            <div className="relative">
              <select
                value={member.role}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onRoleChange(member.id, e.target.value as Member["role"])
                }
                className="appearance-none rounded-md py-2 pl-1 pr-6 text-sm focus:outline-none" // Added pr-6 to make space for arrow
              >
                <option value="대표">대표</option>
                <option value="운영진">운영진</option>
                <option value="미르미">미르미</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

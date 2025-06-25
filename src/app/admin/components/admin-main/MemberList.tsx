import { useRouter } from "next/navigation";

import { Member } from "@/lib/type/admin";

import { MemberSelect } from "./MemberListSelect";

interface MemberListProps {
  members: Member[];
  onRoleChange: (memberId: number, newRole: Member["role"]) => void;
}

export function MemberList({ members, onRoleChange }: MemberListProps) {
  const router = useRouter();
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
            onClick={() => router.push(`/admin/member/${member.id}`)}
            className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200"
          >
            {/* TODO: 소셜로그인 프로필 사진으로 변경 */}
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#3282F0] font-bold text-lg">
              {member.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-600 whitespace-nowrap">
                {member.department} • 가입일: {member.joinDate}
              </p>
            </div>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <MemberSelect
                value={member.role}
                onChange={(newRole) => onRoleChange(member.id, newRole)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useRouter } from "next/navigation";

import { ClubMember, ClubRole } from "../../types/member";

import { MemberSelect } from "./MemberListSelect";

interface MemberListProps {
  members: ClubMember[];
  onRoleChange: (userId: string, newRole: ClubMember["role"]) => void;
  representativeAlias: string;
  memberAlias: string;
  clubName: string;
  clubId: number;
}
export function MemberList({
  members,
  onRoleChange,
  memberAlias,
  clubName,
  clubId,
}: MemberListProps) {
  const router = useRouter();
  const representativeId = members.find(
    (m) => m.role === ClubRole.MANAGER
  )?.userId;

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 pt-2">
        {memberAlias} 목록
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {clubName}에 가입한 {memberAlias}를 확인하고 관리해요
      </p>

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.userId}
            onClick={() =>
              router.push(
                `/admin/member?userId=${encodeURIComponent(member.userId)}&clubId=${clubId}`
              )
            }
            className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#3282F0] font-bold text-lg">
              {(member.name ?? member.nickname ?? "M").charAt(0)}
            </div>

            <div className="flex-grow overflow-hidden">
              <p className="font-semibold text-gray-900 truncate">
                {member.name || member.nickname}
              </p>
              <p className="text-sm text-gray-600 truncate whitespace-nowrap">
                {member.major} • 가입일:
                {new Date(member.joinedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <MemberSelect
                value={member.role}
                isRepresentative={member.userId === representativeId}
                memberAlias={memberAlias}
                onChange={(newRole) =>
                  onRoleChange(member.userId, newRole as ClubRole)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

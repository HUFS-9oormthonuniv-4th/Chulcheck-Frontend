"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FolderPlus } from "lucide-react";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { FormButton } from "../../components/Button";
import { FormField } from "../../components/setting/FormField";

import { useUpdateClub } from "../../hooks/setting/useUpdateClub";
import { useClubDetailQuery } from "../../hooks/setting/useClubDetail";

export default function EditClubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clubId = searchParams.get("clubId") ?? "";

  const [clubName, setClubName] = useState("");
  const [representativeAlias, setRepresentativeAlias] = useState("");
  const [memberAlias, setMemberAlias] = useState("");
  const [description, setDescription] = useState("");

  const { data: clubDetail, isLoading } = useClubDetailQuery(clubId);

  useEffect(() => {
    if (clubDetail) {
      setClubName(clubDetail.clubName);
      setRepresentativeAlias(clubDetail.representativeAlias);
      setMemberAlias(clubDetail.memberAlias);
      setDescription(clubDetail.description);
    }
  }, [clubDetail]);

  const { mutateAsync: update, isPending } = useUpdateClub(clubId, {
    onSuccess: () => {
      alert("동아리 정보가 성공적으로 수정되었습니다.");
      void router.push(
        `/admin/setting?clubId=${clubId}&clubName=${encodeURIComponent(clubName)}`
      );
    },
    onError: () => alert("오류가 발생했습니다. 다시 시도해주세요."),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await update({
      name: clubName,
      representativeAlias,
      memberAlias,
      description,
    });
  };

  const handleCancelClick = () => {
    void router.push(
      `/admin/setting?clubId=${clubId}&clubName=${encodeURIComponent(
        clubDetail?.clubName ?? ""
      )}`
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-md mx-auto py-10 text-center">
        <p>동아리 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10 max-w-md mx-auto">
      <Header variant="back" />
      <TitleAndDescription
        title="동아리 정보 수정"
        description={<> {clubDetail?.clubName}의 정보를 입력하세요</>}
      />

      <form className="space-y-5 pt-6" onSubmit={handleSubmit}>
        <FormField
          label="동아리 이름"
          placeholder="동아리 이름을 입력해주세요"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />
        <FormField
          label="대표 명칭"
          placeholder="동아리대표 명칭을 입력해주세요"
          value={representativeAlias}
          onChange={(e) => setRepresentativeAlias(e.target.value)}
        />
        <FormField
          label="멤버 명칭"
          placeholder="동아리멤버 명칭을 입력해주세요"
          value={memberAlias}
          onChange={(e) => setMemberAlias(e.target.value)}
        />

        <div>
          <label className="block text-sm font-semibold text-[#2C3344] mb-1">
            동아리 설명
          </label>
          <textarea
            rows={5}
            placeholder="동아리에 대한 간단한 설명을 입력하세요"
            className="w-full px-4 py-3 rounded-md border border-[#CBD5E1] text-sm placeholder:text-[#94A3B8] bg-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2 mt-6">
          <FormButton
            variant="primary"
            icon={<FolderPlus className="w-5 h-5" />}
            disabled={isPending}
          >
            변경사항 저장
          </FormButton>
          <FormButton
            variant="secondary"
            onClick={() => void handleCancelClick()}
          >
            취소
          </FormButton>
        </div>
      </form>
    </div>
  );
}
